import Link from "next/link";
import { CoverImage } from "@/components/site/CoverImage";
import { Reveal } from "@/components/site/Reveal";

type Spec = { label: string; value: string };
type CrossItem = { title: string; href: string };

export function DetailPage({
  breadcrumbLabel,
  breadcrumbHref,
  kicker,
  title,
  slug,
  photoUrl,
  description,
  specs,
  teacher,
  teacherRoleLabel,
  whatsappHref,
  whatsappQuestion,
  crossNavTitle,
  crossNavItems,
}: {
  breadcrumbLabel: string;
  breadcrumbHref: string;
  kicker: string;
  title: string;
  slug: string;
  photoUrl: string;
  description: string;
  specs: Spec[];
  teacher: { name: string; discipline: string; photoUrl: string } | null;
  teacherRoleLabel: string;
  whatsappHref: string;
  whatsappQuestion: string;
  crossNavTitle: string;
  crossNavItems: CrossItem[];
}) {
  return (
    <>
      <nav aria-label="Miga de pan" className="bg-zinc-50 px-6 pt-28 pb-4 text-sm text-zinc-500">
        <div className="mx-auto max-w-6xl">
          <Link href={breadcrumbHref} className="transition hover:text-zinc-900 hover:underline">
            {breadcrumbLabel}
          </Link>{" "}
          / {title}
        </div>
      </nav>

      <section className="on-dark relative flex min-h-[45svh] flex-col items-center justify-center overflow-hidden text-center text-white">
        <CoverImage
          src={photoUrl}
          alt={title}
          seed={slug}
          className="absolute inset-0 h-full w-full"
          imgClassName="scale-105 animate-[drift-1_30s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
        <div className="relative px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-white/60">{kicker}</p>
          <h1 className="mt-4 max-w-4xl text-balance font-display text-4xl tracking-tight sm:text-6xl">{title}</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-[2fr_1fr] sm:py-24">
        <Reveal>
          <h2 className="text-balance font-display text-2xl">Sobre {kicker.toLowerCase().includes("servicio") ? "el servicio" : "la clase"}</h2>
          <p className="mt-4 max-w-prose text-pretty leading-relaxed text-zinc-600">{description}</p>

          <div className="mt-10 grid divide-y divide-zinc-200 border-t border-b border-zinc-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {specs.map((spec) => (
              <div key={spec.label} className="py-4 sm:px-6 sm:py-6 sm:first:pl-0 sm:last:pr-0">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">{spec.label}</p>
                <p className="mt-1 text-sm font-medium">{spec.value}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100} className="flex flex-col gap-6">
          {teacher && (
            <div className="flex items-center gap-4">
              <CoverImage src={teacher.photoUrl} alt={teacher.name} className="h-16 w-16 shrink-0 rounded-full" />
              <div>
                <p className="font-medium">{teacher.name}</p>
                <p className="text-sm text-zinc-500">
                  {teacherRoleLabel} de {teacher.discipline}
                </p>
              </div>
            </div>
          )}
          <div className="on-dark bg-zinc-950 p-8 text-center text-white">
            <p className="text-sm text-white/80">{whatsappQuestion}</p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-medium text-zinc-900 transition-all duration-300 hover:scale-105 hover:bg-zinc-200"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      {crossNavItems.length > 0 && (
        <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-14">
          <Reveal className="mx-auto max-w-6xl">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">{crossNavTitle}</p>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
              {crossNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-display text-lg text-zinc-700 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-900 hover:decoration-zinc-900"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      )}
    </>
  );
}
