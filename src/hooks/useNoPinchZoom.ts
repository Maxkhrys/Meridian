import { useEffect } from 'react';

/**
 * Prevents pinch-to-zoom on mobile. The viewport meta + CSS `touch-action`
 * cover most browsers, but iOS Safari ignores `user-scalable=no`, so we also
 * cancel its non-standard gesture events and any multi-touch move.
 */
export function useNoPinchZoom() {
  useEffect(() => {
    const prevent = (e: Event) => e.preventDefault();

    // iOS Safari pinch gestures.
    document.addEventListener('gesturestart', prevent, { passive: false });
    document.addEventListener('gesturechange', prevent, { passive: false });
    document.addEventListener('gestureend', prevent, { passive: false });

    // Fallback: cancel any two-finger move (pinch) without touching
    // single-finger scrolling.
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };
    document.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      document.removeEventListener('gesturestart', prevent);
      document.removeEventListener('gesturechange', prevent);
      document.removeEventListener('gestureend', prevent);
      document.removeEventListener('touchmove', onTouchMove);
    };
  }, []);
}
