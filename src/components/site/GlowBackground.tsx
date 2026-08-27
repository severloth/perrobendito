export function GlowBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-drift-1 absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/[0.06] blur-3xl" />
      <div className="animate-drift-2 absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-white/[0.05] blur-3xl" />
    </div>
  );
}
