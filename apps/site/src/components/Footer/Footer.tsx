import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footer__text}>© {new Date().getFullYear()} Ashav Parihar</p>
    </footer>
  );
}
