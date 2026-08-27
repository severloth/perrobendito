import Link from "next/link";

const pages = [
  { href: "/admin/personalizar/home", label: "Home", description: "Hero, video, tarjetas de Clases y Marketing, Quiénes somos, cierre." },
  { href: "/admin/personalizar/clases", label: "Clases", description: "Encabezado de la página de Clases." },
  { href: "/admin/personalizar/marketing", label: "Marketing", description: "Encabezado de la página de Marketing." },
  { href: "/admin/personalizar/quienes-somos", label: "Quiénes somos", description: "Presentación, origen del nombre, concepto de marca." },
  { href: "/admin/personalizar/contacto", label: "Contacto", description: "Encabezado y datos de contacto." },
];

export default function PersonalizarIndexPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold">Personalizar web</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Editá los textos, imágenes y videos de la web pública, viendo cómo se va a ver cada página.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-400"
          >
            <p className="font-medium">{page.label}</p>
            <p className="mt-1 text-sm text-zinc-500">{page.description}</p>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-sm text-zinc-500">
        Las clases, servicios, docentes y preguntas frecuentes se administran en sus propias secciones del menú —
        acá sólo se edita el contenido de las páginas en sí.
      </p>
    </div>
  );
}
