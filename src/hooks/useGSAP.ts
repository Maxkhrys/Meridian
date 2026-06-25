import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Re-export the official hook so components import from one place.
export { useGSAP, gsap, ScrollTrigger };

/**
 * Smoothly scrolls to an anchor target using Lenis when available,
 * falling back to native scrolling otherwise.
 */
export function scrollToId(id: string) {
  const target = document.querySelector(id);
  if (!target) return;

  if (window.__lenis) {
    window.__lenis.scrollTo(target as HTMLElement, { offset: -80 });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

interface RevealVars {
  trigger: Element | string | null;
  start?: string;
  y?: number;
  x?: number;
  scale?: number;
  stagger?: number;
  duration?: number;
}

/**
 * Scroll-triggered reveal. Uses fromTo() with an explicit end state — this is
 * deliberate: a plain from() tween re-reads the element's current (already
 * hidden) value as its destination on ScrollTrigger refresh and gets stuck at
 * opacity 0. fromTo() pins the end state so reveals are bulletproof.
 */
export function revealOnScroll(
  targets: gsap.TweenTarget,
  {
    trigger,
    start = 'top 80%',
    y = 0,
    x = 0,
    scale = 1,
    stagger = 0,
    duration = 0.85,
  }: RevealVars
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y, x, scale },
    {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration,
      ease: 'power3.out',
      stagger,
      scrollTrigger: { trigger: trigger ?? undefined, start },
    }
  );
}
