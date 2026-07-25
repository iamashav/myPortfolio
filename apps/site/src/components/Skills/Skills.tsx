import { skills } from '../../data/skills';
import './skills.scss';

export function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="skills__inner">
        <h2 className="skills__heading">Skills</h2>
        <ul className="skills__grid">
          {skills.map((skill) => (
            <li key={skill.name} className="skills__item">
              <img className="skills__icon" src={skill.icon} alt="" />
              <span>{skill.name}</span>
            </li>
          ))}
        </ul>
        <p className="skills__note">
          Also comfortable across the backend in Python — regularly fixing bugs and shipping
          small features there, alongside TypeScript, REST/GraphQL APIs, and CI/CD with GitHub
          Actions. Have also set up CodeRabbit and Codex for automated PR review.
        </p>
      </div>
    </section>
  );
}
