import { useRef } from 'react';
import { useGSAP, revealOnScroll, scrollToId } from '../hooks/useGSAP';
import SectionHeading from './SectionHeading';

const tiers = [
  {
    name: 'Essential',
    tagline: 'Perfect for businesses getting started online',
    price: 'From €950',
    features: [
      'Custom designed website (up to 5 pages)',
      'Mobile responsive',
      'SEO optimised structure',
      'Contact form setup',
      'Hosting & domain setup',
      'Content Management System (Sanity CMS)',
      '1 month post-launch support',
    ],
    cta: 'Get a Quote',
    popular: false,
  },
  {
    name: 'Premium',
    tagline: 'For businesses that want to stand out',
    price: 'From €1,750',
    features: [
      'Everything in Essential',
      'Custom GSAP animations',
      'Booking system integration',
      'Google Business & Analytics setup',
      'Newsletter / mailing list integration',
      'Priority support',
    ],
    cta: 'Get a Quote',
    popular: true,
  },
  {
    name: 'Custom',
    tagline: 'For businesses with unique requirements',
    price: "Let's talk",
    features: [
      'Bespoke scoping and build',
      'Multi-location support',
      'Advanced integrations',
      'Dedicated account management',
      'Custom retainer',
    ],
    cta: "Let's talk →",
    popular: false,
  },
];

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 h-4 w-4 shrink-0 text-emerald"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function Pricing() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealOnScroll(['.sh-eyebrow', '.sh-title', '.sh-sub'], {
        trigger: root.current,
        start: 'top 75%',
        y: 40,
        stagger: 0.1,
      });

      revealOnScroll('.price-card', {
        trigger: '.price-grid',
        y: 50,
        stagger: 0.1,
      });
    },
    { scope: root }
  );

  return (
    <section
      id="pricing"
      ref={root}
      className="relative overflow-hidden bg-surface/30 py-28 md:py-36"
    >
      <div
        className="pointer-events-none absolute -right-20 top-10 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(34,211,238,0.16), transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-[380px] w-[380px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(16,185,129,0.14), transparent 70%)',
        }}
      />
      <div className="container-px relative">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, Transparent Pricing"
          subtitle="No hidden fees. No surprises. Just results."
        />

        <div className="price-grid mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`price-card relative flex flex-col rounded-2xl border p-8 transition-all duration-500 ${
                t.popular
                  ? 'border-emerald/40 bg-surface-light shadow-glow'
                  : 'card card-hover'
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-emerald bg-background px-4 py-1 text-xs font-semibold uppercase tracking-wider text-emerald">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-semibold text-text-primary">
                {t.name}
              </h3>
              <p className="mt-2 min-h-[48px] text-sm leading-relaxed text-text-secondary">
                {t.tagline}
              </p>

              <div className="my-6 text-3xl font-bold text-text-primary">
                {t.price}
              </div>

              <ul className="flex flex-1 flex-col gap-3">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-3 text-sm leading-relaxed text-text-secondary"
                  >
                    <Check />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollToId('#contact')}
                className={`mt-8 w-full ${t.popular ? 'btn-primary' : 'btn-ghost'}`}
              >
                {t.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-text-muted">
          All plans include a monthly retainer option for ongoing updates,
          support, and hosting management.
        </p>
      </div>
    </section>
  );
}
