interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

/**
 * Shared section heading. Parent sections animate these via the
 * `.sh-eyebrow`, `.sh-title`, `.sh-sub` classes using their own GSAP scope.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className = '',
}: Props) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      {eyebrow && <p className="sh-eyebrow eyebrow mb-4">{eyebrow}</p>}
      <h2 className="sh-title display text-gradient-color text-3xl sm:text-4xl md:text-[52px] md:leading-[1.05]">
        {title}
      </h2>
      {subtitle && (
        <p className="sh-sub mt-5 text-lg leading-relaxed text-text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
}
