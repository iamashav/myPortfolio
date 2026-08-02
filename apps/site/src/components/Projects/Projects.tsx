import { useEffect, useRef } from 'react';
import { projects } from '../../data/projects';
import './projects.scss';

interface Star {
  x: number;
  y: number;
  depth: number;
  tint: string;
}

const INTRO = 0.16;
const OUTRO = 0.9;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!section || !stage || !canvas) return;

    // The streaking starfield is motion, so honour reduced-motion by skipping the whole thing.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // The starfield runs at every width; only the scroll-scrubbed rocket/card flight needs desktop.
    const flightQuery = window.matchMedia('(min-width: 768px)');
    let flightActive = flightQuery.matches;

    const slot = (OUTRO - INTRO) / projects.length;
    let raf = 0;
    let lastScrollY = window.scrollY;
    let smoothVel = 0;
    let facing = 180;
    let targetFacing = 180;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];

    // Star tints read from the shared palette triplets so the canvas stays a single source of truth with CSS.
    const rootStyle = getComputedStyle(document.documentElement);
    const starAccent = `rgb(${rootStyle.getPropertyValue('--accent-rgb')})`;
    const starSpark = `rgb(${rootStyle.getPropertyValue('--accent-2-rgb')})`;

    const seedStars = () => {
      const count = clamp(Math.round((width * height) / 6500), 90, 260);
      stars = Array.from({ length: count }, () => {
        const roll = Math.random();
        const tint = roll > 0.92 ? starSpark : roll > 0.78 ? starAccent : '#ffffff';
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          depth: 0.3 + Math.random() * 0.7,
          tint,
        };
      });
    };

    const resize = () => {
      width = stage.clientWidth;
      height = stage.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedStars();
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = 'round';
      for (const s of stars) {
        // Ambient drift keeps the field alive at rest; scroll velocity streams it the opposite way.
        s.y += s.depth * 0.08 - smoothVel * s.depth * 0.55;
        if (s.y < -30) s.y += height + 60;
        else if (s.y > height + 30) s.y -= height + 60;

        const len = Math.min(Math.abs(smoothVel) * s.depth * 0.9, 60);
        ctx.strokeStyle = s.tint;
        ctx.shadowColor = s.tint;
        ctx.shadowBlur = s.depth * 4;
        ctx.globalAlpha = 0.5 + s.depth * 0.5;
        ctx.lineWidth = 1 + s.depth * 1.9;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - len / 2);
        ctx.lineTo(s.x, s.y + len / 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    const render = () => {
      const rect = section.getBoundingClientRect();
      const range = rect.height - stage.offsetHeight;
      const progress = clamp(-rect.top / range, 0, 1);
      const vh = window.innerHeight;

      const scrollY = window.scrollY;
      const inst = scrollY - lastScrollY;
      lastScrollY = scrollY;
      smoothVel += (inst - smoothVel) * 0.2;
      if (Math.abs(inst) > 1) targetFacing = inst > 0 ? 180 : 0;
      facing += (targetFacing - facing) * 0.15;

      if (flightActive) {
        const stageTop = stage.getBoundingClientRect().top;
        const arrival = clamp((vh - stageTop) / (vh - vh * 0.02), 0, 1);
        const titleEnter = easeInOutCubic(clamp((arrival - 0.2) / 0.8, 0, 1));

        if (introRef.current) {
          introRef.current.style.transform = `translateY(${(titleEnter - 1) * 150}%)`;
        }

        const rocket = rocketRef.current;
        if (rocket) {
          // Constant-velocity descent tied to scroll offset (linear, not eased) so the rocket keeps the
          // same speed all the way to center — the title settles mid-descent while the rocket flies on.
          const descent = clamp((vh - rect.top) / (1.5 * vh), 0, 1);
          let offsetVh = -70 * (1 - descent);
          if (progress > OUTRO) offsetVh = ((progress - OUTRO) / (1 - OUTRO)) * 70;
          const bob = Math.sin(progress * Math.PI * 6) * 1.6;
          rocket.style.transform = `translate(-50%, ${offsetVh}vh) rotate(${facing + bob}deg)`;
        }

        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const center = INTRO + (i + 0.5) * slot;
          const d = progress - center;
          // Cards enter from below and stream up past the rocket, matching the descent and the starfield.
          const y = clamp((-d / slot) * 190, -150, 150);
          const opacity = clamp(1 - Math.abs(d) / (slot * 0.7), 0, 1);
          card.style.transform = `translateY(${y}%)`;
          card.style.opacity = `${opacity}`;
          card.style.pointerEvents = opacity > 0.65 ? 'auto' : 'none';
        });
      }

      drawStars();
      raf = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !raf) {
          raf = requestAnimationFrame(render);
        } else if (!entry.isIntersecting && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 },
    );

    // Below the breakpoint (or reduced motion) the cards fall back to a plain CSS stack, so the inline
    // transforms/opacity the loop stamps must be cleared or they'd keep the cards hidden.
    const clearInline = () => {
      introRef.current?.style.removeProperty('transform');
      rocketRef.current?.style.removeProperty('transform');
      cardRefs.current.forEach((card) => {
        card?.style.removeProperty('transform');
        card?.style.removeProperty('opacity');
        card?.style.removeProperty('pointer-events');
      });
    };

    const onFlightChange = () => {
      flightActive = flightQuery.matches;
      if (!flightActive) clearInline();
    };
    flightQuery.addEventListener('change', onFlightChange);

    resize();
    window.addEventListener('resize', resize);
    observer.observe(section);

    return () => {
      flightQuery.removeEventListener('change', onFlightChange);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="projects__stage" ref={stageRef}>
        <canvas className="projects__stars" ref={canvasRef} aria-hidden="true" />

        <header className="projects__intro" ref={introRef}>
          <h2 className="projects__heading">Projects</h2>
        </header>

        <div className="projects__rocket" ref={rocketRef} aria-hidden="true">
          <svg viewBox="0 0 48 96" width="48" height="96">
            <path className="projects__rocket-flame" d="M18 66h12l-3 18a3 3 0 0 1-6 0z" />
            <path
              className="projects__rocket-body"
              d="M24 2c8 8 12 20 12 34v22a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V36C12 22 16 10 24 2z"
            />
            <path className="projects__rocket-fin" d="M12 50 4 66v-8l8-12zM36 50l8 16v-8l-8-12z" />
            <circle className="projects__rocket-window" cx="24" cy="34" r="6" />
          </svg>
        </div>

        <ul className="projects__field">
          {projects.map((project, i) => (
            <li
              key={project.id}
              className={`projects__card projects__card--${i % 2 === 0 ? 'left' : 'right'}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
            >
              <span className="projects__index">{project.index}</span>
              <img
                className="projects__image"
                src={project.image.src768}
                srcSet={`${project.image.src320} 320w, ${project.image.src768} 768w, ${project.image.src1280} 1280w`}
                sizes="(max-width: 768px) 90vw, 320px"
                alt={project.image.alt}
                loading="lazy"
              />
              <div className="projects__content">
                <h3 className="projects__title">
                  <a className="projects__card-link" href={project.live} target="_blank" rel="noreferrer">
                    {project.title}
                  </a>
                </h3>
                <p className="projects__description">{project.description}</p>
                <ul className="projects__tech">
                  {project.tech.map((tech) => (
                    <li key={tech} className="projects__tech-item">
                      {tech}
                    </li>
                  ))}
                </ul>
                <div className="projects__links">
                  <a className="projects__github" href={project.github} target="_blank" rel="noreferrer">
                    GitHub ↗
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
