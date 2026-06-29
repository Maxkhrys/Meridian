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
    // Bigger glyphs (fewer columns) + lower frame-rate on phones keeps the
    // canvas cheap so scrolling stays smooth.
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const size = isMobile ? Math.round(fontSize * 1.5) : fontSize;
    const interval = 1000 / (isMobile ? 14 : 22);

    // Iridescent heads — violet / cyan / magenta lead the rain.
    const heads = ['#ddd6fe', '#67e8f9', '#f9a8d4', '#a78bfa'];
    const trails = [
      'rgba(139, 92, 246, 0.8)',
      'rgba(34, 211, 238, 0.6)',
      'rgba(236, 72, 153, 0.55)',
    ];
    const random = (arr: string) =>
      arr[Math.floor(Math.random() * arr.length)];
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.max(1, Math.floor(width / size));
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * -height) / size)
      );
      ctx.fillStyle = '#08080c';
      ctx.fillRect(0, 0, width, height);
    };

    setup();

    let raf = 0;
    let last = 0;
    let running = false;

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (time - last < interval) return;
      last = time;

      // Translucent fade creates the trailing tails.
      ctx.fillStyle = 'rgba(8, 8, 12, 0.09)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${size}px "JetBrains Mono", monospace`;
      ctx.textBaseline = 'top';

      for (let i = 0; i < columns; i++) {
        const x = i * size;
        const y = drops[i] * size;
        const char = random(GLYPHS);

        if (Math.random() > 0.94) {
          ctx.fillStyle = pick(heads);
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = isMobile ? 0 : 8;
        } else {
          ctx.fillStyle = pick(trails);
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

    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Only animate while the canvas is on screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(canvas);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setup, 200);
    };
    window.addEventListener('resize', onResize);

    return () => {
      stop();
      io.disconnect();
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
