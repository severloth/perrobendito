import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminClasesPage() {
  const classes = await prisma.classItem.findMany({ orderBy: { order: "asc" }, include: { teacher: true } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Clases</h1>
        <Link
          href="/admin/clases/new"
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          + Nueva clase
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 text-xs uppercase tracking-widest text-zinc-500">
            <tr>
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Docente</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {classes.map((c) => (
              <tr key={c.id} className="border-t border-zinc-100">
                <td className="px-4 py-3 font-medium">{c.title}</td>
                <td className="px-4 py-3 text-zinc-500">/clases/{c.slug}</td>
                <td className="px-4 py-3 text-zinc-600">{c.teacher?.name ?? "—"}</td>
                <td className="px-4 py-3">
                  {c.published ? (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">Publicado</span>
                  ) : (
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500">Borrador</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/clases/${c.id}`} className="text-zinc-600 hover:underline">
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
            {classes.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-zinc-400">
                  Todavía no hay clases cargadas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
