import Link from "next/link";
import { updatePage } from "@/app/admin/(protected)/personalizar/actions";

export function PersonalizarForm({
  title,
  redirectTo,
  saved,
  children,
}: {
  title: string;
  redirectTo: string;
  saved?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="sticky top-0 z-10 -mx-8 mb-6 flex items-center justify-between border-b border-zinc-200 bg-zinc-50/95 px-8 py-4 backdrop-blur">
        <div>
          <Link href="/admin/personalizar" className="text-sm text-zinc-500 hover:underline">
            ← Personalizar web
          </Link>
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-green-700">Cambios guardados ✓</span>}
          <button
            type="submit"
            form="personalizar-form"
            className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Guardar cambios
          </button>
        </div>
      </div>

      <form id="personalizar-form" action={updatePage}>
        <input type="hidden" name="redirect_to" value={redirectTo} />
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">{children}</div>
      </form>
    </div>
  );
}
