import { useRef } from 'react';
import { useGSAP, revealOnScroll, scrollToId } from '../hooks/useGSAP';
import SectionHeading from './SectionHeading';

const plans = [
  {
    name: 'The Website',
    tagline: 'Everything you need to launch, done properly.',
    price: '€1,450',
    period: 'one-off',
    features: [
      'Custom design — never a template',
      'Hand-coded and lightning fast',
      'Fully responsive on every device',
      'SEO-ready structure & metadata',
      'Admin panel to manage your own content',
      'Booking, contact & integrations as needed',
      'Hosting & domain setup',
      "You own it outright — it's yours",
      'Support through launch',
    ],
    cta: 'Start your project',
    featured: true,
  },
  {
    name: 'Care Plan',
    tagline: 'Optional. Completely hands-off.',
    price: '€90',
    period: 'per month',
    features: [
      'Unlimited content updates',
      'Hosting & domain managed for you',
      'Security, backups & uptime',
      'Performance monitoring',
      'Priority support',
      'Cancel anytime',
    ],
    cta: 'Add a Care Plan',
    featured: false,
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
        stagger: 0.12,
      });
    },
    { scope: root }
  );

  return (
    <section
      id="pricing"
      ref={root}
      className="relative overflow-hidden bg-surface/30 py-20 sm:py-28 md:py-36"
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
            'radial-gradient(circle, rgba(236,72,153,0.14), transparent 70%)',
        }}
      />
      <div className="container-px relative">
        <SectionHeading
          eyebrow="Pricing"
          title="One price to build it."
          subtitle="No hidden fees, no surprises. One clear price to build your site, and an optional plan to look after it."
        />

        <div className="price-grid mx-auto mt-16 grid max-w-4xl grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`price-card relative flex flex-col rounded-2xl border p-8 transition-all duration-500 md:p-9 ${
                p.featured
                  ? 'border-emerald/40 bg-surface-light shadow-glow'
                  : 'card card-hover'
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-8 rounded-full border border-emerald bg-background px-4 py-1 text-xs font-semibold uppercase tracking-wider text-emerald">
                  The Build
                </span>
              )}

              <h3 className="display text-2xl text-text-primary">{p.name}</h3>
              <p className="mt-2 min-h-[44px] text-sm leading-relaxed text-text-secondary">
                {p.tagline}
              </p>

              <div className="my-6 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-text-primary md:text-5xl">
                  {p.price}
                </span>
                <span className="text-sm text-text-muted">{p.period}</span>
              </div>

              <ul className="flex flex-1 flex-col gap-3">
                {p.features.map((f) => (
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
                className={`mt-8 w-full ${p.featured ? 'btn-primary' : 'btn-ghost'}`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-text-muted">
          Something bigger in mind — multi-location, full e-commerce or a custom
          build?{' '}
          <button
            onClick={() => scrollToId('#contact')}
            className="text-emerald underline-offset-4 transition-colors hover:text-emerald-glow hover:underline"
          >
            Let&rsquo;s talk
          </button>
          .
        </p>
      </div>
    </section>
  );
}
