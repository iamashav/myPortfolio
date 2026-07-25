import { caseStudies } from '../../data/caseStudies';
import './case-studies.scss';

export function CaseStudies() {
  return (
    <section className="case-studies" id="case-studies">
      <div className="case-studies__inner">
        <h2 className="case-studies__heading">Case Studies</h2>
        <div className="case-studies__list">
          {caseStudies.map((study) => (
            <article key={study.id} className="case-studies__card">
              <div className="case-studies__card-header">
                <h3 className="case-studies__card-title">{study.title}</h3>
                <span
                  className={
                    study.status === 'shipped'
                      ? 'case-studies__badge'
                      : 'case-studies__badge--progress'
                  }
                >
                  {study.status === 'shipped' ? 'Shipped' : 'In progress'}
                </span>
              </div>
              <p className="case-studies__summary">{study.summary}</p>
              {study.narrative.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="case-studies__paragraph">
                  {paragraph}
                </p>
              ))}
              <ul className="case-studies__tech">
                {study.tech.map((tech) => (
                  <li key={tech} className="case-studies__tech-item">
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
