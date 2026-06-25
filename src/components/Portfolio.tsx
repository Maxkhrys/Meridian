import { useRef } from 'react';
import { useGSAP, gsap } from '../hooks/useGSAP';
import SectionHeading from './SectionHeading';

interface Project {
  name: string;
  description: string;
  tags: string[];
  url: string;
  /** Swap this for a real screenshot path in /public when available. */
  image?: string;
}

const projects: Project[] = [
  {
    name: 'The Boat Yard Sauna',
    description:
      'A premium wellness experience with two locations in Wicklow Town and Arklow. Built on Astro with GSAP animations, Sanity CMS, Buttondown newsletter integration, and Wundabook booking system.',
    tags: ['Web Design', 'Booking Integration', 'CMS', 'Animations'],
    url: 'https://theboatyardsauna.io',
  },
];

/** Dark mockup frame used as a placeholder until a real screenshot is added. */
function MockupFrame({ image, name }: { image?: string; name: string }) {
  if (image) {
    return (
      <img
        src={image}
        alt={`${name} website`}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-br from-surface-light to-background">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
      </div>
      {/* Faux content */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        <div className="absolute h-40 w-40 rounded-full bg-emerald-glow blur-2xl" />
        <span className="relative text-xl font-bold tracking-tight text-text-secondary">
          {name}
        </span>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(['.sh-eyebrow', '.sh-title', '.sh-sub'], {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });

      gsap.from('.portfolio-card', {
        scale: 0.95,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.portfolio-grid', start: 'top 80%' },
      });
    },
    { scope: root }
  );

  return (
    <section id="work" ref={root} className="relative py-28 md:py-36">
      <div className="container-px">
        <SectionHeading
          eyebrow="Portfolio"
          title="Our Work"
          subtitle="Real sites. Real businesses. Real results."
        />

        <div className="portfolio-grid mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-card card card-hover group block overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]">
                  <MockupFrame image={p.image} name={p.name} />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-background/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded-full border border-emerald px-6 py-2.5 text-sm font-semibold text-emerald">
                    View Project
                  </span>
                </div>
              </div>

              <div className="p-7">
                <h3 className="text-xl font-semibold text-text-primary">
                  {p.name}
                </h3>
                <p className="mt-3 leading-relaxed text-text-secondary">
                  {p.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-surface-light px-3 py-1 text-xs font-medium text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald">
                  View Site
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  >
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
