import styles from './Contact.module.scss';

export function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.contact__inner}>
        <h2 className={styles.contact__heading}>Let's talk</h2>
        <p className={styles.contact__subtitle}>
          Open to hearing about new opportunities and interesting problems.
        </p>
        <div className={styles.contact__links}>
          <a className={styles.contact__link} href="mailto:ashavparihar7@gmail.com">
            ashavparihar7@gmail.com
          </a>
          <a
            className={styles.contact__link}
            href="https://linkedin.com/in/ashavparihar/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className={styles.contact__link}
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
