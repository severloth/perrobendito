import Link from "next/link";
import { getContentMap } from "@/lib/data";

export async function Footer() {
  const content = await getContentMap(["contacto.instagram"]);
  const instagram = content("contacto.instagram", "@perrobenditoestudio");
  const instagramHandle = instagram.replace(/^@/, "");

  return (
    <footer className="on-dark bg-black text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg tracking-tight">Perro Bendito Estudio</p>
          <p className="text-sm text-white/60">Tu escena empieza acá.</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
          <li>
            <a
              href={`https://instagram.com/${instagramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Instagram
            </a>
          </li>
          <li>
            <Link href="/contacto" className="hover:text-white">
              Contacto
            </Link>
          </li>
          <li>
            <Link href="/clases" className="hover:text-white">
              Clases
            </Link>
          </li>
          <li>
            <Link href="/marketing" className="hover:text-white">
              Marketing
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
