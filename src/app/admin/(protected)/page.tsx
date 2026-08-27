import Link from "next/link";
import { prisma } from "@/lib/prisma";

function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const units: [number, string][] = [
    [60, "s"],
    [60, "m"],
    [24, "h"],
    [30, "d"],
  ];
  let value = seconds;
  let label = "s";
  for (const [size, unit] of units) {
    if (value < size) {
      label = unit;
      break;
    }
    value = Math.floor(value / size);
    label = unit;
  }
  return `hace ${value}${label}`;
}

function PublishBar({ label, published, total, href }: { label: string; published: number; total: number; href: string }) {
  const pct = total > 0 ? Math.round((published / total) * 100) : 0;
  return (
    <Link href={href} className="block rounded-lg p-3 transition hover:bg-zinc-50">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-zinc-500">
          {published}/{total} publicados
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-100">
        <div className="h-full rounded-full bg-zinc-900 transition-all" style={{ width: `${pct}%` }} />
      </div>
    </Link>
  );
}

export default async function AdminHomePage() {
  const [
    classes,
    publishedClasses,
    services,
    publishedServices,
    teachers,
    publishedTeachers,
    faqs,
    publishedFaqs,
    unreadMessages,
    totalMessages,
    recentMessages,
    recentClasses,
    recentServices,
  ] = await Promise.all([
    prisma.classItem.count(),
    prisma.classItem.count({ where: { published: true } }),
    prisma.serviceItem.count(),
    prisma.serviceItem.count({ where: { published: true } }),
    prisma.teacher.count(),
    prisma.teacher.count({ where: { published: true } }),
    prisma.faq.count(),
    prisma.faq.count({ where: { published: true } }),
    prisma.contactSubmission.count({ where: { read: false } }),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.classItem.findMany({ orderBy: { updatedAt: "desc" }, take: 3, select: { title: true, updatedAt: true, id: true } }),
    prisma.serviceItem.findMany({ orderBy: { updatedAt: "desc" }, take: 3, select: { title: true, updatedAt: true, id: true } }),
  ]);

  const activity = [
    ...recentMessages.map((m) => ({
      id: m.id,
      label: `Mensaje de ${m.name}`,
      detail: m.reason,
      date: m.createdAt,
      href: "/admin/mensajes",
    })),
    ...recentClasses.map((c) => ({ id: c.id, label: `Clase actualizada: ${c.title}`, detail: "", date: c.updatedAt, href: `/admin/clases/${c.id}` })),
    ...recentServices.map((s) => ({ id: s.id, label: `Servicio actualizado: ${s.title}`, detail: "", date: s.updatedAt, href: `/admin/marketing/${s.id}` })),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 6);

  const cards = [
    { label: "Clases", value: classes, href: "/admin/clases" },
    { label: "Servicios de marketing", value: services, href: "/admin/marketing" },
    { label: "Docentes", value: teachers, href: "/admin/docentes" },
    { label: "Mensajes sin leer", value: unreadMessages, href: "/admin/mensajes", highlight: unreadMessages > 0 },
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold">Panel de administración</h1>
      <p className="mt-1 text-sm text-zinc-500">Un vistazo rápido al estado de la web.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`rounded-xl border p-5 transition hover:border-zinc-400 ${
              card.highlight ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 bg-white"
            }`}
          >
            <p className="text-3xl font-semibold">{card.value}</p>
            <p className={`mt-1 text-sm ${card.highlight ? "text-white/70" : "text-zinc-500"}`}>{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm font-semibold">Estado de publicación</p>
          <div className="mt-2 flex flex-col divide-y divide-zinc-100">
            <PublishBar label="Clases" published={publishedClasses} total={classes} href="/admin/clases" />
            <PublishBar label="Servicios" published={publishedServices} total={services} href="/admin/marketing" />
            <PublishBar label="Docentes" published={publishedTeachers} total={teachers} href="/admin/docentes" />
            <PublishBar label="FAQs" published={publishedFaqs} total={faqs} href="/admin/faqs" />
          </div>

          <p className="mt-6 text-sm font-semibold">Personalizar web</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              { label: "Home", href: "/admin/personalizar/home" },
              { label: "Clases", href: "/admin/personalizar/clases" },
              { label: "Marketing", href: "/admin/personalizar/marketing" },
              { label: "Quiénes somos", href: "/admin/personalizar/quienes-somos" },
              { label: "Contacto", href: "/admin/personalizar/contacto" },
            ].map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium transition hover:border-zinc-400"
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Actividad reciente</p>
            <span className="text-xs text-zinc-400">{totalMessages} mensajes en total</span>
          </div>
          <div className="mt-3 flex flex-col divide-y divide-zinc-100">
            {activity.map((item) => (
              <Link key={`${item.href}-${item.id}`} href={item.href} className="flex items-center justify-between gap-3 py-3 text-sm transition hover:bg-zinc-50">
                <div className="min-w-0">
                  <p className="truncate font-medium">{item.label}</p>
                  {item.detail && <p className="truncate text-xs text-zinc-500">{item.detail}</p>}
                </div>
                <span className="shrink-0 text-xs text-zinc-400">{timeAgo(item.date)}</span>
              </Link>
            ))}
            {activity.length === 0 && <p className="py-6 text-center text-sm text-zinc-400">Todavía no hay actividad.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
