import { useLang } from '../context/LangContext';

const Contact = ({ email = 'aitananr2@gmail.com' }) => {
  const { t } = useLang();
  return (
    <section className="contact" id="contact">
      <div className="contact__bg-text" aria-hidden="true">AITANA</div>
      <p className="contact__label">{t('contact_label')}</p>
      <h2 className="contact__title">
        {t('contact_title1')}
        <span className="contact__title--italic">{t('contact_title2')}</span>
      </h2>
      <a className="contact__email" href={`mailto:${email}`}>{email}</a>
      <div className="contact__actions">
        <a href={`mailto:${email}`} className="btn">{t('contact_write')}</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn--gold">Instagram</a>
      </div>
    </section>
  );
};

export default Contact;
