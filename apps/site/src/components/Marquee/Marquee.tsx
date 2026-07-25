import './marquee.scss';

interface MarqueeProps {
  items: string[];
  separator?: string;
  durationSec?: number;
}

// Decorative infinite scroller. The visible track is aria-hidden and the
// content is duplicated so the loop is seamless; screen readers get the real
// list from whatever renders alongside this (see TechStrip).
export function Marquee({ items, separator = '/', durationSec = 28 }: MarqueeProps) {
  const sequence = [...items, ...items];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track" style={{ animationDuration: `${durationSec}s` }}>
        {sequence.map((item, index) => (
          <span className="marquee__item" key={`${item}-${index}`}>
            {item}
            <span className="marquee__sep">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
