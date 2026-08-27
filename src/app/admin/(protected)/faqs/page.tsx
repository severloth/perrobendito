import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminFaqsPage() {
  const faqs = await prisma.faq.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Preguntas frecuentes</h1>
        <Link
          href="/admin/faqs/new"
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          + Nueva pregunta
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {faqs.map((f) => (
          <Link
            key={f.id}
            href={`/admin/faqs/${f.id}`}
            className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-400"
          >
            <div>
              <p className="font-medium">{f.question}</p>
              <p className="mt-1 line-clamp-1 text-sm text-zinc-500">{f.answer}</p>
            </div>
            {f.published ? (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">Publicado</span>
            ) : (
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500">Borrador</span>
            )}
          </Link>
        ))}
        {faqs.length === 0 && (
          <p className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-zinc-400">
            Todavía no hay preguntas cargadas.
          </p>
        )}
      </div>
    </div>
  );
}
