import Link from "next/link";
import { getContentMap, getPublishedFaqs } from "@/lib/data";
import { FaqList } from "@/components/site/FaqList";
import { GlowBackground } from "@/components/site/GlowBackground";
import { Reveal } from "@/components/site/Reveal";
import { CoverImage } from "@/components/site/CoverImage";

export default async function HomePage() {
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
  const faqs = await getPublishedFaqs();
  const heroVideo = content("home.hero.video");

  return (
    <>
      {/* Hero */}
      <section className="on-dark relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden bg-black px-6 pt-32 pb-16 text-center text-white">
        {heroVideo ? (
          <>
            <video
              src={heroVideo}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-black/55" />
          </>
        ) : (
          <GlowBackground />
        )}
        <p className="relative text-xs uppercase tracking-[0.25em] text-white/50 sm:text-sm">
          {content("home.hero.kicker")}
        </p>
        <h1 className="relative mt-6 max-w-4xl text-balance font-display text-5xl font-medium tracking-tight sm:text-7xl">
          {content("home.hero.title")}
        </h1>
        <p className="relative mt-6 max-w-xl text-pretty text-lg text-white/70">{content("home.hero.subtitle")}</p>
      </section>

      {/* Para vos si */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal className="grid gap-10 sm:grid-cols-[1fr_1.4fr] sm:gap-16">
          <h2 className="text-balance font-display text-3xl leading-tight sm:text-4xl">
            {content("home.paravos.title")}
          </h2>
          <div>
            <div className="flex flex-col">
              {[content("home.paravos.item1"), content("home.paravos.item2"), content("home.paravos.item3")].map(
                (item, i) => (
                  <div key={i} className="flex gap-6 border-t border-zinc-200 py-6">
                    <span className="w-6 shrink-0 pt-1 font-display text-sm tabular-nums text-zinc-400">0{i + 1}</span>
                    <p className="text-pretty leading-relaxed text-zinc-700">{item}</p>
                  </div>
                ),
              )}
            </div>
            <p className="mt-6 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
              {content("home.paravos.intro")}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Clases y Marketing */}
      <section className="border-t border-zinc-200">
        <div className="grid sm:grid-cols-2">
          <Link
            href="/clases"
            className="on-dark group relative flex min-h-[460px] flex-col justify-end overflow-hidden bg-zinc-950 p-10 text-white sm:min-h-[580px] sm:p-14 lg:min-h-[660px]"
          >
            <CoverImage
              src={content("home.clases.image") || null}
              alt="Clases"
              seed="home-clases"
              className="absolute inset-0 h-full w-full"
              imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 transition-colors duration-500 group-hover:from-black/90" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">Academia musical</p>
              <h3 className="mt-3 text-balance font-display text-4xl sm:text-5xl">{content("home.clases.title")}</h3>
              <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-white/70">{content("home.clases.text")}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm">
                Ver más
                <span className="h-px w-6 bg-white/60 transition-all duration-300 group-hover:w-10" />
              </span>
            </div>
          </Link>
          <Link
            href="/marketing"
            className="on-dark group relative flex min-h-[460px] flex-col justify-end overflow-hidden bg-zinc-900 p-10 text-white sm:min-h-[580px] sm:p-14 lg:min-h-[660px]"
          >
            <CoverImage
              src={content("home.marketing.image") || null}
              alt="Marketing & Identidad"
              seed="home-marketing"
              className="absolute inset-0 h-full w-full"
              imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 transition-colors duration-500 group-hover:from-black/90" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">Estudio creativo</p>
              <h3 className="mt-3 text-balance font-display text-4xl sm:text-5xl">{content("home.marketing.title")}</h3>
              <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-white/70">{content("home.marketing.text")}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm">
                Ver más
                <span className="h-px w-6 bg-white/60 transition-all duration-300 group-hover:w-10" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Quiénes somos */}
      <Reveal>
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:grid-cols-2 sm:items-center sm:py-32">
          <div>
            <h2 className="text-balance font-display text-3xl leading-tight sm:text-4xl">{content("home.about.title")}</h2>
            <p className="mt-6 max-w-prose whitespace-pre-line text-pretty leading-relaxed text-zinc-600">{content("home.about.text")}</p>
            <Link
              href="/quienes-somos"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium"
            >
              Conocé al equipo
              <span className="h-px w-6 bg-zinc-900 transition-all duration-300 group-hover:w-10" />
            </Link>
          </div>
          <CoverImage
            src={content("home.about.image") || null}
            alt="Equipo Perro Bendito"
            seed="home-about"
            className="aspect-[4/3] w-full"
          />
        </section>
      </Reveal>

      {/* FAQ */}
      <section className="border-t border-zinc-200 bg-zinc-50">
        <Reveal className="mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:grid-cols-[1fr_2fr] sm:py-32">
          <div>
            <h2 className="font-display text-3xl">Preguntas frecuentes.</h2>
            <p className="mt-3 text-sm text-zinc-600">Todo lo que necesitás saber antes de arrancar.</p>
            <Link
              href="/contacto"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium"
            >
              Contactar
              <span className="h-px w-6 bg-zinc-900 transition-all duration-300 group-hover:w-10" />
            </Link>
          </div>
          <FaqList faqs={faqs} />
        </Reveal>
      </section>

      {/* Cierre */}
      <section className="on-dark relative overflow-hidden bg-black px-6 py-24 text-center text-white">
        <GlowBackground />
        <Reveal className="relative">
          <h2 className="text-balance font-display text-3xl sm:text-4xl">{content("home.closing.title")}</h2>
          <p className="mt-3 text-white/60">{content("home.closing.subtitle")}</p>
        </Reveal>
      </section>
    </>
  );
}
