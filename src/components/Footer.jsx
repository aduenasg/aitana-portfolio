import Reveal from './Reveal';
import { useLang } from '../context/LangContext';

const Footer = () => {
  const { t } = useLang();
  return (
    <Reveal as="footer" className="footer" y={16} duration={0.6}>
      <span className="footer__copy">{t('footer_copy')}</span>
      <span className="footer__name">AN Studio</span>
      <nav className="footer__social">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">IG</a>
        <a href="https://linkedin.com"  target="_blank" rel="noopener noreferrer">LI</a>
        <a href="https://behance.net"   target="_blank" rel="noopener noreferrer">BE</a>
      </nav>
    </Reveal>
  );
};

export default Footer;
