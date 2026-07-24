import styles from './Hero.module.scss';

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      <p className={styles.hero__eyebrow}>Software Engineer</p>
      <h1 className={styles.hero__title}>Ashav Parihar</h1>
      <p className={styles.hero__subtitle}>
        I build and ship production React/TypeScript frontends and Python-backed services —
        most recently leading a framework migration and building AI-assisted developer tooling.
      </p>
      <div className={styles.hero__actions}>
        <a className={styles.hero__cta} href="#case-studies">
          View case studies
        </a>
        <a className={styles['hero__cta--secondary']} href="#contact">
          Get in touch
        </a>
      </div>
    </section>
  );
}
