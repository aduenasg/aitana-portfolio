/**
 * Contact
 * Props:
 *   email {string} – contact e-mail address
 */
const Contact = ({ email = 'hola@aitananunez.com' }) => (
  <section className="contact" id="contact">
    <div className="contact__bg-text" aria-hidden="true">AITANA</div>

    <p className="contact__label">Trabajemos juntos</p>

    <h2 className="contact__title">
      Let&rsquo;s create
      <span className="contact__title--italic">something rare.</span>
    </h2>

    <a className="contact__email" href={`mailto:${email}`}>
      {email}
    </a>

    <div className="contact__actions">
      <a href={`mailto:${email}`} className="btn">Escribir →</a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--gold"
      >
        Instagram
      </a>
    </div>
  </section>
);

export default Contact;
