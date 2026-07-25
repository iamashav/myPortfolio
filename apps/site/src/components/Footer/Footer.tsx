import './footer.scss';

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">© {new Date().getFullYear()} Ashav Parihar</p>
    </footer>
  );
}
