import './header.scss';

const navLinks = [
  { href: '#case-studies', label: 'Case Studies' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a className="header__brand" href="#top">
          Ashav Parihar
        </a>
        <nav className="header__nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} className="header__link" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
