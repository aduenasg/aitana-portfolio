import { useLang } from '../context/LangContext';
import GradientText from './GradientText';
import Reveal from './Reveal';

const Contact = ({ email = 'aitananr2@gmail.com' }) => {
  const { t } = useLang();
  return (
    <section className="contact" id="contact">
      <div className="contact__bg-text" aria-hidden="true">AITANA</div>
      <Reveal as="p" className="contact__label">{t('contact_label')}</Reveal>
      <Reveal as="h2" className="contact__title" delay={0.08}>
        <GradientText
          className="contact__title-gradient"
          colors={['#c9a96e', '#f0ece4', '#c9a96e', '#f0ece4', '#c9a96e']}
          animationSpeed={5}
          showBorder={false}
        >
          {t('contact_title1')}
        </GradientText>
        <span className="contact__title--italic">{t('contact_title2')}</span>
      </Reveal>
      <Reveal as="a" className="contact__email" delay={0.16} href={`mailto:${email}`}>{email}</Reveal>
      <Reveal as="div" className="contact__actions" delay={0.24}>
        <a href={`mailto:${email}`} className="btn">{t('contact_write')}</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn--gold">Instagram</a>
      </Reveal>
    </section>
  );
};

export default Contact;
