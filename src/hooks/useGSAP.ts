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

/**
 * Common "fade up on scroll" animation for section content.
 * Returns a config object spread into gsap.from().
 */
export const fadeUp = {
  y: 40,
  opacity: 0,
  duration: 0.9,
  ease: 'power3.out',
};
