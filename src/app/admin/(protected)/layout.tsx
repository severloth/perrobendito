import Link from "next/link";
import { verifySession } from "@/lib/dal";
import { logout } from "@/app/actions/auth";

const links = [
  { href: "/admin", label: "Panel" },
  { href: "/admin/personalizar", label: "Personalizar web" },
  { href: "/admin/clases", label: "Clases" },
  { href: "/admin/marketing", label: "Marketing" },
  { href: "/admin/docentes", label: "Docentes" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/mensajes", label: "Mensajes" },
];

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await verifySession();

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <aside className="w-56 shrink-0 border-r border-zinc-200 bg-white p-6">
        <p className="text-sm font-semibold">Perro Bendito</p>
        <p className="text-xs text-zinc-500">Admin</p>
        <nav className="mt-8 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-10 border-t border-zinc-200 pt-4">
          <p className="truncate text-xs text-zinc-500">{session.email}</p>
          <form action={logout}>
            <button type="submit" className="mt-2 text-xs font-medium text-zinc-500 underline">
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
