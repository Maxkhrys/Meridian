import { useRef } from 'react';
import { useGSAP, revealOnScroll } from '../hooks/useGSAP';
import SectionHeading from './SectionHeading';

const services = [
  {
    title: 'Web Design & Development',
    desc: 'Custom-built websites using modern technology. Fast, responsive, and designed to convert visitors into customers.',
    accent: 'border-emerald/30 bg-emerald/10 text-emerald-glow',
    icon: <path d="M3 5h18v14H3zM3 9h18M7 13h6" strokeWidth="1.5" />,
  },
  {
    title: 'Booking System Integration',
    desc: 'We integrate and style booking systems to match your brand — so your customers get a seamless experience from first click to confirmed appointment.',
    accent: 'border-teal/30 bg-teal/10 text-teal',
    icon: (
      <path d="M7 3v3M17 3v3M4 8h16v12H4zM8 13h3v3H8z" strokeWidth="1.5" />
    ),
  },
  {
    title: 'Content Management',
    desc: 'Your site, your control. We set up a simple CMS so you can update your content, prices, and photos without touching a line of code.',
    accent: 'border-cyan/30 bg-cyan/10 text-cyan',
    icon: <path d="M5 4h14v16H5zM9 9h6M9 13h6M9 17h3" strokeWidth="1.5" />,
  },
  {
    title: 'Ongoing Support & Maintenance',
    desc: 'Monthly retainer plans that keep your site fast, secure, and up to date — with a real person to call when you need something changed.',
    accent: 'border-violet/30 bg-violet/10 text-violet',
    icon: (
      <path d="M12 4a8 8 0 1 0 8 8M12 8v4l3 2M16 4h4v4" strokeWidth="1.5" />
    ),
  },
];

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealOnScroll(['.sh-eyebrow', '.sh-title', '.sh-sub'], {
        trigger: root.current,
        start: 'top 75%',
        y: 40,
        stagger: 0.1,
      });

      revealOnScroll('.service-card', {
        trigger: '.service-grid',
        y: 50,
        stagger: 0.1,
      });
    },
    { scope: root }
  );

  return (
    <section
      id="services"
      ref={root}
      className="relative overflow-hidden py-20 sm:py-28 md:py-36"
    >
      <div
        className="pointer-events-none absolute -left-24 top-24 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(16,185,129,0.14), transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-10 h-[380px] w-[380px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(34,211,238,0.12), transparent 70%)',
        }}
      />
      <div className="container-px relative">
        <SectionHeading
          eyebrow="Services"
          title="What We Do"
          subtitle="Everything your business needs online, handled end to end."
        />

        <div className="service-grid mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.title}
              className="service-card card card-hover group p-8"
            >
              <div
                className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110 ${s.accent}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-6 w-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {s.icon}
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-text-primary">
                {s.title}
              </h3>
              <p className="leading-relaxed text-text-secondary">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
