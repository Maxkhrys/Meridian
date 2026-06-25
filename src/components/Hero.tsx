import { useRef } from 'react';
import { useGSAP, gsap, scrollToId } from '../hooks/useGSAP';
import MatrixRain from './MatrixRain';
import DecodeText from './DecodeText';

const trust = [
  '2-Week Turnaround',
  'Wicklow, Ireland',
  '100% Client Retention',
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.from('.hero-badge', {
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      })
        .from(
          '.hero-headline',
          { opacity: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        )
        .from(
          '.hero-sub',
          { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' },
          '+=0.9'
        )
        .from(
          '.hero-cta',
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
          },
          '-=0.4'
        )
        .from(
          '.hero-trust',
          { y: 16, opacity: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.3'
        )
        .from(
          '.hero-cue',
          { opacity: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.2'
        );

      // Parallax + fade content on scroll
      gsap.to('.hero-content', {
        y: 120,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      // Rain drifts up slightly slower for depth
      gsap.to('.hero-rain', {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Matrix digital rain */}
      <div className="hero-rain pointer-events-none absolute inset-0">
        <MatrixRain opacity={0.45} />
      </div>

      {/* Central emerald glow — ambient halo behind the headline */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[420px] w-[420px] -translate-y-16 rounded-full bg-emerald-glow opacity-60 blur-3xl md:h-[620px] md:w-[620px]" />
      </div>

      {/* Legibility vignette — darkens the centre so text reads cleanly */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 75% 65% at center, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0.8) 35%, rgba(8,8,8,0.35) 65%, transparent 100%)',
        }}
      />

      {/* Subtle grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage:
            'radial-gradient(circle at center, black 0%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(circle at center, black 0%, transparent 70%)',
        }}
      />

      {/* Floating decorative shapes */}
      <div className="pointer-events-none absolute right-[12%] top-[20%] hidden h-24 w-24 rotate-12 animate-floatY rounded-3xl border border-emerald/20 lg:block" />
      <div className="pointer-events-none absolute bottom-[24%] left-[10%] hidden h-16 w-16 -rotate-12 animate-floatY rounded-2xl border border-emerald/15 lg:block [animation-delay:-3s]" />

      <div className="hero-content container-px relative z-10 flex flex-col items-center text-center">
        {/* Status badge */}
        <div className="hero-badge mb-8 inline-flex items-center gap-2.5 rounded-full border border-emerald/30 bg-emerald/5 px-4 py-2 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-pale">
            Available for new projects · Q3 2026
          </span>
        </div>

        <h1 className="hero-headline mx-auto max-w-5xl text-balance text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl lg:text-[78px] xl:text-[88px]">
          <DecodeText
            text="The Last Website You'll"
            className="text-gradient text-glow block"
            startDelay={250}
            stagger={34}
          />
          <DecodeText
            text="Ever Need to Think About."
            className="text-gradient text-glow block"
            startDelay={250 + 24 * 34}
            stagger={34}
          />
        </h1>

        <p
          className="hero-sub mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-text-primary/75"
          style={{ textShadow: '0 2px 24px rgba(8,8,8,0.95)' }}
        >
          Meridian builds premium websites and digital systems for Irish
          businesses — so you can focus on running yours.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => scrollToId('#work')}
            className="hero-cta btn-ghost w-full sm:w-auto"
          >
            See Our Work
          </button>
          <button
            onClick={() => scrollToId('#contact')}
            className="hero-cta btn-primary w-full sm:w-auto"
          >
            Get a Quote
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10 h-4 w-4"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        {/* Trust row */}
        <div className="hero-trust mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {trust.map((t, i) => (
            <div key={t} className="flex items-center gap-6">
              {i > 0 && (
                <span className="hidden h-1 w-1 rounded-full bg-text-muted sm:block" />
              )}
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
                {t}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-cue pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-emerald/30 p-1.5">
          <span className="h-2 w-1 animate-scrollCue rounded-full bg-emerald" />
        </div>
      </div>
    </section>
  );
}
