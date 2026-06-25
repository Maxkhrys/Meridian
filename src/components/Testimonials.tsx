import { useRef } from 'react';
import { useGSAP, revealOnScroll } from '../hooks/useGSAP';
import SectionHeading from './SectionHeading';

interface Testimonial {
  quote: string;
  name: string;
  business: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Maksim built us a site that genuinely represents what The Boat Yard Sauna is about. The process was smooth, he delivered fast, and the final product blew our expectations.',
    name: 'David Carroll',
    business: 'The Boat Yard Sauna',
  },
];

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealOnScroll(['.sh-eyebrow', '.sh-title', '.sh-sub'], {
        trigger: root.current,
        start: 'top 75%',
        y: 40,
        stagger: 0.1,
      });

      revealOnScroll('.testimonial-card', {
        trigger: '.testimonial-grid',
        start: 'top 85%',
        y: 50,
        stagger: 0.12,
      });
    },
    { scope: root }
  );

  return (
    <section
      id="testimonials"
      ref={root}
      className="relative bg-surface/30 py-28 md:py-36"
    >
      <div className="container-px">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Clients Say"
        />

        <div
          className={`testimonial-grid mt-16 grid gap-6 ${
            testimonials.length > 1
              ? 'md:grid-cols-2 lg:grid-cols-3'
              : 'mx-auto max-w-2xl'
          }`}
        >
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="testimonial-card card card-hover flex flex-col p-8"
            >
              <span
                aria-hidden
                className="text-gradient-color font-serif text-7xl leading-none"
              >
                &ldquo;
              </span>
              <blockquote className="mt-2 flex-1 text-lg leading-relaxed text-text-primary">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-5">
                <div className="font-semibold text-text-primary">{t.name}</div>
                <div className="text-sm text-text-secondary">{t.business}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
