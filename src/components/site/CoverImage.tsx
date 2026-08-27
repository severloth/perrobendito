import Image from "next/image";
import { GeneratedCover } from "@/components/site/GeneratedCover";
import { positionClass } from "@/lib/position";

export function CoverImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  seed,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  imgClassName?: string;
  seed?: string;
}) {
  if (!src) {
    if (seed) {
      return <GeneratedCover seed={seed} className={className} />;
    }
    return (
      <div
        className={`flex items-center justify-center bg-[repeating-linear-gradient(45deg,#e4e4e7,#e4e4e7_10px,#f4f4f5_10px,#f4f4f5_20px)] text-sm text-zinc-500 ${className}`}
      >
        Foto pendiente
      </div>
    );
  }
  return (
    <div className={`${positionClass(className)} overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill className={`object-cover ${imgClassName}`} sizes="100vw" />
    </div>
  );
}
