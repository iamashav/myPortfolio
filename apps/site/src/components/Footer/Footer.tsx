import './footer.scss';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">© {new Date().getFullYear()} Ashav Parihar</p>
      </div>
    </footer>
  );
}
