import { useRef, useState } from 'react';
import { useGSAP, gsap } from '../hooks/useGSAP';
import Logo from './Logo';

/**
 * Cinematic page-load reveal: the wordmark fades in, an iridescent bar fills,
 * then the whole panel wipes upward to reveal the hero.
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [done, setDone] = useState(reduced);

  useGSAP(
    () => {
      if (reduced) return;
      requestAnimationFrame(() => window.__lenis?.stop());

      const tl = gsap.timeline({
        onComplete: () => {
          window.__lenis?.start();
          setDone(true);
        },
      });

      tl.set('.loader-fill', { scaleX: 0, transformOrigin: 'left center' })
        .from('.loader-logo', {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
        })
        .to(
          '.loader-fill',
          { scaleX: 1, duration: 1.05, ease: 'power2.inOut' },
          '-=0.15'
        )
        .to(
          '.loader-logo',
          { opacity: 0, y: -14, duration: 0.4, ease: 'power2.in' },
          '+=0.12'
        )
        .to(
          root.current,
          { yPercent: -100, duration: 0.75, ease: 'power4.inOut' },
          '-=0.05'
        );
    },
    { scope: root }
  );

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-background"
    >
      <div className="loader-logo flex flex-col items-center gap-7">
        <Logo size={58} wordmarkClass="text-3xl sm:text-4xl" />
        <div className="h-px w-44 overflow-hidden rounded-full bg-border sm:w-56">
          <div className="loader-fill h-full w-full bg-iris-grad" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-text-muted">
          Loading experience
        </span>
      </div>
    </div>
  );
}
