import { useRef } from 'react';
import { useGSAP, revealOnScroll } from '../hooks/useGSAP';
import SectionHeading from './SectionHeading';
import { showcaseProjects } from './showcase/projects';

const toneClasses = [
  'border-emerald/30 bg-emerald/10 text-emerald-glow',
  'border-teal/30 bg-teal/10 text-teal',
  'border-cyan/30 bg-cyan/10 text-cyan',
  'border-violet/30 bg-violet/10 text-violet',
];

export default function Portfolio() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealOnScroll(['.sh-eyebrow', '.sh-title', '.sh-sub'], {
        trigger: root.current,
        start: 'top 75%',
        y: 40,
        stagger: 0.1,
      });

      revealOnScroll('.portfolio-card', {
        trigger: '.portfolio-grid',
        y: 40,
        scale: 0.96,
        duration: 0.9,
        stagger: 0.1,
      });
    },
    { scope: root }
  );

  return (
    <section
      id="work"
      ref={root}
      className="relative overflow-hidden py-20 sm:py-28 md:py-36"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-40 h-[460px] w-[700px] -translate-x-1/2 blur-3xl"
        style={{
          background:
            'radial-gradient(50% 60% at 40% 50%, rgba(236,72,153,0.13), transparent 70%), radial-gradient(50% 60% at 70% 50%, rgba(139,92,246,0.12), transparent 70%)',
        }}
      />
      <div className="container-px relative">
        <SectionHeading
          eyebrow="Portfolio"
          title="Real work, real businesses."
          subtitle="A selection of sites we've designed and hand-coded for clients across Ireland."
        />

        <div className="portfolio-grid mt-16 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {showcaseProjects.map((p) => {
            const inner = (
              <>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${p.name} website`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                  {p.url && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      <span className="rounded-full border border-emerald px-6 py-2.5 text-sm font-semibold text-emerald">
                        View Site
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="display text-xl text-text-primary">
                      {p.name}
                    </h3>
                    {p.url && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-1 h-4 w-4 shrink-0 text-emerald transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      >
                        <path d="M7 17 17 7M7 7h10v10" />
                      </svg>
                    )}
                  </div>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-text-secondary">
                    {p.kind}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={tag}
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${toneClasses[i % toneClasses.length]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            );

            return p.url ? (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-card card card-hover group block overflow-hidden"
              >
                {inner}
              </a>
            ) : (
              <div
                key={p.name}
                className="portfolio-card card card-hover group block overflow-hidden"
              >
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
