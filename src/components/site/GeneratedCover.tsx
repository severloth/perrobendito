import { positionClass } from "@/lib/position";

function hashString(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

const backgrounds = ["#18181b", "#1f1f23", "#27272a"];

export function GeneratedCover({ seed, className = "" }: { seed: string; className?: string }) {
  const hash = hashString(seed);
  const variant = hash % 3;
  const bg = backgrounds[hash % backgrounds.length];

  return (
    <div className={`${positionClass(className)} overflow-hidden ${className}`} style={{ backgroundColor: bg }}>
      {variant === 0 && <EqualizerBars seed={hash} />}
      {variant === 1 && <Rings seed={hash} />}
      {variant === 2 && <Stripes />}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    </div>
  );
}

function EqualizerBars({ seed }: { seed: number }) {
  const bars = Array.from({ length: 16 }, (_, i) => {
    const h = 15 + ((seed >> i) % 70);
    return h;
  });
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 20 + 4}
          y={100 - h / 2}
          width={12}
          height={h}
          rx={2}
          fill="white"
          opacity={0.35 + (i % 3) * 0.1}
        />
      ))}
    </svg>
  );
}

function Rings({ seed }: { seed: number }) {
  const cx = 60 + (seed % 200);
  const cy = 40 + (seed % 120);
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      {[70, 55, 40, 25].map((r, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="white" strokeWidth={1.2} opacity={0.25 + i * 0.08} />
      ))}
    </svg>
  );
}

function Stripes() {
  return (
    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.07),rgba(255,255,255,0.07)_10px,transparent_10px,transparent_20px)]" />
  );
}
