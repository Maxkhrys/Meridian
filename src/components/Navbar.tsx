import { useEffect, useState } from 'react';
import { scrollToId } from '../hooks/useGSAP';
import Logo from './Logo';

const links = [
  { label: 'Showcase', id: '#showcase' },
  { label: 'Services', id: '#services' },
  { label: 'Pricing', id: '#pricing' },
  { label: 'Work', id: '#work' },
  { label: 'About', id: '#about' },
  { label: 'Contact', id: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border bg-background/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-px flex h-20 items-center justify-between">
        <button
          onClick={() => handleNav('#hero')}
          className="transition-opacity hover:opacity-80"
          aria-label="Meridian — back to top"
        >
          <Logo size={34} wordmarkClass="text-2xl" />
        </button>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {l.label}
            </button>
          ))}
          <button onClick={() => handleNav('#contact')} className="btn-primary">
            Get a Quote
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className={`h-0.5 w-6 bg-text-primary transition-all duration-300 ${
              open ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-text-primary transition-all duration-300 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-text-primary transition-all duration-300 ${
              open ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-[max-height] duration-500 lg:hidden ${
          open ? 'max-h-96' : 'max-h-0 border-t-transparent'
        }`}
      >
        <div className="container-px flex flex-col gap-1 py-4">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              className="py-3 text-left text-base font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#contact')}
            className="btn-primary mt-2 w-full"
          >
            Get a Quote
          </button>
        </div>
      </div>
    </header>
  );
}
