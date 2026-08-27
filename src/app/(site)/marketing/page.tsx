import Link from "next/link";
import { getContentMap, getPublishedServices } from "@/lib/data";
import { ItemGrid } from "@/components/site/ItemGrid";
import { GlowBackground } from "@/components/site/GlowBackground";
import { Reveal } from "@/components/site/Reveal";

export default async function MarketingPage() {
  const content = await getContentMap(["marketing.hero.title", "marketing.hero.subtitle", "marketing.hero.text"]);
  const services = await getPublishedServices();

  return (
    <>
      <section className="on-dark relative flex min-h-[45svh] flex-col items-center justify-center overflow-hidden bg-black px-6 pt-32 pb-16 text-center text-white">
        <GlowBackground />
        <p className="relative text-sm uppercase tracking-[0.25em] text-white/50">Estudio creativo</p>
        <h1 className="relative mt-5 max-w-4xl text-balance font-display text-5xl tracking-tight sm:text-6xl">{content("marketing.hero.title")}</h1>
        <p className="relative mt-5 max-w-xl text-pretty text-lg italic text-white/70">{content("marketing.hero.subtitle")}</p>
        <p className="relative mt-3 max-w-xl text-pretty text-white/60">{content("marketing.hero.text")}</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <ItemGrid
          basePath="/marketing"
          items={services.map((s) => ({ id: s.id, slug: s.slug, title: s.title, kicker: s.kicker, photoUrl: s.photoUrl }))}
        />
      </section>

      <Reveal className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">Otra opción</p>
          <div className="mt-3 sm:border-l sm:border-zinc-200 sm:pl-8">
            <h2 className="font-display text-2xl">¿No sabés bien qué necesitás?</h2>
            <p className="mt-2 max-w-prose text-pretty text-sm leading-relaxed text-zinc-600">
              Contanos en qué está tu proyecto hoy y qué te gustaría lograr. Te ayudamos a encontrar el camino, no
              hace falta que sepas el nombre del servicio.
            </p>
            <Link
              href="/contacto"
              className="group mt-4 inline-flex items-center gap-2 text-sm font-medium"
            >
              Contanos tu caso
              <span className="h-px w-6 bg-zinc-900 transition-all duration-300 group-hover:w-10" />
            </Link>
          </div>
        </div>
      </Reveal>

      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-20 text-center">
        <Reveal>
          <h2 className="font-display text-2xl">Trabajos realizados</h2>
          <p className="mt-2 text-sm text-zinc-500">Próximamente — espacio reservado para casos y proyectos.</p>
        </Reveal>
      </section>
    </>
  );
}
