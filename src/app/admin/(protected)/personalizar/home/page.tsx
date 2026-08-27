import { getContentMap } from "@/lib/data";
import { PersonalizarForm } from "@/components/admin/PersonalizarForm";
import { EditableField } from "@/components/admin/EditableField";
import { EditableMedia } from "@/components/admin/EditableMedia";

export default async function PersonalizarHomePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const content = await getContentMap([
    "home.hero.kicker",
    "home.hero.title",
    "home.hero.subtitle",
    "home.hero.video",
    "home.paravos.title",
    "home.paravos.intro",
    "home.paravos.item1",
    "home.paravos.item2",
    "home.paravos.item3",
    "home.clases.image",
    "home.clases.title",
    "home.clases.text",
    "home.marketing.image",
    "home.marketing.title",
    "home.marketing.text",
    "home.about.title",
    "home.about.text",
    "home.about.image",
    "home.closing.title",
    "home.closing.subtitle",
  ]);

  return (
    <PersonalizarForm title="Home" redirectTo="/admin/personalizar/home" saved={saved === "1"}>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-black px-6 pt-16 pb-16 text-center text-white">
        <EditableMedia
          name="media:home.hero.video"
          currentSrc={content("home.hero.video")}
          kind="video"
          className="absolute inset-0"
          emptyLabel="Sin video — se muestra un fondo animado por defecto"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/45" />
        <div className="relative w-full max-w-xl">
          <EditableField
            name="block:home.hero.kicker"
            defaultValue={content("home.hero.kicker")}
            className="text-center text-sm uppercase tracking-[0.25em] text-white/70"
          />
          <EditableField
            name="block:home.hero.title"
            defaultValue={content("home.hero.title")}
            className="mt-4 text-center font-display text-4xl sm:text-6xl"
          />
          <EditableField
            as="textarea"
            name="block:home.hero.subtitle"
            defaultValue={content("home.hero.subtitle")}
            className="mt-4 text-center text-lg text-white/80"
          />
        </div>
      </section>

      {/* Para vos si */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-[1fr_1.4fr] sm:gap-12">
          <EditableField
            name="block:home.paravos.title"
            defaultValue={content("home.paravos.title")}
            className="font-display text-2xl leading-tight sm:text-3xl"
          />
          <div>
            <div className="flex flex-col">
              {["home.paravos.item1", "home.paravos.item2", "home.paravos.item3"].map((key, i) => (
                <div key={key} className="flex gap-4 border-t border-zinc-200 py-4 first:border-t-0 sm:first:border-t">
                  <span className="font-display text-sm text-zinc-400">0{i + 1}</span>
                  <EditableField as="textarea" name={`block:${key}`} defaultValue={content(key)} className="text-zinc-700" />
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-zinc-200 pt-4">
              <EditableField
                as="textarea"
                name="block:home.paravos.intro"
                defaultValue={content("home.paravos.intro")}
                className="text-sm text-zinc-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Clases y Marketing */}
      <section className="border-t border-zinc-200">
        <div className="grid sm:grid-cols-2">
          <div className="relative flex min-h-[320px] flex-col justify-end p-8 text-white">
            <EditableMedia name="media:home.clases.image" currentSrc={content("home.clases.image")} kind="image" className="absolute inset-0" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">Academia musical</p>
              <EditableField
                name="block:home.clases.title"
                defaultValue={content("home.clases.title")}
                className="mt-2 font-display text-3xl"
              />
              <EditableField
                as="textarea"
                name="block:home.clases.text"
                defaultValue={content("home.clases.text")}
                className="mt-2 max-w-sm text-sm text-white/80"
              />
            </div>
          </div>
          <div className="relative flex min-h-[320px] flex-col justify-end p-8 text-white">
            <EditableMedia name="media:home.marketing.image" currentSrc={content("home.marketing.image")} kind="image" className="absolute inset-0" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">Estudio creativo</p>
              <EditableField
                name="block:home.marketing.title"
                defaultValue={content("home.marketing.title")}
                className="mt-2 font-display text-3xl"
              />
              <EditableField
                as="textarea"
                name="block:home.marketing.text"
                defaultValue={content("home.marketing.text")}
                className="mt-2 max-w-sm text-sm text-white/80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quiénes somos */}
      <section className="grid gap-8 border-t border-zinc-200 px-6 py-16 sm:grid-cols-2 sm:items-center">
        <div>
          <EditableField
            name="block:home.about.title"
            defaultValue={content("home.about.title")}
            className="font-display text-2xl leading-tight sm:text-3xl"
          />
          <EditableField
            as="textarea"
            name="block:home.about.text"
            defaultValue={content("home.about.text")}
            className="mt-4 leading-relaxed text-zinc-600"
          />
        </div>
        <EditableMedia name="media:home.about.image" currentSrc={content("home.about.image")} kind="image" className="aspect-[4/3] w-full" />
      </section>

      {/* Cierre */}
      <section className="relative overflow-hidden bg-black px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-xl">
          <EditableField
            name="block:home.closing.title"
            defaultValue={content("home.closing.title")}
            className="text-center font-display text-2xl sm:text-3xl"
          />
          <EditableField
            as="textarea"
            name="block:home.closing.subtitle"
            defaultValue={content("home.closing.subtitle")}
            className="mt-2 text-center text-white/70"
          />
        </div>
      </section>

      <p className="border-t border-zinc-200 px-6 py-4 text-center text-xs text-zinc-400">
        Las tarjetas de clases, servicios, docentes y preguntas frecuentes se administran en sus propias secciones.
      </p>
    </PersonalizarForm>
  );
}
