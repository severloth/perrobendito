import Link from "next/link";

export function FormShell({
  title,
  backHref,
  children,
}: {
  title: string;
  backHref: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl">
      <Link href={backHref} className="text-sm text-zinc-500 hover:underline">
        ← Volver
      </Link>
      <h1 className="mt-2 text-xl font-semibold">{title}</h1>
      <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6">{children}</div>
    </div>
  );
}

export function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-xs font-medium uppercase tracking-widest text-zinc-500">
        {label}
      </label>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export const inputClass =
  "w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:border-zinc-900";
