import { getContentMap } from "@/lib/data";
import { PersonalizarForm } from "@/components/admin/PersonalizarForm";
import { EditableField } from "@/components/admin/EditableField";

export default async function PersonalizarClasesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const content = await getContentMap(["clases.hero.title", "clases.hero.subtitle", "clases.hero.text"]);

  return (
    <PersonalizarForm title="Clases" redirectTo="/admin/personalizar/clases" saved={saved === "1"}>
      <section className="flex min-h-[45vh] flex-col items-center justify-center bg-black px-6 py-16 text-center text-white">
        <p className="text-sm uppercase tracking-[0.25em] text-white/50">Academia musical</p>
        <div className="mt-4 w-full max-w-xl">
          <EditableField
            name="block:clases.hero.title"
            defaultValue={content("clases.hero.title", "Clases")}
            className="text-center font-display text-4xl sm:text-5xl"
          />
          <EditableField
            as="textarea"
            name="block:clases.hero.subtitle"
            defaultValue={content("clases.hero.subtitle")}
            className="mt-4 text-center text-lg italic text-white/80"
          />
          <EditableField
            as="textarea"
            name="block:clases.hero.text"
            defaultValue={content("clases.hero.text")}
            className="mt-2 text-center text-white/70"
          />
        </div>
      </section>

      <p className="border-t border-zinc-200 px-6 py-4 text-center text-xs text-zinc-400">
        La grilla de clases (fotos, niveles, docentes) se administra en la sección Clases del menú.
      </p>
    </PersonalizarForm>
  );
}
