import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDocentesPage() {
  const teachers = await prisma.teacher.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Docentes</h1>
        <Link
          href="/admin/docentes/new"
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          + Nuevo docente
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 text-xs uppercase tracking-widest text-zinc-500">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Disciplina</th>
              <th className="px-4 py-3">Orden</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t.id} className="border-t border-zinc-100">
                <td className="px-4 py-3 font-medium">{t.name}</td>
                <td className="px-4 py-3 text-zinc-600">{t.discipline}</td>
                <td className="px-4 py-3 text-zinc-600">{t.order}</td>
                <td className="px-4 py-3">
                  {t.published ? (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">Publicado</span>
                  ) : (
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500">Borrador</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/docentes/${t.id}`} className="text-zinc-600 hover:underline">
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
            {teachers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-zinc-400">
                  Todavía no hay docentes cargados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
