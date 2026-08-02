import { useEffect, useRef } from 'react';
import { getLenis } from '../../lib/lenis';
import './scrollbar.scss';

const THUMB_HEIGHT = 40; // px — small fixed thumb that slides, not a proportional bar

export function Scrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;

    let dragging = false;
    let dragOffset = 0;

    const update = () => {
      // While dragging, the thumb is positioned straight from the cursor; don't let scroll events fight it.
      if (dragging) return;
      const scrollHeight = document.documentElement.scrollHeight;
      const viewport = window.innerHeight;
      const trackHeight = track.clientHeight;
      const maxScroll = scrollHeight - viewport;

      thumb.style.setProperty('--scrollbar-height', `${THUMB_HEIGHT}px`);
      if (maxScroll <= 0) {
        thumb.style.setProperty('--scrollbar-top', '0px');
        return;
      }
      const top = (window.scrollY / maxScroll) * (trackHeight - THUMB_HEIGHT);
      thumb.style.setProperty('--scrollbar-top', `${top}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const trackRect = track.getBoundingClientRect();
      const maxThumbTop = trackRect.height - thumb.offsetHeight;
      if (maxThumbTop <= 0) return;
      const top = Math.min(Math.max(event.clientY - trackRect.top - dragOffset, 0), maxThumbTop);
      // Move the thumb straight from the pointer so it tracks the cursor 1:1, then match the page to it.
      thumb.style.setProperty('--scrollbar-top', `${top}px`);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      // 'instant' overrides html { scroll-behavior: smooth }, which would otherwise ease behind the drag.
      window.scrollTo({ top: (top / maxThumbTop) * maxScroll, behavior: 'instant' });
    };

    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      getLenis()?.start();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      update();
    };

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      dragOffset = event.clientY - thumb.getBoundingClientRect().top;
      // Pausing Lenis lets the drag jump the page instantly instead of easing behind the cursor.
      getLenis()?.stop();
      // Window-level listeners keep the drag alive even when the cursor outruns the thin thumb.
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      event.preventDefault();
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    thumb.addEventListener('pointerdown', onPointerDown);

    // Page height changes as images/fonts load, so recompute the thumb when the document body resizes.
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      thumb.removeEventListener('pointerdown', onPointerDown);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="site-scrollbar" aria-hidden="true">
      <div className="site-scrollbar__track" ref={trackRef} />
      <div className="site-scrollbar__thumb" ref={thumbRef} />
    </div>
  );
}
