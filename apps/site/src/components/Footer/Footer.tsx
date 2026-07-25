import './footer.scss';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <a className="footer__mail" href="mailto:ashavparihar7@gmail.com">
          ashavparihar7@gmail.com
        </a>
        <p className="footer__copy">© {new Date().getFullYear()} Ashav Parihar</p>
      </div>
    </footer>
  );
}
