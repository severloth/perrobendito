import { getContentMap } from "@/lib/data";
import { PersonalizarForm } from "@/components/admin/PersonalizarForm";
import { EditableField } from "@/components/admin/EditableField";

export default async function PersonalizarMarketingPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const content = await getContentMap(["marketing.hero.title", "marketing.hero.subtitle", "marketing.hero.text"]);

  return (
    <PersonalizarForm title="Marketing" redirectTo="/admin/personalizar/marketing" saved={saved === "1"}>
      <section className="flex min-h-[45vh] flex-col items-center justify-center bg-black px-6 py-16 text-center text-white">
        <p className="text-sm uppercase tracking-[0.25em] text-white/50">Estudio creativo</p>
        <div className="mt-4 w-full max-w-xl">
          <EditableField
            name="block:marketing.hero.title"
            defaultValue={content("marketing.hero.title")}
            className="text-center font-display text-4xl sm:text-5xl"
          />
          <EditableField
            as="textarea"
            name="block:marketing.hero.subtitle"
            defaultValue={content("marketing.hero.subtitle")}
            className="mt-4 text-center text-lg italic text-white/80"
          />
          <EditableField
            as="textarea"
            name="block:marketing.hero.text"
            defaultValue={content("marketing.hero.text")}
            className="mt-2 text-center text-white/70"
          />
        </div>
      </section>

      <p className="border-t border-zinc-200 px-6 py-4 text-center text-xs text-zinc-400">
        La grilla de servicios (fotos, alcance, responsables) se administra en la sección Marketing del menú.
      </p>
    </PersonalizarForm>
  );
}
