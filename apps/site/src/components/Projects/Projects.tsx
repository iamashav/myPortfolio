import { projects } from '../../data/projects';
import styles from './Projects.module.scss';

export function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <div className={styles.projects__inner}>
        <h2 className={styles.projects__heading}>Projects</h2>
        <ul className={styles.projects__list}>
          {projects.map((project) => (
            <li key={project.id} className={styles.projects__item}>
              <span className={styles.projects__index}>{project.index}</span>
              <img
                className={styles.projects__image}
                src={project.image.src768}
                srcSet={`${project.image.src320} 320w, ${project.image.src768} 768w, ${project.image.src1280} 1280w`}
                sizes="(max-width: 768px) 100vw, 320px"
                alt={project.image.alt}
                loading="lazy"
              />
              <div className={styles.projects__content}>
                <h3 className={styles.projects__title}>{project.title}</h3>
                <p className={styles.projects__description}>{project.description}</p>
                <ul className={styles.projects__tech}>
                  {project.tech.map((tech) => (
                    <li key={tech} className={styles.projects__techItem}>
                      {tech}
                    </li>
                  ))}
                </ul>
                <div className={styles.projects__links}>
                  <a href={project.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                  <a href={project.live} target="_blank" rel="noreferrer">
                    Live
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
