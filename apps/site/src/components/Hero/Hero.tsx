import { useEffect, useRef, useState } from 'react';
import { HeroEmitter } from '../HeroEmitter/HeroEmitter';
import './hero.scss';

const formatTime = () => new Date().toLocaleTimeString('en-GB', { hour12: false });

const FRAME_OVERSHOOTS = ['--o-tl', '--o-tr', '--o-rt', '--o-rb', '--o-bl', '--o-br', '--o-lt', '--o-lb'];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState(formatTime);

  // Randomize each corner's overshoot so the about frame reads hand-struck rather than uniform.
  useEffect(() => {
    const about = aboutRef.current;
    if (!about) return;
    FRAME_OVERSHOOTS.forEach((prop) => {
      about.style.setProperty(prop, `${(0.3 + Math.random() * 0.9).toFixed(2)}rem`);
    });
  }, []);

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
        <aside className="hero__about" ref={aboutRef}>
          <span className="hero__frame hero__frame--top" aria-hidden="true" />
          <span className="hero__frame hero__frame--right" aria-hidden="true" />
          <span className="hero__frame hero__frame--bottom" aria-hidden="true" />
          <span className="hero__frame hero__frame--left" aria-hidden="true" />
          <span className="hero__about-tab">// About</span>
          <p className="hero__about-text">
            I build and ship production React/TypeScript interfaces and the backend services behind
            them.
          </p>
          <p className="hero__about-text">
            I like taking things from idea to production — balancing polished, professional work with
            a creative streak: motion, interaction, and the small touches that make something feel
            alive.
          </p>
        </aside>
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
