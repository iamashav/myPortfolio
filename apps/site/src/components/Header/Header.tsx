import styles from './Header.module.scss';

const navLinks = [
  { href: '#case-studies', label: 'Case Studies' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <a className={styles.header__brand} href="#top">
          Ashav Parihar
        </a>
        <nav className={styles.header__nav} aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} className={styles.header__link} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
