import { useEffect, useRef, useState } from 'react';
import { HeroEmitter } from '../HeroEmitter/HeroEmitter';
import './hero.scss';

const formatTime = () => new Date().toLocaleTimeString('en-GB', { hour12: false });

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(formatTime);

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatTime()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const dot = cursorRef.current;
    if (!section || !dot) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let raf = 0;

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };
    const onEnter = () => dot.classList.add('hero__cursor--visible');
    const onLeave = () => dot.classList.remove('hero__cursor--visible');

    const loop = () => {
      x += (targetX - x) * 0.2;
      y += (targetY - y) * 0.2;
      dot.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseenter', onEnter);
    section.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseenter', onEnter);
      section.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section className="hero" id="top" ref={sectionRef}>
      <div className="hero__inner">
        <h1 className="sr-only">Ashav Parihar</h1>
        <HeroEmitter />
        <p className="hero__subtitle">
          I build and ship production React/TypeScript frontends and Python-backed services —
          recently leading a framework migration and building AI-assisted developer tooling.
        </p>
      </div>

      <div className="hero__meta">
        <p className="hero__role">Software Engineer</p>
        <div className="hero__live">
          <p className="hero__clock">{time}</p>
          <div className="hero__socials">
            <a href="https://github.com/iamashav" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href="https://linkedin.com/in/ashavparihar/" target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>

      <div className="hero__cursor" ref={cursorRef} aria-hidden="true" />
    </section>
  );
}
