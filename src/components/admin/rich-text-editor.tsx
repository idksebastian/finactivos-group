import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { useRef, useState } from "react";
import { uploadBlogImage } from "@/lib/blog-storage";
import { cn } from "@/lib/utils";

type Props = { value: string; onChange: (html: string) => void };

function Btn({
  active,
  onClick,
  children,
  title,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={cn(
        "rounded-[3px] border border-fin-line px-2.5 py-1.5 font-sans text-xs text-fin-ink/70 transition-colors hover:border-fin-teal hover:text-fin-teal",
        active && "border-fin-teal bg-fin-teal text-fin-cream hover:text-fin-cream",
      )}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const addLink = () => {
    const previous = editor.getAttributes("link")["href"] as string | undefined;
    const url = window.prompt("URL del enlace", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const onPickImage = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadBlogImage(file);
      editor.chain().focus().setImage({ src: url }).run();
    } catch (e) {
      window.alert(`No se pudo subir la imagen: ${(e as Error).message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-1.5 border-b border-fin-line bg-fin-cream p-2">
      <Btn title="Negrita" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <strong>B</strong>
      </Btn>
      <Btn title="Cursiva" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <em>I</em>
      </Btn>
      <Btn
        title="Subrayado"
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <span className="underline">U</span>
      </Btn>
      <span className="mx-1 w-px bg-fin-line" />
      <Btn
        title="Encabezado 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </Btn>
      <Btn
        title="Encabezado 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </Btn>
      <Btn title="Párrafo" active={editor.isActive("paragraph")} onClick={() => editor.chain().focus().setParagraph().run()}>
        ¶
      </Btn>
      <span className="mx-1 w-px bg-fin-line" />
      <Btn
        title="Lista con viñetas"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        • Lista
      </Btn>
      <Btn
        title="Lista numerada"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1. Lista
      </Btn>
      <Btn
        title="Cita destacada"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        ❝ Cita
      </Btn>
      <span className="mx-1 w-px bg-fin-line" />
      <Btn
        title="Alinear a la izquierda"
        active={editor.isActive({ textAlign: "left" })}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        ⯇
      </Btn>
      <Btn
        title="Centrar"
        active={editor.isActive({ textAlign: "center" })}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        ≡
      </Btn>
      <Btn
        title="Alinear a la derecha"
        active={editor.isActive({ textAlign: "right" })}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        ⯈
      </Btn>
      <span className="mx-1 w-px bg-fin-line" />
      <Btn title="Enlace" active={editor.isActive("link")} onClick={addLink}>
        Enlace
      </Btn>
      <Btn title="Insertar imagen" onClick={() => fileRef.current?.click()}>
        {uploading ? "Subiendo…" : "Imagen"}
      </Btn>
      <Btn title="Línea divisoria" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        —
      </Btn>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void onPickImage(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}

export function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true }),
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onUpdate: ({ editor: e }) => onChange(e.getHTML()),
    editorProps: {
      attributes: {
        class: "article-body tiptap min-h-[420px] px-6 py-6 focus:outline-none",
      },
    },
  });

  if (!editor) {
    return <div className="min-h-[480px] rounded-[3px] border border-fin-line bg-white" />;
  }

  return (
    <div className="rounded-[3px] border border-fin-line bg-white">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
