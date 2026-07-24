import { caseStudies } from '../../data/caseStudies';
import styles from './CaseStudies.module.scss';

export function CaseStudies() {
  return (
    <section className={styles.caseStudies} id="case-studies">
      <div className={styles.caseStudies__inner}>
        <h2 className={styles.caseStudies__heading}>Case Studies</h2>
        <div className={styles.caseStudies__list}>
          {caseStudies.map((study) => (
            <article key={study.id} className={styles.caseStudies__card}>
              <div className={styles.caseStudies__cardHeader}>
                <h3 className={styles.caseStudies__cardTitle}>{study.title}</h3>
                <span
                  className={
                    study.status === 'shipped'
                      ? styles.caseStudies__badge
                      : styles['caseStudies__badge--progress']
                  }
                >
                  {study.status === 'shipped' ? 'Shipped' : 'In progress'}
                </span>
              </div>
              <p className={styles.caseStudies__summary}>{study.summary}</p>
              {study.narrative.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className={styles.caseStudies__paragraph}>
                  {paragraph}
                </p>
              ))}
              <ul className={styles.caseStudies__tech}>
                {study.tech.map((tech) => (
                  <li key={tech} className={styles.caseStudies__techItem}>
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
