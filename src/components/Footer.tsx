import { scrollToId } from '../hooks/useGSAP';
import Logo from './Logo';

const navLinks = [
  { label: 'Services', id: '#services' },
  { label: 'Pricing', id: '#pricing' },
  { label: 'Work', id: '#work' },
  { label: 'About', id: '#about' },
  { label: 'Contact', id: '#contact' },
];

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'X', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-emerald/30 bg-surface/40">
      <div className="container-px py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-start">
          {/* Left: wordmark + tagline */}
          <div>
            <Logo size={30} wordmarkClass="text-xl" />
            <p className="mt-4 max-w-xs text-sm text-text-secondary">
              Digital excellence for Irish businesses.
            </p>
          </div>

          {/* Centre: nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-3 md:justify-center">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToId(l.id)}
                className="text-sm text-text-secondary transition-colors hover:text-emerald"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Right: socials */}
          <div className="flex gap-6 md:justify-end">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-sm text-text-secondary transition-colors hover:text-emerald"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Meridian. All rights reserved.</span>
          <span>Registered Business Name, Ireland.</span>
        </div>
      </div>
    </footer>
  );
}
