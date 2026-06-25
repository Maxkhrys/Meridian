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
            'radial-gradient(55% 45% at 12% 8%, rgba(16,185,129,0.14), transparent 70%), radial-gradient(45% 40% at 92% 22%, rgba(34,211,238,0.12), transparent 70%), radial-gradient(50% 45% at 78% 78%, rgba(45,212,191,0.12), transparent 70%), radial-gradient(45% 40% at 20% 95%, rgba(139,92,246,0.08), transparent 70%)',
        }}
      />
    </div>
  );
}
