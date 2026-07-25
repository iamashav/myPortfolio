import './hero.scss';

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__inner">
        <h1 className="hero__title">Ashav Parihar</h1>
        <p className="hero__subtitle">
          I build and ship production React/TypeScript frontends and Python-backed services —
          recently leading a framework migration and building AI-assisted developer tooling.
        </p>
      </div>
      <div className="hero__meta">
        <p className="hero__role">Software Engineer</p>
        <a className="hero__scroll" href="#case-studies" aria-label="Scroll to work">
          ↓
        </a>
      </div>
    </section>
  );
}
