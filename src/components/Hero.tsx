import { useRef } from 'react';
import { useGSAP, gsap, scrollToId } from '../hooks/useGSAP';

const HEADLINE = "The Last Website You'll Ever Need to Think About.";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from('.hero-word', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
      })
        .from(
          '.hero-sub',
          { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
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
    },
    { scope: root }
  );

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-emerald-glow blur-3xl md:h-[900px] md:w-[900px]" />
      </div>

      {/* Subtle grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(circle at center, black 0%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(circle at center, black 0%, transparent 75%)',
        }}
      />

      {/* Floating decorative shape */}
      <div className="pointer-events-none absolute right-[12%] top-[22%] hidden h-24 w-24 rotate-12 rounded-3xl border border-emerald/20 lg:block" />
      <div className="pointer-events-none absolute left-[10%] bottom-[24%] hidden h-16 w-16 -rotate-12 rounded-2xl border border-emerald/10 lg:block" />

      <div className="hero-content container-px relative z-10 text-center">
        <p className="eyebrow mb-6">Web Design & Digital Services · Ireland</p>

        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-[80px]">
          {HEADLINE.split(' ').map((word, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="hero-word inline-block">
                {word}
                {i < HEADLINE.split(' ').length - 1 && ' '}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-sub mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary">
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
          </button>
        </div>
      </div>
    </section>
  );
}
