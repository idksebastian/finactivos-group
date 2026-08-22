-- Consolidated baseline schema for the new Supabase project, reconstructed from the
-- live old project (introspection query + cross-checked against the incremental
-- migration history already in this folder). Run once against a fresh project.
--
-- Does NOT include table data (blog post content, site_settings values, uploaded
-- files in the 'blog' bucket) -- that is a separate export, not part of this file.

-- ============================================================================
-- Extensions
-- ============================================================================

create extension if not exists pgcrypto with schema extensions;

-- ============================================================================
-- Enum types
-- ============================================================================

do $$ begin
  create type public.app_role as enum ('admin', 'moderator', 'user');
exception when duplicate_object then null;
end $$;

-- ============================================================================
-- Tables
-- ============================================================================

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null default '',
  cover_image_url text,
  category text not null default 'General',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null default '',
  email text not null,
  request_type text not null default 'sentencia',
  message text not null default '',
  created_at timestamptz not null default now()
);

-- ============================================================================
-- Grants
-- RLS policies alone are not enough -- Postgres also requires the base table
-- grant for each role, or every query fails with "permission denied" before
-- RLS is even evaluated.
-- ============================================================================

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

grant select on public.blog_posts to anon;
grant select, insert, update, delete on public.blog_posts to authenticated;
grant all on public.blog_posts to service_role;

grant select on public.site_settings to anon;
grant select, insert, update, delete on public.site_settings to authenticated;
grant all on public.site_settings to service_role;

grant insert on public.contact_submissions to anon;
grant select, insert on public.contact_submissions to authenticated;
grant all on public.contact_submissions to service_role;

-- ============================================================================
-- Row Level Security
-- ============================================================================

alter table public.user_roles enable row level security;
alter table public.blog_posts enable row level security;
alter table public.site_settings enable row level security;
alter table public.contact_submissions enable row level security;

-- ============================================================================
-- Functions
-- ============================================================================

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable security definer
set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role);
$$;

-- Direct RPC calls (supabase.rpc('has_role', ...)) would let an anonymous
-- caller probe any user's role by passing an arbitrary _user_id, so EXECUTE
-- is revoked from anon/PUBLIC. It must stay granted to `authenticated`,
-- though: every admin-gated RLS policy below calls has_role() as part of its
-- USING/WITH CHECK clause, and that evaluation runs as the querying role
-- (authenticated for a logged-in user) -- revoking EXECUTE from authenticated
-- breaks those policies outright with "permission denied for function
-- has_role", which was verified to happen for real (an admin session got zero
-- rows back from blog_posts, published or draft, because the read-all-posts
-- policy's has_role() call couldn't execute at all).
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$ begin new.updated_at = now(); return new; end; $$;

-- ============================================================================
-- Triggers
-- ============================================================================

create trigger update_blog_posts_updated_at before update on public.blog_posts
  for each row execute function public.update_updated_at_column();

create trigger update_site_settings_updated_at before update on public.site_settings
  for each row execute function public.update_updated_at_column();

-- ============================================================================
-- RLS policies: user_roles
-- No insert/update/delete policy exists on purpose -- role assignment is only
-- possible via the service_role key (see bootstrap note at the end of this file).
-- ============================================================================

create policy "Users can read own roles" on public.user_roles
  for select to authenticated using (user_id = auth.uid());

-- ============================================================================
-- RLS policies: blog_posts
-- ============================================================================

create policy "Public can read published posts" on public.blog_posts
  for select to anon using (status = 'published');

create policy "Admins can read all posts" on public.blog_posts
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can insert posts" on public.blog_posts
  for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update posts" on public.blog_posts
  for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete posts" on public.blog_posts
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- ============================================================================
-- RLS policies: site_settings
-- ============================================================================

create policy "Public can read settings" on public.site_settings
  for select to anon, authenticated using (true);

create policy "Admins can insert settings" on public.site_settings
  for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update settings" on public.site_settings
  for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ============================================================================
-- RLS policies: contact_submissions
-- ============================================================================

create policy "Anyone can submit contact form" on public.contact_submissions
  for insert to anon, authenticated with check (true);

create policy "Admins can read submissions" on public.contact_submissions
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- ============================================================================
-- Storage: 'blog' bucket (private -- files served via signed URLs, see
-- src/lib/blog-storage.ts) and its RLS policies
-- ============================================================================

insert into storage.buckets (id, name, public)
values ('blog', 'blog', false)
on conflict (id) do nothing;

create policy "Admins can read blog files" on storage.objects
  for select to authenticated using (bucket_id = 'blog' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can upload blog files" on storage.objects
  for insert to authenticated with check (bucket_id = 'blog' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can update blog files" on storage.objects
  for update to authenticated using (bucket_id = 'blog' and public.has_role(auth.uid(), 'admin')) with check (bucket_id = 'blog' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete blog files" on storage.objects
  for delete to authenticated using (bucket_id = 'blog' and public.has_role(auth.uid(), 'admin'));

-- ============================================================================
-- Manual step after running this file (do NOT automate this as a bulk grant --
-- there are no real users yet in a fresh project, and auto-granting admin to
-- every signup would be a privilege-escalation hole):
--
--   1. Create your admin user through Supabase Auth (dashboard or sign-up flow).
--   2. Run, once, with that user's id:
--        insert into public.user_roles (user_id, role)
--        values ('<your-auth-user-id>', 'admin');
-- ============================================================================
