import { getContentMap } from "@/lib/data";
import { PersonalizarForm } from "@/components/admin/PersonalizarForm";
import { EditableField } from "@/components/admin/EditableField";

export default async function PersonalizarQuienesSomosPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const content = await getContentMap([
    "quienes.hero.title",
    "quienes.hero.subtitle",
    "quienes.presentacion.title",
    "quienes.presentacion.text",
    "quienes.origen.text",
    "quienes.concepto.hacemos",
    "quienes.concepto.donde",
    "quienes.concepto.aquien",
  ]);

  return (
    <PersonalizarForm title="Quiénes somos" redirectTo="/admin/personalizar/quienes-somos" saved={saved === "1"}>
      <section className="flex min-h-[35vh] flex-col items-center justify-center bg-black px-6 py-16 text-center text-white">
        <p className="text-sm uppercase tracking-[0.25em] text-white/50">Quiénes somos</p>
        <div className="mt-4 w-full max-w-xl">
          <EditableField
            name="block:quienes.hero.title"
            defaultValue={content("quienes.hero.title")}
            className="text-center font-display text-3xl sm:text-4xl"
          />
          <EditableField
            as="textarea"
            name="block:quienes.hero.subtitle"
            defaultValue={content("quienes.hero.subtitle")}
            className="mt-4 text-center text-white/80"
          />
        </div>
      </section>

      <p className="border-t border-zinc-200 px-6 py-4 text-center text-xs text-zinc-400">
        Las fotos y bios de los docentes se administran en la sección Docentes del menú.
      </p>

      <section className="grid gap-8 border-t border-zinc-200 px-6 py-16 sm:grid-cols-2">
        <EditableField
          name="block:quienes.presentacion.title"
          defaultValue={content("quienes.presentacion.title")}
          className="font-display text-2xl leading-tight"
        />
        <EditableField
          as="textarea"
          name="block:quienes.presentacion.text"
          defaultValue={content("quienes.presentacion.text")}
          className="leading-relaxed text-zinc-600"
        />
      </section>

      <section className="border-t border-zinc-200 px-6 py-8">
        <EditableField
          as="textarea"
          name="block:quienes.origen.text"
          defaultValue={content("quienes.origen.text")}
          className="border-l-2 border-zinc-900 pl-6 font-display text-xl italic text-zinc-700"
        />
      </section>

      <section className="grid gap-6 border-t border-zinc-200 px-6 py-16 sm:grid-cols-3">
        {[
          { key: "quienes.concepto.hacemos", label: "Lo que hacemos" },
          { key: "quienes.concepto.donde", label: "Dónde estamos" },
          { key: "quienes.concepto.aquien", label: "A quién hablamos" },
        ].map((item) => (
          <div key={item.key} className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">{item.label}</p>
            <EditableField
              name={`block:${item.key}`}
              defaultValue={content(item.key)}
              className="mt-2 text-center font-display text-lg"
            />
          </div>
        ))}
      </section>
    </PersonalizarForm>
  );
}
