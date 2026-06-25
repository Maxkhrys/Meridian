import { useEffect, useRef } from 'react';

interface Props {
  className?: string;
  /** Overall opacity of the rain layer (0–1). */
  opacity?: number;
  /** Base font size of the glyphs in px. */
  fontSize?: number;
}

const GLYPHS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノﾊﾋﾌﾍﾎマミムメモヤユヨラリルレロワヲン0123456789ABCDEFΣΦΨΩ<>/\\|=+*';

/**
 * The classic Matrix "digital rain" rendered to a canvas. Tuned to stay
 * elegant: emerald glyphs, long soft trails, occasional bright leading char,
 * capped frame-rate for performance, and disabled for reduced-motion users.
 */
export default function MatrixRain({
  className = '',
  opacity = 0.55,
  fontSize = 16,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];

    const random = (arr: string) =>
      arr[Math.floor(Math.random() * arr.length)];

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.max(1, Math.floor(width / fontSize));
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * -height) / fontSize)
      );
      ctx.fillStyle = '#080808';
      ctx.fillRect(0, 0, width, height);
    };

    setup();

    let raf = 0;
    let last = 0;
    const interval = 1000 / 22; // stepped, classic + performant

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (time - last < interval) return;
      last = time;

      // Translucent fade creates the trailing tails.
      ctx.fillStyle = 'rgba(8, 8, 8, 0.09)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      ctx.textBaseline = 'top';

      for (let i = 0; i < columns; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const char = random(GLYPHS);

        if (Math.random() > 0.94) {
          // Bright leading head
          ctx.fillStyle = '#a7f3d0';
          ctx.shadowColor = 'rgba(94, 234, 212, 0.9)';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = 'rgba(16, 185, 129, 0.8)';
          ctx.shadowBlur = 0;
        }
        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.965) {
          drops[i] = 0;
        }
        drops[i] += 1;
      }
      ctx.shadowBlur = 0;
    };

    if (!reduce) {
      raf = requestAnimationFrame(draw);
    }

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setup, 200);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer);
    };
  }, [fontSize]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ opacity, width: '100%', height: '100%' }}
    />
  );
}
