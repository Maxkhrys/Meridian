/**
 * Fixed, very subtle multi-hue colour wash behind all content. Adds emerald /
 * teal / cyan depth so the site reads premium rather than flat black. Sits at
 * -z-10 above the html base colour and below page content (which is
 * transparent). No background-attachment: fixed (janky on mobile) — it's a
 * fixed element instead.
 */
export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 12% 8%, rgba(139,92,246,0.24), transparent 70%), radial-gradient(45% 40% at 92% 22%, rgba(34,211,238,0.20), transparent 70%), radial-gradient(50% 45% at 78% 78%, rgba(236,72,153,0.18), transparent 70%), radial-gradient(48% 42% at 20% 95%, rgba(99,102,241,0.16), transparent 70%), radial-gradient(40% 35% at 50% 50%, rgba(139,92,246,0.07), transparent 75%)',
        }}
      />
      {/* Faint moving sheen adds life without hurting scroll perf */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'conic-gradient(from 210deg at 80% 20%, transparent 0deg, rgba(34,211,238,0.06) 80deg, rgba(236,72,153,0.05) 160deg, transparent 240deg)',
        }}
      />
    </div>
  );
}
