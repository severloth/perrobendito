import Link from "next/link";
import { getContentMap, getPublishedClasses } from "@/lib/data";
import { ItemGrid } from "@/components/site/ItemGrid";
import { GlowBackground } from "@/components/site/GlowBackground";
import { Reveal } from "@/components/site/Reveal";

export default async function ClasesPage() {
  const content = await getContentMap(["clases.hero.title", "clases.hero.subtitle", "clases.hero.text"]);
  const classes = await getPublishedClasses();

  return (
    <>
      <section className="on-dark relative flex min-h-[45svh] flex-col items-center justify-center overflow-hidden bg-black px-6 pt-32 pb-16 text-center text-white">
        <GlowBackground />
        <p className="relative text-sm uppercase tracking-[0.25em] text-white/50">Academia musical</p>
        <h1 className="relative mt-5 max-w-4xl text-balance font-display text-5xl tracking-tight sm:text-6xl">{content("clases.hero.title", "Clases")}</h1>
        <p className="relative mt-5 max-w-xl text-pretty text-lg italic text-white/70">{content("clases.hero.subtitle")}</p>
        <p className="relative mt-3 max-w-xl text-pretty text-white/60">{content("clases.hero.text")}</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <ItemGrid
          basePath="/clases"
          items={classes.map((c) => ({ id: c.id, slug: c.slug, title: c.title, kicker: c.kicker, photoUrl: c.photoUrl }))}
        />
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-20 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">Maestros que hacen lo que enseñan</p>
          <Link
            href="/quienes-somos"
            className="group mt-4 inline-flex items-center gap-2 font-display text-2xl"
          >
            Conocé al equipo docente
            <span className="h-px w-8 bg-zinc-900 transition-all duration-300 group-hover:w-14" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
