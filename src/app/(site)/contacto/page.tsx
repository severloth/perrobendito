import { getContentMap } from "@/lib/data";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { ContactForm } from "@/components/site/ContactForm";
import { GlowBackground } from "@/components/site/GlowBackground";
import { Reveal } from "@/components/site/Reveal";

export default async function ContactoPage() {
  const content = await getContentMap([
    "contacto.hero.title",
    "contacto.hero.subtitle",
    "contacto.hero.text",
    "contacto.zona",
    "contacto.instagram",
    "contacto.email",
    "contacto.whatsapp",
  ]);

  const whatsappHref = buildWhatsAppLink(content("contacto.whatsapp"), "Hola! Quiero hacerte una consulta.");

  return (
    <>
      <section className="on-dark relative flex min-h-[35svh] flex-col items-center justify-center overflow-hidden bg-black px-6 pt-32 pb-16 text-center text-white">
        <GlowBackground />
        <p className="relative text-sm uppercase tracking-[0.25em] text-white/50">Contacto</p>
        <h1 className="relative mt-5 max-w-4xl text-balance font-display text-4xl tracking-tight sm:text-6xl">{content("contacto.hero.title")}</h1>
        <p className="relative mt-5 max-w-xl text-pretty text-white/70">{content("contacto.hero.text")}</p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 sm:gap-16 sm:py-24">
        <Reveal>
          <h2 className="font-display text-2xl">Otras formas de encontrarnos</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Si preferís un canal directo, también podés escribirnos por estos medios.
          </p>
          <dl className="mt-8 flex flex-col divide-y divide-zinc-200 border-t border-zinc-200 text-sm">
            <div className="flex items-center justify-between py-3">
              <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Zona</dt>
              <dd>{content("contacto.zona")}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Instagram</dt>
              <dd>{content("contacto.instagram")}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Email</dt>
              <dd>{content("contacto.email")}</dd>
            </div>
          </dl>
          <div className="on-dark mt-10 bg-zinc-950 p-8 text-center text-white">
            <p className="text-sm text-white/70">¿Preferís WhatsApp?</p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-medium text-zinc-900 transition-all duration-300 hover:scale-105 hover:bg-zinc-200"
            >
              Escribinos directo →
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="font-display text-2xl">Formulario de contacto</h2>
          <div className="mt-4">
            <ContactForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}
