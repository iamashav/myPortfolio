import { projects } from '../../data/projects';
import './projects.scss';

export function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="projects__inner">
        <h2 className="projects__heading">Projects</h2>
        <ul className="projects__list">
          {projects.map((project) => (
            <li key={project.id} className="projects__item">
              <span className="projects__index">{project.index}</span>
              <img
                className="projects__image"
                src={project.image.src768}
                srcSet={`${project.image.src320} 320w, ${project.image.src768} 768w, ${project.image.src1280} 1280w`}
                sizes="(max-width: 768px) 100vw, 320px"
                alt={project.image.alt}
                loading="lazy"
              />
              <div className="projects__content">
                <h3 className="projects__title">{project.title}</h3>
                <p className="projects__description">{project.description}</p>
                <ul className="projects__tech">
                  {project.tech.map((tech) => (
                    <li key={tech} className="projects__tech-item">
                      {tech}
                    </li>
                  ))}
                </ul>
                <div className="projects__links">
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
