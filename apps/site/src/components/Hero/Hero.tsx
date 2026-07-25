import './hero.scss';

export function Hero() {
  return (
    <section className="hero" id="top">
      <p className="hero__eyebrow">Software Engineer</p>
      <h1 className="hero__title">Ashav Parihar</h1>
      <p className="hero__subtitle">
        I build and ship production React/TypeScript frontends and Python-backed services —
        most recently leading a framework migration and building AI-assisted developer tooling.
      </p>
      <div className="hero__actions">
        <a className="hero__cta" href="#case-studies">
          View case studies
        </a>
        <a className="hero__cta--secondary" href="#contact">
          Get in touch
        </a>
      </div>
    </section>
  );
}
