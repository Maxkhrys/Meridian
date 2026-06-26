import { useRef, useState } from 'react';
import { useGSAP, revealOnScroll } from '../hooks/useGSAP';
import SectionHeading from './SectionHeading';

interface Project {
  name: string;
  description: string;
  tags: string[];
  url: string;
  /**
   * Real screenshot of the live site (preferred). Drop a PNG/JPG/WEBP into
   * /public/images and point this at it, e.g. '/images/boatyard.png'.
   */
  screenshot?: string;
  /** Stylised SVG fallback shown until a real screenshot is added. */
  image?: string;
}

const projects: Project[] = [
  {
    name: 'The Boat Yard Sauna',
    description:
      'A premium wellness experience with two locations in Wicklow Town and Arklow. Built on Astro with GSAP animations, Sanity CMS, Buttondown newsletter integration, and Wundabook booking system.',
    tags: ['Web Design', 'Booking Integration', 'CMS', 'Animations'],
    url: 'https://theboatyardsauna.io',
    screenshot: '/images/boatyard.png',
    image: '/images/boatyard-preview.svg',
  },
];

/**
 * Shows the real screenshot when present; if it's missing/fails to load, falls
 * back to the stylised SVG mockup, then to a generated frame.
 */
function MockupFrame({
  screenshot,
  image,
  name,
}: {
  screenshot?: string;
  image?: string;
  name: string;
}) {
  const [failed, setFailed] = useState(false);
  const src = !failed && screenshot ? screenshot : image;

  if (src) {
    return (
      <img
        src={src}
        alt={`${name} website`}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover object-top"
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
      revealOnScroll(['.sh-eyebrow', '.sh-title', '.sh-sub'], {
        trigger: root.current,
        start: 'top 75%',
        y: 40,
        stagger: 0.1,
      });

      revealOnScroll('.portfolio-card', {
        trigger: '.portfolio-grid',
        scale: 0.95,
        duration: 0.9,
        stagger: 0.12,
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
            'radial-gradient(50% 60% at 40% 50%, rgba(45,212,191,0.12), transparent 70%), radial-gradient(50% 60% at 70% 50%, rgba(139,92,246,0.10), transparent 70%)',
        }}
      />
      <div className="container-px relative">
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
                  <MockupFrame
                    screenshot={p.screenshot}
                    image={p.image}
                    name={p.name}
                  />
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
                  {p.tags.map((tag, i) => {
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
