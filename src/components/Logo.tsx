interface Props {
  /** Size of the square mark in px. */
  size?: number;
  /** Tailwind text size class for the wordmark, e.g. 'text-2xl'. */
  wordmarkClass?: string;
  className?: string;
}

/**
 * Meridian logo: an emerald "M" mark with a soft glow, plus the wordmark
 * and accent dot. Reused in the navbar and footer.
 */
export default function Logo({
  size = 34,
  wordmarkClass = 'text-2xl',
  className = '',
}: Props) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className="shrink-0 drop-shadow-[0_0_10px_rgba(139,92,246,0.6)]"
      >
        <rect
          x="1.5"
          y="1.5"
          width="61"
          height="61"
          rx="15"
          fill="#0b0b14"
          stroke="url(#mGrad)"
          strokeWidth="1.5"
        />
        <path
          d="M16 46V18h6l10 16 10-16h6v28h-6V29L34 43h-4L20 29v17z"
          fill="url(#mGrad)"
        />
        <defs>
          <linearGradient id="mGrad" x1="16" y1="18" x2="48" y2="46">
            <stop stopColor="#a78bfa" />
            <stop offset="0.5" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
      <span
        className={`font-bold tracking-tight text-text-primary ${wordmarkClass}`}
      >
        Meridian
        <span className="ml-0.5 text-emerald-glow">.</span>
      </span>
    </span>
  );
}
