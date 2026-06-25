import { useRef } from 'react';
import { useGSAP, gsap, revealOnScroll } from '../hooks/useGSAP';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  display?: string; // for non-numeric stats
}

const stats: Stat[] = [
  { value: 1, suffix: '+', label: 'Sites Delivered' },
  { value: 2, suffix: ' Weeks', label: 'Average Turnaround' },
  { value: 100, suffix: '%', label: 'Client Retention' },
  { value: 0, suffix: '', label: 'Based In', display: 'Wicklow, Ireland 🇮🇪' },
];

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealOnScroll('.about-text > *', {
        trigger: root.current,
        start: 'top 70%',
        y: 40,
        stagger: 0.12,
        duration: 0.9,
      });

      revealOnScroll('.stats-card', {
        trigger: root.current,
        start: 'top 70%',
        x: 40,
        duration: 1,
      });

      // Count-up numbers
      gsap.utils.toArray<HTMLElement>('.stat-number').forEach((el) => {
        const end = Number(el.dataset.value);
        const suffix = el.dataset.suffix ?? '';
        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.stats-card', start: 'top 80%' },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.val)}${suffix}`;
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="about" ref={root} className="relative py-28 md:py-36">
      <div className="container-px">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left text */}
          <div className="about-text">
            <p className="eyebrow mb-4">About</p>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-[48px] md:leading-tight">
              Built Different.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              Meridian was built on a simple idea: small businesses deserve the
              same quality websites as big brands — without the agency price tag
              or the 8-week wait.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-text-secondary">
              We're a lean, focused team based in Wicklow, Ireland. We move fast,
              we care about craft, and we're in it for the long game with every
              client we take on.
            </p>
          </div>

          {/* Right stats card */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-emerald-glow blur-2xl" />
            <div className="stats-card relative grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-surface-light p-8 transition-colors hover:bg-surface"
                >
                  {s.display ? (
                    <div className="text-2xl font-bold leading-tight text-text-primary">
                      {s.display}
                    </div>
                  ) : (
                    <div
                      className="stat-number text-4xl font-bold text-emerald md:text-5xl"
                      data-value={s.value}
                      data-suffix={s.suffix}
                    >
                      0{s.suffix}
                    </div>
                  )}
                  <div className="mt-2 text-sm text-text-secondary">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
