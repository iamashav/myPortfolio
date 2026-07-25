import { Logo } from '../Logo/Logo';
import './header.scss';

const navLinks = [
  { href: '#case-studies', label: 'Work' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  return (
    <header className="header">
      <a className="header__brand" href="#top" aria-label="Ashav Parihar — home">
        <Logo className="header__logo" />
      </a>
      <nav className="header__nav" aria-label="Primary">
        {navLinks.map((link) => (
          <a key={link.href} className="header__link" href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
