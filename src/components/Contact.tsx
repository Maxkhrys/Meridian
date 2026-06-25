import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useGSAP, revealOnScroll } from '../hooks/useGSAP';
import SectionHeading from './SectionHeading';
import { sendEnquiry, isEmailJsConfigured } from '../lib/emailjs';

const businessTypes = [
  'Restaurant / Café',
  'Salon / Barbershop',
  'Gym / Fitness',
  'Wellness / Spa',
  'Retail',
  'Other',
];

const lookingForOptions = [
  'New Website',
  'Redesign',
  'Booking Integration',
  'CMS Setup',
  'Ongoing Maintenance',
  'Not Sure Yet',
];

type Status = 'idle' | 'sending' | 'success' | 'error';

const inputClass =
  'w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary placeholder:text-text-muted transition-colors focus:border-emerald/50 focus:outline-none focus:ring-1 focus:ring-emerald/30';

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [lookingFor, setLookingFor] = useState<string[]>([]);

  useGSAP(
    () => {
      revealOnScroll(['.sh-eyebrow', '.sh-title', '.sh-sub'], {
        trigger: root.current,
        start: 'top 75%',
        y: 40,
        stagger: 0.1,
      });

      revealOnScroll('.contact-col', {
        trigger: '.contact-grid',
        y: 50,
        duration: 0.9,
        stagger: 0.15,
      });
    },
    { scope: root }
  );

  const toggleLookingFor = (value: string) => {
    setLookingFor((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setError('');

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get('name') ?? ''),
      business_name: String(data.get('business_name') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      business_type: String(data.get('business_type') ?? ''),
      has_website: String(data.get('has_website') ?? ''),
      looking_for: lookingFor.join(', '),
      message: String(data.get('message') ?? ''),
    };

    try {
      await sendEnquiry(payload);
      setStatus('success');
      form.reset();
      setLookingFor([]);
    } catch (err) {
      setStatus('error');
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please email us directly.'
      );
    }
  };

  return (
    <section id="contact" ref={root} className="relative py-28 md:py-36">
      {/* glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-glow blur-3xl" />

      <div className="container-px relative">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something."
          subtitle="Tell us about your business and we'll come back to you within 24 hours."
        />

        <div className="contact-grid mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Form */}
          <div className="contact-col card p-8 md:p-10">
            {status === 'success' ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-emerald bg-emerald/10 text-emerald">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-text-primary">
                  Thanks! We'll be in touch within 24 hours.
                </h3>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-ghost mt-8"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field label="Name" required>
                    <input
                      name="name"
                      required
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </Field>
                  <Field label="Business Name" required>
                    <input
                      name="business_name"
                      required
                      className={inputClass}
                      placeholder="Your business"
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      name="email"
                      type="email"
                      required
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </Field>
                  <Field label="Phone (optional)">
                    <input
                      name="phone"
                      type="tel"
                      className={inputClass}
                      placeholder="+353 ..."
                    />
                  </Field>
                </div>

                <Field label="Type of business">
                  <select name="business_type" className={inputClass} required>
                    <option value="" disabled>
                      Select one
                    </option>
                    {businessTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Do you already have a website?">
                  <div className="flex gap-6 pt-1">
                    {['Yes', 'No'].map((opt) => (
                      <label
                        key={opt}
                        className="flex cursor-pointer items-center gap-2 text-text-secondary"
                      >
                        <input
                          type="radio"
                          name="has_website"
                          value={opt}
                          required
                          className="accent-emerald"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </Field>

                <Field label="What are you looking for?">
                  <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
                    {lookingForOptions.map((opt) => {
                      const active = lookingFor.includes(opt);
                      return (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => toggleLookingFor(opt)}
                          className={`flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-left text-sm transition-all ${
                            active
                              ? 'border-emerald/50 bg-emerald/10 text-text-primary'
                              : 'border-border bg-surface text-text-secondary hover:border-emerald/30'
                          }`}
                        >
                          <span
                            className={`flex h-4 w-4 items-center justify-center rounded border ${
                              active
                                ? 'border-emerald bg-emerald text-background'
                                : 'border-text-muted'
                            }`}
                          >
                            {active && (
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                className="h-3 w-3"
                              >
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                            )}
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </Field>

                <Field label="Anything else you'd like us to know? (optional)">
                  <textarea
                    name="message"
                    rows={4}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us more..."
                  />
                </Field>

                {!isEmailJsConfigured() && (
                  <p className="text-sm text-text-muted">
                    Note: EmailJS isn't configured yet. Add your keys to{' '}
                    <code className="text-text-secondary">.env</code> to enable
                    sending.
                  </p>
                )}

                {status === 'error' && (
                  <p className="text-sm text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Enquiry'}
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="contact-col relative">
            <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-emerald-glow blur-2xl" />
            <div className="relative flex h-full flex-col gap-6 rounded-2xl border border-emerald/20 bg-surface-light p-8">
              <h3 className="text-xl font-semibold text-text-primary">
                Get in touch
              </h3>

              <InfoRow icon="📧" label="Email">
                <a
                  href="mailto:popupmax@gmail.com"
                  className="text-text-secondary transition-colors hover:text-emerald"
                >
                  popupmax@gmail.com
                </a>
              </InfoRow>

              <InfoRow icon="📍" label="Location">
                <span className="text-text-secondary">Wicklow, Ireland</span>
              </InfoRow>

              <InfoRow icon="⚡" label="Response time">
                <span className="text-text-secondary">
                  We typically respond within 24 hours
                </span>
              </InfoRow>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-text-primary">
        {label}
        {required && <span className="text-emerald"> *</span>}
      </span>
      {children}
    </label>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xl">{icon}</span>
      <div>
        <div className="text-xs uppercase tracking-wider text-text-muted">
          {label}
        </div>
        <div className="mt-0.5">{children}</div>
      </div>
    </div>
  );
}
