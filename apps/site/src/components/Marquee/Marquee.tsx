import './marquee.scss';

interface MarqueeProps {
  items: string[];
  separator?: string;
}

// aria-hidden + duplicated content for a seamless loop; the real list for
// screen readers lives alongside this (see TechStrip).
export function Marquee({ items, separator = '/' }: MarqueeProps) {
  const sequence = [...items, ...items];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
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
