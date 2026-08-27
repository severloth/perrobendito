import Link from "next/link";
import { CoverImage } from "@/components/site/CoverImage";
import { Reveal } from "@/components/site/Reveal";

type Item = {
  id: string;
  slug: string;
  title: string;
  kicker: string;
  photoUrl: string;
};

export function ItemGrid({ items, basePath }: { items: Item[]; basePath: string }) {
  if (items.length === 0) {
    return (
      <p className="border-t border-zinc-200 py-8 text-center text-sm text-zinc-500">
        Todavía no hay contenido cargado acá.
      </p>
    );
  }

  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <Reveal key={item.id} delay={(i % 3) * 80}>
          <Link href={`${basePath}/${item.slug}`} className="group block">
            <div className="overflow-hidden">
              <CoverImage
                src={item.photoUrl}
                alt={item.title}
                seed={item.slug}
                className="aspect-[4/3] w-full"
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
            <div className="mt-5 flex items-start justify-between gap-4 border-t border-zinc-200 pt-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">{item.kicker}</p>
                <h3 className="mt-1 text-balance font-display text-xl">{item.title}</h3>
              </div>
              <span className="mt-1 shrink-0 text-zinc-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-zinc-900">
                →
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
