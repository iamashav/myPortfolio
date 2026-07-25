import { Marquee } from '../Marquee/Marquee';
import './tech-strip.scss';

const tech = [
  'React',
  'TypeScript',
  'Python',
  'Node.js',
  'Redux',
  'Firebase',
  'REST APIs',
  'GraphQL',
  'CI/CD',
  'Git',
];

export function TechStrip() {
  return (
    <section className="tech-strip" aria-label="Technologies I work with">
      <ul className="tech-strip__sr">
        {tech.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Marquee items={tech} />
    </section>
  );
}
