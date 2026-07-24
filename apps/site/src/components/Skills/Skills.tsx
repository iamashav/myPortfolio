import { skills } from '../../data/skills';
import styles from './Skills.module.scss';

export function Skills() {
  return (
    <section className={styles.skills} id="skills">
      <div className={styles.skills__inner}>
        <h2 className={styles.skills__heading}>Skills</h2>
        <ul className={styles.skills__grid}>
          {skills.map((skill) => (
            <li key={skill.name} className={styles.skills__item}>
              <img className={styles.skills__icon} src={skill.icon} alt="" />
              <span>{skill.name}</span>
            </li>
          ))}
        </ul>
        <p className={styles.skills__note}>
          Also comfortable across the backend in Python — regularly fixing bugs and shipping
          small features there, alongside TypeScript, REST/GraphQL APIs, and CI/CD with GitHub
          Actions. Have also set up CodeRabbit and Codex for automated PR review.
        </p>
      </div>
    </section>
  );
}
