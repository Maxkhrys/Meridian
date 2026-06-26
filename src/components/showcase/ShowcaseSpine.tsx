import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useGSAP, ScrollTrigger } from '../../hooks/useGSAP';
import { showcaseProjects } from './projects';
import ShowcaseScene from './ShowcaseScene';

/** Tracks a media query as React state. */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [query]);
  return matches;
}

export default function ShowcaseSpine() {
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const items = showcaseProjects;
  const n = items.length;

  // Drive the scroll progress that the 3D scene reads each frame.
  useGSAP(
    () => {
      const st = ScrollTrigger.create({
        trigger: section.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          progress.current = self.progress;
          if (self.progress > 0.015 && !started) setStarted(true);
          const idx = Math.min(n - 1, Math.round(self.progress * (n - 1)));
          setActive((prev) => (prev !== idx ? idx : prev));
        },
      });
      return () => st.kill();
    },
    { scope: section, dependencies: [n] }
  );

  // Only render the canvas while the section is on screen.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '100px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const scrollToBlock = (i: number) => {
    const el = section.current;
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top;
    const dist = el.offsetHeight - window.innerHeight;
    const target = top + (i / (n - 1)) * dist;
    if (window.__lenis) window.__lenis.scrollTo(target);
    else window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const current = items[active];

  return (
    <section
      id="showcase"
      ref={section}
      className="relative"
      style={{ height: `${n * (isMobile ? 62 : 80)}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Ambient colour wash behind the chain */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 50% at 50% 42%, rgba(16,185,129,0.18), transparent 70%), radial-gradient(50% 45% at 78% 75%, rgba(34,211,238,0.14), transparent 70%), radial-gradient(45% 40% at 18% 80%, rgba(139,92,246,0.10), transparent 70%)',
          }}
        />

        {/* 3D canvas */}
        <Canvas
          className="!absolute inset-0"
          dpr={[1, isMobile ? 1.4 : 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          camera={{
            position: [0, 0, isMobile ? 9.4 : 8.8],
            fov: isMobile ? 50 : 40,
          }}
          frameloop={visible ? 'always' : 'never'}
        >
          <Suspense fallback={null}>
            <ShowcaseScene items={items} progress={progress} isMobile={isMobile} />
            {!isMobile && !reduced && (
              <EffectComposer>
                <Bloom
                  mipmapBlur
                  intensity={0.85}
                  luminanceThreshold={0.55}
                  luminanceSmoothing={0.32}
                  radius={0.72}
                />
              </EffectComposer>
            )}
          </Suspense>
        </Canvas>

        {/* ---- Overlay UI ---- */}
        {/* Heading — sits in a darkened top zone so it never muddies the 3D */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-background via-background/80 to-transparent pb-24 pt-20 text-center sm:pt-24">
          <div className="container-px">
            <p className="eyebrow mb-2">Selected Work</p>
            <h2 className="text-gradient-color text-xl font-bold tracking-tight sm:text-3xl md:text-[40px]">
              Sites we&rsquo;ve brought to life.
            </h2>
          </div>
        </div>

        {/* Active project — sits in a darkened bottom zone, well clear of the
            screens above it */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-background via-background/90 to-transparent pb-8 pt-28 sm:pb-12">
          <div
            key={active}
            className="container-px animate-enterUp mx-auto flex max-w-2xl flex-col items-center text-center"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="font-mono text-xs text-emerald-glow sm:text-sm">
                {String(active + 1).padStart(2, '0')}
              </span>
              <span className="h-px w-6 bg-emerald/40 sm:w-8" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary sm:text-xs">
                {current.kind}
              </span>
            </div>
            <h3 className="text-xl font-bold text-text-primary sm:text-3xl md:text-4xl">
              {current.name}
            </h3>
            <p className="mt-3 hidden max-w-xl text-sm leading-relaxed text-text-secondary sm:block sm:text-base">
              {current.blurb}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {current.tags.map((tag, i) => {
                const tones = [
                  'border-emerald/30 bg-emerald/10 text-emerald-glow',
                  'border-teal/30 bg-teal/10 text-teal',
                  'border-cyan/30 bg-cyan/10 text-cyan',
                  'border-violet/30 bg-violet/10 text-violet',
                ];
                return (
                  <span
                    key={tag}
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${tones[i % tones.length]}`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
            {current.url && (
              <a
                href={current.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto group mt-5 inline-flex items-center gap-1.5 rounded-full border border-emerald/40 bg-emerald/10 px-5 py-2 text-sm font-semibold text-emerald transition-colors hover:bg-emerald/20"
              >
                Visit live site
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Blockchain node rail (desktop) */}
        <div className="pointer-events-auto absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-center">
          <div className="relative flex flex-col items-center gap-5 py-2">
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
            <span
              className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-emerald via-teal to-cyan transition-[height] duration-300"
              style={{ height: `${(active / (n - 1)) * 100}%` }}
            />
            {items.map((item, i) => (
              <button
                key={item.name}
                onClick={() => scrollToBlock(i)}
                aria-label={`Go to ${item.name}`}
                className="group relative flex h-3 w-3 items-center justify-center"
              >
                <span
                  className={`h-2.5 w-2.5 rotate-45 border transition-all duration-300 ${
                    i === active
                      ? 'scale-125 border-emerald bg-emerald shadow-glow-sm'
                      : 'border-text-muted bg-background group-hover:border-emerald/60'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Scroll hint — fades out once you start */}
        <div
          className={`pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 transition-opacity duration-500 lg:bottom-6 ${
            started ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}
