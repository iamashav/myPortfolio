import { useEffect, useRef } from 'react';
import './tech-strip.scss';

const tech = [
  'React',
  'Vue',
  'TypeScript',
  'Redux',
  'MobX',
  'Python',
  'Node.js',
  'REST APIs',
  'GraphQL',
  'LLM APIs',
  'AI Agents',
  'MCP',
  'Jest',
  'Playwright',
  'Vite',
  'Docker',
  'GitHub Actions',
  'Sass',
  'Tailwind',
  'Firebase',
  'PostgreSQL',
];

const RADIUS = 170;
const STRENGTH = 64;

export function TechStrip() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    // Magnetic repulsion needs a fine pointer to aim with; touch/reduced-motion keep the static cluster.
    const interactive = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!interactive.matches) return;

    let raf = 0;
    let running = false;
    let pointerX = -9999;
    let pointerY = -9999;
    const state = tech.map(() => ({ x: 0, y: 0, phase: Math.random() * Math.PI * 2 }));

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
    };
    const onLeave = () => {
      pointerX = -9999;
      pointerY = -9999;
    };

    const render = () => {
      const rect = field.getBoundingClientRect();
      const px = pointerX - rect.left;
      const py = pointerY - rect.top;
      const t = performance.now() / 1000;

      chipRefs.current.forEach((chip, i) => {
        if (!chip) return;
        const hx = chip.offsetLeft + chip.offsetWidth / 2;
        const hy = chip.offsetTop + chip.offsetHeight / 2;
        const dx = hx - px;
        const dy = hy - py;
        const dist = Math.hypot(dx, dy) || 1;

        let tx = 0;
        let ty = 0;
        if (dist < RADIUS) {
          const force = (1 - dist / RADIUS) * STRENGTH;
          tx = (dx / dist) * force;
          ty = (dy / dist) * force;
        }

        const s = state[i];
        s.x += (tx - s.x) * 0.14;
        s.y += (ty - s.y) * 0.14;
        const floatY = Math.sin(t * 1.2 + s.phase) * 3;
        chip.style.transform = `translate(${s.x.toFixed(2)}px, ${(s.y + floatY).toFixed(2)}px)`;
      });

      raf = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(render);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    observer.observe(field);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);

    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="tech-strip" aria-label="Technologies I work with">
      <p className="tech-strip__label">Toolbox</p>
      <div className="tech-strip__field" ref={fieldRef} aria-hidden="true">
        {tech.map((item, i) => (
          <span
            className="tech-strip__chip"
            key={item}
            ref={(el) => {
              chipRefs.current[i] = el;
            }}
          >
            {item}
          </span>
        ))}
      </div>
      <ul className="tech-strip__sr">
        {tech.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
