import { getContentMap } from "@/lib/data";
import { PersonalizarForm } from "@/components/admin/PersonalizarForm";
import { EditableField } from "@/components/admin/EditableField";

export default async function PersonalizarContactoPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const content = await getContentMap([
    "contacto.hero.title",
    "contacto.hero.subtitle",
    "contacto.hero.text",
    "contacto.zona",
    "contacto.instagram",
    "contacto.email",
    "contacto.whatsapp",
  ]);

  return (
    <PersonalizarForm title="Contacto" redirectTo="/admin/personalizar/contacto" saved={saved === "1"}>
      <section className="flex min-h-[35vh] flex-col items-center justify-center bg-black px-6 py-16 text-center text-white">
        <p className="text-sm uppercase tracking-[0.25em] text-white/50">Contacto</p>
        <div className="mt-4 w-full max-w-xl">
          <EditableField
            name="block:contacto.hero.title"
            defaultValue={content("contacto.hero.title")}
            className="text-center font-display text-4xl sm:text-5xl"
          />
          <EditableField
            as="textarea"
            name="block:contacto.hero.subtitle"
            defaultValue={content("contacto.hero.subtitle")}
            className="mt-4 text-center text-white/80"
          />
          <EditableField
            as="textarea"
            name="block:contacto.hero.text"
            defaultValue={content("contacto.hero.text")}
            className="mt-2 text-center text-white/70"
          />
        </div>
      </section>

      <section className="mx-auto max-w-md space-y-4 border-t border-zinc-200 px-6 py-10 text-sm">
        {[
          { key: "contacto.zona", label: "Zona" },
          { key: "contacto.instagram", label: "Instagram" },
          { key: "contacto.email", label: "Email" },
          { key: "contacto.whatsapp", label: "WhatsApp (solo número, ej 5491122334455)" },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between gap-4 border-b border-zinc-200 pb-2">
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">{item.label}</span>
            <EditableField name={`block:${item.key}`} defaultValue={content(item.key)} className="text-right" />
          </div>
        ))}
      </section>

      <p className="border-t border-zinc-200 px-6 py-4 text-center text-xs text-zinc-400">
        Los mensajes que llegan por el formulario se ven en la sección Mensajes del menú.
      </p>
    </PersonalizarForm>
  );
}
