import { useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  className?: string;
  /** ms before the decode wave starts. */
  startDelay?: number;
  /** ms between each character locking into place. */
  stagger?: number;
  as?: 'span' | 'h1' | 'h2' | 'p';
}

const GLYPHS = 'アイウエカサタナﾊﾏ01<>/=+*[]{}#%ΣΦΨΩ';
const randomGlyph = () =>
  GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

/**
 * Renders text with a Matrix-style "decrypt" reveal: characters scramble
 * through random glyphs then lock in left-to-right. Width is reserved from
 * the start (scrambled glyphs, not blanks) so there's no layout shift.
 * Respects prefers-reduced-motion.
 */
export default function DecodeText({
  text,
  className = '',
  startDelay = 200,
  stagger = 40,
  as: Tag = 'span',
}: Props) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduce) {
      setDisplay(text);
      return;
    }

    const chars = text.split('');
    const start = performance.now();
    let lastScramble = 0;
    let scramble = chars.map(() => randomGlyph());

    const tick = (now: number) => {
      const elapsed = now - start;

      if (now - lastScramble > 55) {
        scramble = chars.map(() => randomGlyph());
        lastScramble = now;
      }

      let done = true;
      const out = chars.map((c, i) => {
        if (c === ' ' || c === ' ') return c;
        const revealAt = startDelay + i * stagger;
        if (elapsed >= revealAt) return c;
        done = false;
        return scramble[i];
      });

      setDisplay(out.join(''));

      if (done) {
        setDisplay(text);
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [text, startDelay, stagger]);

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </Tag>
  );
}
