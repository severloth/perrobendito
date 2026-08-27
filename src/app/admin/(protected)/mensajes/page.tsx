import { prisma } from "@/lib/prisma";
import { markAsRead, deleteSubmission } from "./actions";

export default async function AdminMensajesPage() {
  const submissions = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-xl font-semibold">Mensajes de contacto</h1>
      <p className="mt-1 text-sm text-zinc-500">Consultas recibidas desde el formulario de contacto.</p>

      <div className="mt-6 flex flex-col gap-4">
        {submissions.map((s) => {
          const markReadWithId = markAsRead.bind(null, s.id);
          const deleteWithId = deleteSubmission.bind(null, s.id);
          return (
            <div
              key={s.id}
              className={`rounded-xl border p-5 ${s.read ? "border-zinc-200 bg-white" : "border-zinc-900 bg-zinc-50"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">
                    {s.name} <span className="font-normal text-zinc-500">· {s.contact}</span>
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-zinc-400">
                    {s.reason}
                    {s.detail ? ` · ${s.detail}` : ""} · {s.createdAt.toLocaleString("es-AR")}
                  </p>
                </div>
                {!s.read && (
                  <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-xs text-white">Nuevo</span>
                )}
              </div>
              <p className="mt-3 whitespace-pre-line text-sm text-zinc-700">{s.message}</p>
              <div className="mt-4 flex gap-4 text-sm">
                {!s.read && (
                  <form action={markReadWithId}>
                    <button type="submit" className="text-zinc-600 hover:underline">
                      Marcar como leído
                    </button>
                  </form>
                )}
                <form action={deleteWithId}>
                  <button type="submit" className="text-red-600 hover:underline">
                    Eliminar
                  </button>
                </form>
              </div>
            </div>
          );
        })}
        {submissions.length === 0 && (
          <p className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-zinc-400">
            Todavía no llegaron mensajes.
          </p>
        )}
      </div>
    </div>
  );
}
