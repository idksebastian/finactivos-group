-- Data export from the live old project (2026-08-22), generated via
-- format(...,%L) in the SQL Editor so Postgres itself handled all quoting.
-- Run once against the new project, after supabase/migrations/ has been applied.
--
-- Excluded on purpose: 2 of the original 10 blog_posts rows were test/gibberish
-- content created while testing the admin editor ("LA FIRMEZA DE COMO FIRMAR LA
-- FIRMA" / la-firmeza-de-como-firmar-la-firma, and "Como seria mis papachos" /
-- como-seria-mis-papachos) -- confirmed with the client and dropped. Those two
-- were also the only rows referencing the 3 files in the old 'blog' storage
-- bucket (via cover_image_url or embedded <img> tags with signed URLs to the
-- OLD project's domain) -- with them excluded, the new 'blog' bucket starts
-- empty and there is nothing to migrate from Storage.

-- ============================================================================
-- blog_posts (8 rows: 3 published, 5 draft)
-- ============================================================================

INSERT INTO public.blog_posts (id, title, slug, excerpt, content, cover_image_url, category, status, published_at, created_at, updated_at) VALUES ('d458d1e8-1f0c-4a0a-8306-4d8dc7e79a1e', 'Factoring con entidades públicas: requisitos reales', 'factoring-entidades-publicas-requisitos', 'Radicación, aceptación y los errores documentales que retrasan el anticipo.', '<p>El factoring sobre facturas emitidas a entidades públicas exige un cumplimiento documental estricto. Los errores más frecuentes retrasan semanas el desembolso.</p><h2>Documentos indispensables</h2><ol><li>Factura electrónica radicada y con acuse de recibo.</li><li>Contrato o orden de compra vigente.</li><li>Acta de recibo a satisfacción.</li></ol><p>Con la documentación completa, el anticipo puede desembolsarse en pocos días hábiles.</p>', NULL, 'Factoring', 'published', '2026-07-14 00:00:00+00', '2026-08-16 16:05:52.86034+00', '2026-08-16 16:05:52.86034+00') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, cover_image_url, category, status, published_at, created_at, updated_at) VALUES ('c744fa58-1e05-4b5e-b984-396355ed0549', 'Activos judiciales como clase de activo', 'activos-judiciales-clase-de-activo', 'Cómo se valora el riesgo cuando el pagador es una entidad del Estado.', '<p>Los activos judiciales tienen un perfil de riesgo particular: la certeza jurídica del pago es alta, pero el plazo es incierto.</p><h2>Variables de valoración</h2><ul><li>Entidad pagadora y su historial presupuestal.</li><li>Estado procesal y firmeza del fallo.</li><li>Monto y turno asignado.</li></ul>', NULL, 'Inversión', 'published', '2026-07-02 00:00:00+00', '2026-08-16 16:05:52.86034+00', '2026-08-16 16:05:52.86034+00') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, cover_image_url, category, status, published_at, created_at, updated_at) VALUES ('bab72ac6-c4c0-496c-aded-0840279dba96', 'Por qué una sentencia en firme puede tardar años en pagarse', 'sentencia-en-firme-tiempos-de-pago', 'Entre la ejecutoria y el giro efectivo median disponibilidades presupuestales, turnos de pago y trámites internos de cada entidad.', '<p>Obtener una sentencia favorable contra una entidad del Estado no significa recibir el dinero. Entre la ejecutoria del fallo y el giro efectivo median disponibilidades presupuestales, turnos de pago y trámites internos que pueden extenderse por años.</p><h2>El recorrido presupuestal</h2><p>Cada entidad debe incorporar el pago dentro de su presupuesto anual. Si la vigencia ya está comprometida, el pago se traslada al año siguiente, y así sucesivamente.</p><blockquote>El promedio de espera entre la ejecutoria y el pago efectivo supera con frecuencia los cinco años.</blockquote><h3>Qué puede hacer el titular</h3><ul><li>Radicar oportunamente la solicitud de pago con la constancia de ejecutoria.</li><li>Hacer seguimiento al turno asignado por la entidad.</li><li>Evaluar la cesión de derechos económicos como alternativa de liquidez.</li></ul><p>La cesión permite recibir el valor negociado en semanas, trasladando la espera y la gestión de cobro al cesionario.</p>', NULL, 'Reparación directa', 'published', '2026-08-12 12:00:00+00', '2026-08-16 16:05:52.86034+00', '2026-08-16 18:28:15.462981+00') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, cover_image_url, category, status, published_at, created_at, updated_at) VALUES ('c28ff65f-bf9f-4017-b381-13ea4654f363', 'Qué firma exactamente quien cede su sentencia', 'que-firma-quien-cede-su-sentencia', 'El alcance del contrato, qué conserva el titular y qué asume el cesionario.', '<p>La cesión de derechos económicos es un contrato mediante el cual el titular de una sentencia transfiere el derecho a recibir el pago, a cambio de un valor acordado que se desembolsa de inmediato.</p><h2>Qué conserva el titular</h2><p>El titular conserva su condición de víctima o demandante reconocida en el fallo. Lo que se transfiere es exclusivamente el derecho económico.</p><h2>Qué asume el cesionario</h2><ul><li>La gestión del cobro ante la entidad.</li><li>El riesgo de demora en el pago.</li><li>Los costos administrativos y jurídicos del trámite.</li></ul>', NULL, 'Cesión de derechos', 'draft', '2026-07-29 12:00:00+00', '2026-08-16 16:05:52.86034+00', '2026-08-16 18:28:32.211574+00') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, cover_image_url, category, status, published_at, created_at, updated_at) VALUES ('f8538e43-7c97-4663-81b8-31c928a75b67', '¿Cuánto tiempo dura el proceso de compra de sentencias en Colombia?', 'cuanto-dura-proceso-compra-sentencias', 'Sin intermediario, el 90% de los casos tarda más de 6 años en recibir el pago. Con Finactivos, la gestión hasta la firma de la cesión toma 9 días hábiles y la espera del giro estatal la asume la compañía.', '
<p>La pregunta que más recibimos de titulares de sentencias de reparación directa es simple: <em>¿cuándo voy a recibir mi dinero?</em> La respuesta depende de si espera el pago directamente de la entidad o si cede su derecho económico a un tercero.</p>

<h2>¿Cuánto tarda el pago si espero a la entidad estatal?</h2>
<p>En Colombia, el 90% de los casos tarda más de 6 años en recibir el pago efectivo desde que existe una sentencia favorable. El fallo en firme no significa desembolso inmediato: la entidad condenada debe surtir trámites presupuestales internos, incorporar el pago a su vigencia fiscal y hacer fila junto a otras obligaciones judiciales. Ese calendario no lo controla el titular ni su apoderado.</p>

<h2>¿Cuánto tarda el proceso con Finactivos?</h2>
<p>La gestión que depende de nosotros toma <strong>9 días hábiles</strong>, contados desde que recibimos la documentación completa del caso hasta la firma de la cesión ante notaría. Ese es el tiempo en el que usted pasa de tener un derecho en papel a tener certeza sobre su liquidez.</p>
<p>Después de la firma queda pendiente el giro final de la entidad, que suele tomar entre <strong>60 y 90 días adicionales</strong>. La diferencia esencial es quién soporta esa espera: una vez firmada la cesión, ese tiempo y ese riesgo los asume Finactivos, no el titular.</p>

<h2>¿Qué ocurre en esos 9 días hábiles?</h2>
<p>El proceso está organizado en cuatro etapas encadenadas: análisis del expediente y verificación de la sentencia, negociación y presentación de la oferta, formalización de la cesión, y trámite del pago. Cada etapa tiene responsables y tiempos definidos, de modo que usted siempre sabe en qué punto está su caso.</p>
<ul>
<li><strong>Análisis:</strong> revisión de la sentencia, su ejecutoria y la entidad condenada.</li>
<li><strong>Negociación:</strong> valoración del caso y presentación de la oferta de compra.</li>
<li><strong>Formalización:</strong> documentos de cesión y firma.</li>
<li><strong>Pago:</strong> desembolso al titular conforme a lo pactado.</li>
</ul>

<h2>¿Por qué el tiempo importa tanto en estos casos?</h2>
<p>Porque detrás de cada sentencia hay una familia que ya esperó años por una reparación. Convertir una espera indefinida en un calendario corto y verificable es, en la práctica, el valor del servicio.</p>

<h2>Conozca el proceso paso a paso</h2>
<p>Si quiere ver el detalle de cada etapa y los tiempos asociados, revise nuestra página de <a href="/proceso">Proceso</a>, donde explicamos el recorrido completo hasta el desembolso.</p>
', NULL, 'Reparación directa', 'draft', '2026-08-22 17:00:10.468632+00', '2026-08-22 17:00:10.468632+00', '2026-08-22 17:00:10.468632+00') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, cover_image_url, category, status, published_at, created_at, updated_at) VALUES ('511ca7b2-e370-4158-be73-1cff801d6f09', '¿Cuánto cuesta vender una sentencia contra el Estado?', 'cuanto-cuesta-vender-sentencia', 'El valor de una oferta de compra no es una cifra fija: depende del tiempo estimado de pago de la entidad, del monto reconocido y de los riesgos jurídicos del caso. Así se analiza cada variable.', '
<p>No existe un precio único para la compra de una sentencia. Cada caso se valora individualmente, porque cada sentencia tiene un deudor distinto, un monto distinto y un nivel de riesgo distinto. Entender qué variables pesan en esa valoración le permite comparar ofertas con criterio.</p>

<h2>¿Qué determina el valor de una oferta de compra?</h2>
<p>Tres factores explican la mayor parte de la diferencia entre una oferta y otra:</p>
<ul>
<li><strong>Tiempo estimado de pago según la entidad condenada:</strong> no todas las entidades pagan al mismo ritmo. El historial de cumplimiento y la disponibilidad presupuestal del deudor son determinantes, porque definen cuántos meses o años debe esperar quien compra el derecho.</li>
<li><strong>Monto reconocido en la sentencia:</strong> el valor total de la condena, sus intereses y la forma en que fue liquidada afectan directamente la estructura de la operación.</li>
<li><strong>Riesgos jurídicos del caso:</strong> recursos pendientes, discusiones sobre la liquidación, embargos, procesos de sucesión o pluralidad de beneficiarios pueden aumentar la incertidumbre del cobro.</li>
</ul>

<h2>¿Por qué no se publica un porcentaje fijo?</h2>
<p>Publicar un porcentaje general sería engañoso: una sentencia contra una entidad que paga en pocos meses y una contra una entidad con años de rezago no pueden valorarse igual. Cualquier cifra sin analizar el expediente es una suposición, no una oferta.</p>

<h2>¿Qué documentos se necesitan para una valoración?</h2>
<p>Para estudiar un caso normalmente basta con la sentencia y su constancia de ejecutoria, la identificación del titular o de los beneficiarios y, cuando exista, la liquidación del crédito judicial. Con eso podemos determinar si el caso es elegible y avanzar al análisis.</p>

<h2>¿Cómo solicitar una valoración?</h2>
<p>La valoración de su caso es <strong>gratuita y sin compromiso</strong>. Escríbanos por WhatsApp con los datos básicos de su sentencia y le indicaremos si es elegible y cuáles serían las condiciones aplicables a su caso puntual. Puede iniciar la conversación desde nuestra página de <a href="/contacto">Contacto</a>.</p>
', NULL, 'Reparación directa', 'draft', '2026-08-22 17:00:10.468632+00', '2026-08-22 17:00:10.468632+00', '2026-08-22 17:00:10.468632+00') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, cover_image_url, category, status, published_at, created_at, updated_at) VALUES ('bfad4e72-381b-4b97-951a-78ac50399c6f', '¿Su sentencia está en firme y ejecutoriada? Así se verifica', 'sentencia-en-firme-ejecutoriada-como-verificar', 'Que una sentencia esté ejecutoriada significa que ya no admite recursos y produce plenos efectos. Es la primera condición de elegibilidad para una compra y se puede confirmar directamente con el despacho judicial.', '
<p>Antes de hablar de valores, tiempos o cesiones, hay una verificación que define todo lo demás: saber si la sentencia está en firme. Sin ejecutoria no hay derecho cierto que ceder.</p>

<h2>¿Qué significa que una sentencia esté ejecutoriada?</h2>
<p>Una sentencia queda ejecutoriada cuando ya no admite recursos: venció el término para apelar o para interponer recursos extraordinarios sin que se hubieran presentado, o los que se presentaron ya fueron resueltos. Desde ese momento la decisión es definitiva, produce plenos efectos y se vuelve exigible frente a la entidad condenada.</p>
<p>Una sentencia favorable en primera instancia, todavía pendiente de apelación, no es una sentencia en firme. Es una expectativa, no un derecho consolidado.</p>

<h2>¿Cómo se confirma la ejecutoria con el despacho judicial?</h2>
<ul>
<li>Solicite al juzgado o tribunal que conoció el proceso la <strong>constancia de ejecutoria</strong>: es el documento formal que certifica la firmeza del fallo.</li>
<li>Revise el estado del expediente en la consulta de procesos de la Rama Judicial, verificando que no figuren recursos pendientes de resolver.</li>
<li>Confirme con su apoderado si hubo recurso de apelación, casación o revisión y en qué estado quedó.</li>
<li>Verifique que la providencia identifique con claridad al beneficiario, el monto y la entidad condenada.</li>
</ul>

<h2>¿Por qué es la primera condición de elegibilidad?</h2>
<p>Porque la operación consiste en ceder un derecho económico cierto. Si la sentencia todavía puede modificarse o revocarse, no hay certeza sobre el monto ni sobre el deudor, y ninguna valoración sería seria. Por eso, en Finactivos la ejecutoria es el primer filtro de cualquier caso.</p>

<h2>¿Qué sigue después de verificar la firmeza?</h2>
<p>Una vez confirmada la ejecutoria, se revisan las demás condiciones: la entidad condenada, el monto, la ausencia de embargos y la titularidad. Puede consultar el listado completo en la sección de condiciones de elegibilidad de <a href="/servicios/compra-de-sentencias">Compra de sentencias</a>.</p>
', NULL, 'Reparación directa', 'draft', '2026-08-22 17:00:10.468632+00', '2026-08-22 17:00:10.468632+00', '2026-08-22 17:00:10.468632+00') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, cover_image_url, category, status, published_at, created_at, updated_at) VALUES ('247f2d27-b0ad-489c-9fb2-3e6e69648aaf', 'Compra de sentencias vs. factoring judicial: ¿cuál necesita su caso?', 'compra-sentencias-vs-factoring-judicial', 'Dos soluciones de liquidez para situaciones distintas: la compra de sentencias aplica a quien ya tiene un fallo judicial en firme; el factoring, a empresas con facturas y cuentas por cobrar pendientes.', '
<p>Ambas operaciones resuelven el mismo problema de fondo —tener un derecho de cobro reconocido pero no tener el dinero disponible— y sin embargo aplican a situaciones jurídicas muy diferentes. Elegir la correcta empieza por identificar qué documento respalda su acreencia.</p>

<h2>¿Cuándo aplica la compra de sentencias?</h2>
<p>Aplica cuando existe una <strong>sentencia o conciliación judicial en firme</strong> contra una entidad del Estado, típicamente en procesos de reparación directa. El titular ya ganó: hay una decisión judicial ejecutoriada que reconoce un monto a su favor, pero el pago efectivo depende del calendario presupuestal de la entidad condenada.</p>
<ul>
<li>Titular: persona natural, sus herederos o una empresa beneficiaria del fallo.</li>
<li>Documento base: sentencia ejecutoriada o acta de conciliación aprobada.</li>
<li>Deudor: una entidad pública.</li>
<li>Mecanismo: cesión del derecho económico.</li>
</ul>

<h2>¿Cuándo aplica el factoring?</h2>
<p>Aplica cuando una empresa tiene <strong>facturas o cuentas por cobrar</strong> pendientes de pago y necesita anticipar ese flujo para operar. No hay proceso judicial de por medio: hay una relación comercial vigente y un plazo de pago que presiona la caja.</p>
<ul>
<li>Titular: empresas y proveedores.</li>
<li>Documento base: facturas, contratos o cuentas por cobrar.</li>
<li>Deudor: clientes públicos o privados.</li>
<li>Mecanismo: descuento o negociación del título valor.</li>
</ul>

<h2>¿Cómo saber cuál necesita su caso?</h2>
<p>La regla práctica: si su acreencia nació de un <em>fallo judicial</em>, corresponde compra de sentencias. Si nació de una <em>operación comercial</em>, corresponde factoring. Si tiene ambas situaciones —una sentencia a su favor y además cartera comercial— pueden estructurarse por separado.</p>

<h2>Dé el siguiente paso</h2>
<p>Revise el detalle de cada servicio y las condiciones aplicables:</p>
<ul>
<li><a href="/servicios/compra-de-sentencias">Compra de sentencias</a> — para titulares de fallos judiciales en firme.</li>
<li><a href="/servicios/factoring">Factoring</a> — para empresas que necesitan anticipar su cartera.</li>
</ul>
', NULL, 'Factoring', 'draft', '2026-08-22 17:00:10.468632+00', '2026-08-22 17:00:10.468632+00', '2026-08-22 17:00:10.468632+00') ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- site_settings (12 rows)
-- ============================================================================

INSERT INTO public.site_settings (key, value, updated_at) VALUES ('contact_address', 'Cll 28 No. 13a 24, Oficina 303, Parque Bavaria — Torre Museo, Bogotá', '2026-08-16 16:05:52.86034+00') ON CONFLICT (key) DO NOTHING;
INSERT INTO public.site_settings (key, value, updated_at) VALUES ('contact_email', 'comercial@finactivos.com', '2026-08-16 16:05:52.86034+00') ON CONFLICT (key) DO NOTHING;
INSERT INTO public.site_settings (key, value, updated_at) VALUES ('contact_hours', 'Lunes a viernes, 8:00 am – 5:00 pm', '2026-08-16 16:05:52.86034+00') ON CONFLICT (key) DO NOTHING;
INSERT INTO public.site_settings (key, value, updated_at) VALUES ('contact_phone', '312 808 5632', '2026-08-16 16:05:52.86034+00') ON CONFLICT (key) DO NOTHING;
INSERT INTO public.site_settings (key, value, updated_at) VALUES ('contact_whatsapp', '573128085632', '2026-08-16 16:05:52.86034+00') ON CONFLICT (key) DO NOTHING;
INSERT INTO public.site_settings (key, value, updated_at) VALUES ('hero_fast_time', '15-30 días', '2026-08-16 16:05:52.86034+00') ON CONFLICT (key) DO NOTHING;
INSERT INTO public.site_settings (key, value, updated_at) VALUES ('hero_wait_time', '5-10 años', '2026-08-16 16:05:52.86034+00') ON CONFLICT (key) DO NOTHING;
INSERT INTO public.site_settings (key, value, updated_at) VALUES ('response_time', '48-72 horas', '2026-08-16 16:05:52.86034+00') ON CONFLICT (key) DO NOTHING;
INSERT INTO public.site_settings (key, value, updated_at) VALUES ('social_facebook', 'https://www.facebook.com/share/1JJKLhXq8h/', '2026-08-16 16:05:52.86034+00') ON CONFLICT (key) DO NOTHING;
INSERT INTO public.site_settings (key, value, updated_at) VALUES ('social_instagram', 'https://www.instagram.com/finactivosgroupsas', '2026-08-16 16:05:52.86034+00') ON CONFLICT (key) DO NOTHING;
INSERT INTO public.site_settings (key, value, updated_at) VALUES ('social_linkedin', 'https://www.linkedin.com/in/finactivos-group-sas-13987224a/', '2026-08-16 16:05:52.86034+00') ON CONFLICT (key) DO NOTHING;
INSERT INTO public.site_settings (key, value, updated_at) VALUES ('years_experience', '+17', '2026-08-16 16:05:52.86034+00') ON CONFLICT (key) DO NOTHING;

-- ============================================================================
-- contact_submissions: NOT exported here -- out of scope for this request
-- (only blog_posts, site_settings, and the storage bucket were asked for).
-- If this table holds real customer-submitted leads (name/email/phone/
-- message), that's PII and deserves a deliberate decision, not an
-- opportunistic copy. Check row count and decide separately before Fase 2
-- is considered fully done.
-- ============================================================================
