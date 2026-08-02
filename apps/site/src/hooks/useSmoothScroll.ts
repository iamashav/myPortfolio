import { useEffect } from 'react';
import Lenis from 'lenis';
import { setLenis } from '../lib/lenis';

export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    setLenis(lenis);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const href = event.target.closest('a[href^="#"]')?.getAttribute('href');
      if (!href || href === '#') return;
      event.preventDefault();
      lenis.scrollTo(href);
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
}
