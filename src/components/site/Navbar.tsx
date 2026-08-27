"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/clases", label: "Clases" },
  { href: "/marketing", label: "Marketing" },
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/contacto", label: "Contacto" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar al navegar (incluye back/forward): ajustamos durante el render en vez
  // de usar un efecto, asi no se pinta un frame con el panel abierto en la ruta nueva.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 text-white transition-all duration-300 ${
        open || scrolled ? "bg-black/85 shadow-lg shadow-black/20 backdrop-blur-md" : "bg-black/40 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" onClick={() => setOpen(false)} className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-xs font-semibold tracking-wide transition group-hover:border-white group-hover:bg-white/10">
            PB
          </span>
          <span className="text-sm font-medium leading-tight tracking-tight">
            Perro Bendito
            <br />
            Estudio
          </span>
        </Link>

        <ul className="hidden items-center gap-7 text-sm text-white/80 sm:flex">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative py-1 transition hover:text-white ${active ? "text-white" : ""}`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-white transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="-mr-2 flex h-10 w-10 items-center justify-center sm:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-white transition-all duration-300 ${
                open ? "top-2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-2 block h-px w-6 bg-white transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-white transition-all duration-300 ${
                open ? "top-2 -rotate-45" : "top-4"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Panel mobile: ocupa lo que queda de pantalla debajo de la barra */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="h-[calc(100svh-4.25rem)] overflow-y-auto border-t border-white/10 bg-black/95 backdrop-blur-md sm:hidden"
      >
        <ul className="mx-auto flex max-w-6xl flex-col divide-y divide-white/10 px-6">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between py-5 font-display text-2xl transition-colors ${
                    active ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span aria-hidden="true" className="text-base text-white/30">
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mx-auto max-w-6xl px-6 pt-8 text-xs uppercase tracking-[0.25em] text-white/40">
          San Miguel, Buenos Aires
        </p>
      </div>
    </header>
  );
}
