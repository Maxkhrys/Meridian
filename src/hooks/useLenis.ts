import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialises Lenis smooth scrolling and wires it into the GSAP ticker
 * so ScrollTrigger stays perfectly in sync. Also exposes the instance on
 * `window.__lenis` so anchor links can scroll smoothly.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // ScrollTrigger start/end positions depend on final layout. Web fonts and
    // the full-height hero shift the document, so refresh once everything has
    // settled — otherwise child-triggered reveals never reach their start.
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh);
    }
    window.addEventListener('load', refresh);
    const settleTimer = window.setTimeout(refresh, 800);

    return () => {
      gsap.ticker.remove(raf);
      window.removeEventListener('load', refresh);
      window.clearTimeout(settleTimer);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}
