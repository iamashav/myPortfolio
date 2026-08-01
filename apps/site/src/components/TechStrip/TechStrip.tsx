import './tech-strip.scss';

const tech = [
  'React',
  'Vue',
  'TypeScript',
  'Redux',
  'MobX',
  'Python',
  'Node.js',
  'REST APIs',
  'GraphQL',
  'LLM APIs',
  'AI Agents',
  'MCP',
  'Jest',
  'Playwright',
  'Vite',
  'Docker',
  'GitHub Actions',
  'Sass',
  'Tailwind',
  'Firebase',
  'PostgreSQL',
];

export function TechStrip() {
  return (
    <section className="tech-strip" aria-label="Technologies I work with">
      <p className="tech-strip__label">Toolbox</p>
      <div className="tech-strip__field" aria-hidden="true">
        {tech.map((item) => (
          <span className="tech-strip__chip" key={item}>
            {item}
          </span>
        ))}
      </div>
      <ul className="tech-strip__sr">
        {tech.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
