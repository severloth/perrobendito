import { getContentMap, getPublishedTeachers } from "@/lib/data";
import { CoverImage } from "@/components/site/CoverImage";
import { GlowBackground } from "@/components/site/GlowBackground";
import { Reveal } from "@/components/site/Reveal";

export default async function QuienesSomosPage() {
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
  const teachers = await getPublishedTeachers();

  return (
    <>
      <section className="on-dark relative flex min-h-[40svh] flex-col items-center justify-center overflow-hidden bg-black px-6 pt-32 pb-16 text-center text-white">
        <GlowBackground />
        <p className="relative text-sm uppercase tracking-[0.25em] text-white/50">Quiénes somos</p>
        <h1 className="relative mt-5 max-w-4xl text-balance font-display text-4xl tracking-tight sm:text-6xl">{content("quienes.hero.title")}</h1>
        <p className="relative mt-5 text-white/70">{content("quienes.hero.subtitle")}</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        {teachers.length > 0 ? (
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-3">
            {teachers.map((t, i) => (
              <Reveal key={t.id} delay={(i % 3) * 80}>
                <div className="group">
                  <CoverImage
                    src={t.photoUrl}
                    alt={t.name}
                    className="aspect-[4/5] w-full grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                  <p className="mt-4 font-display text-lg">{t.name}</p>
                  <p className="text-sm text-zinc-500">{t.discipline}</p>
                  {t.bio && <p className="mt-2 text-sm text-zinc-600">{t.bio}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <CoverImage src={null} alt="Equipo Perro Bendito" className="h-72 w-full" />
        )}
      </section>

      <section className="border-t border-zinc-200">
        <Reveal className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-[1fr_1.4fr] sm:gap-16 sm:py-24">
          <h2 className="text-balance font-display text-3xl leading-tight">{content("quienes.presentacion.title")}</h2>
          <p className="max-w-prose text-pretty leading-relaxed text-zinc-600">{content("quienes.presentacion.text")}</p>
        </Reveal>
      </section>

      <Reveal className="mx-auto max-w-6xl px-6 py-4">
        <blockquote className="max-w-3xl text-pretty border-l-2 border-zinc-900 pl-6 font-display text-xl italic leading-relaxed text-zinc-700">
          {content("quienes.origen.text")}
        </blockquote>
      </Reveal>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="grid divide-y divide-zinc-200 border-t border-zinc-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:border-b">
          {[
            { label: "Lo que hacemos", value: content("quienes.concepto.hacemos") },
            { label: "Dónde estamos", value: content("quienes.concepto.donde") },
            { label: "A quién hablamos", value: content("quienes.concepto.aquien") },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 80} className="px-6 py-8 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">{item.label}</p>
              <p className="mt-2 text-balance font-display text-lg">{item.value}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="on-dark relative overflow-hidden bg-black px-6 py-20 text-center text-white">
        <GlowBackground />
        <Reveal className="relative">
          <h2 className="text-balance font-display text-3xl">Formamos artistas. Construimos presencias.</h2>
          <p className="mt-2 text-white/60">Perro Bendito Estudio</p>
        </Reveal>
      </section>
    </>
  );
}
