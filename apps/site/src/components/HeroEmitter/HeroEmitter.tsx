import { useEffect, useRef } from 'react';
import './hero-emitter.scss';

const VB_W = 1000;
const VB_H = 520;
const GRAVITY = 0.35;
const MAX_PARTICLES = 150;
const LIFE = 78; // frames

interface Particle {
  x: number;
  y: number;
  r: number;
  size: number;
  vy: number;
  seed: number;
  freq: number;
  amp: number;
  age: number;
  el: SVGCircleElement;
}

export function HeroEmitter() {
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const group = groupRef.current;
    if (!svg || !group) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const mouse = { x: VB_W / 2, y: VB_H / 2, sx: VB_W / 2, sy: VB_H / 2, diff: 0 };
    const head = { x: VB_W / 2, y: VB_H / 2 };
    let particles: Particle[] = [];
    let running = false;
    let raf = 0;
    let frame = 0;

    const emit = (x: number, y: number, size: number) => {
      if (particles.length >= MAX_PARTICLES) return;
      const el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      el.setAttribute('fill', `hsl(${Math.floor(rand(20, 38))}, ${Math.floor(rand(88, 100))}%, ${Math.floor(rand(48, 58))}%)`);
      group.prepend(el);
      particles.push({
        x,
        y,
        r: 0,
        size,
        vy: 0,
        seed: rand(0, 1000),
        freq: rand(0.5, 1.5) * 0.05,
        amp: rand(0.4, 1.4),
        age: 0,
        el,
      });
    };

    const step = () => {
      frame++;
      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;
      mouse.diff = Math.hypot(mouse.x - mouse.sx, mouse.y - mouse.sy);

      const t = frame * 16;
      head.x = VB_W * 0.5 + VB_W * 0.36 * Math.cos(t * 0.0006);
      head.y = VB_H * 0.5 + VB_H * 0.16 * Math.cos(t * 0.0011);

      if (mouse.diff > 1) emit(mouse.sx, mouse.sy, Math.min(64, 22 + mouse.diff * 1.3));
      else emit(head.x, head.y, rand(22, 54));

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age++;
        p.r = p.age < 15 ? (p.age / 15) * p.size : p.size * Math.max(0, 1 - (p.age - 15) / (LIFE - 15));
        p.x += Math.cos((frame + p.seed) * p.freq) * p.amp;
        p.y += Math.sin((frame + p.seed) * p.freq) * p.amp + p.vy;
        p.vy += GRAVITY;
        p.el.setAttribute('cx', p.x.toFixed(1));
        p.el.setAttribute('cy', p.y.toFixed(1));
        p.el.setAttribute('r', p.r.toFixed(1));
        if (p.age >= LIFE) {
          p.el.remove();
          particles.splice(i, 1);
        }
      }

      if (running) raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (event: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * VB_W;
      mouse.y = ((event.clientY - rect.top) / rect.height) * VB_H;
    };

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    observer.observe(svg);
    window.addEventListener('mousemove', onMove);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener('mousemove', onMove);
      particles.forEach((p) => p.el.remove());
      particles = [];
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="hero-emitter"
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMinYMid meet"
      aria-hidden="true"
    >
      <defs>
        <filter id="hero-goo" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
          />
        </filter>
        <mask id="hero-emitter-mask">
          <text className="hero-emitter__line" x="8" y="215" fill="#fff">
            ASHAV
          </text>
          <text className="hero-emitter__line" x="8" y="475" fill="#fff">
            PARIHAR
          </text>
        </mask>
      </defs>
      <rect x="0" y="0" width={VB_W} height={VB_H} fill="#0a0a0a" mask="url(#hero-emitter-mask)" />
      <g ref={groupRef} filter="url(#hero-goo)" mask="url(#hero-emitter-mask)" />
    </svg>
  );
}
