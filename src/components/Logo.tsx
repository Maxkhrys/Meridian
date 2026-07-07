interface Props {
  /** Size of the mark in px. */
  size?: number;
  /** Tailwind text size class for the wordmark, e.g. 'text-2xl'. */
  wordmarkClass?: string;
  className?: string;
}

/**
 * Aurelo logo: a pink lightning-bolt mark with a soft glow plus the wordmark.
 * Reused in the navbar, footer and loader.
 */
export default function Logo({
  size = 32,
  wordmarkClass = 'text-2xl',
  className = '',
}: Props) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        className="shrink-0 drop-shadow-[0_0_12px_rgba(236,72,153,0.65)]"
      >
        <path
          d="M28 3 L9 27 H21 L18 45 L39 20 H26 Z"
          fill="url(#boltGrad)"
        />
        <defs>
          <linearGradient id="boltGrad" x1="9" y1="3" x2="39" y2="45">
            <stop stopColor="#f472b6" />
            <stop offset="0.5" stopColor="#ec4899" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
      <span
        className={`font-bold uppercase tracking-[0.14em] text-text-primary ${wordmarkClass}`}
      >
        Aurelo
      </span>
    </span>
  );
}
