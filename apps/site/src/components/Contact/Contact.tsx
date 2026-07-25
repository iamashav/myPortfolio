import './contact.scss';

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        <h2 className="contact__heading">Let's talk</h2>
        <div className="contact__links">
          <a className="contact__link" href="mailto:ashavparihar7@gmail.com">
            ashavparihar7@gmail.com
          </a>
          <a
            className="contact__link"
            href="https://linkedin.com/in/ashavparihar/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="contact__link"
            href="https://github.com/iamashav"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
