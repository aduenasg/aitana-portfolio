import { useLang } from '../context/LangContext';

const Hero = ({ heroImage }) => {
  const { t } = useLang();

  return (
    <section className="hero">
      <div className="hero__left">
        <p className="hero__tag hero-anim hero-anim--1">{t('hero_tag')}</p>
        <h1 className="hero__title">
          <span className="hero__title--outline hero-word hero-word--1">{t('hero_line1')}</span>
          <span className="hero-word hero-word--2">{t('hero_line2')}</span>
          <span className="hero__title--italic hero-word hero-word--3">{t('hero_line3')}</span>
        </h1>
        <div className="hero__bottom hero-anim hero-anim--5">
          <p className="hero__desc">{t('hero_desc')}</p>
          <span className="hero__scroll-hint">{t('hero_scroll')}</span>
        </div>
      </div>

      <div className="hero__right hero-anim hero-anim--3">
        <div className="hero__image-frame">
          {heroImage && <img src={heroImage} alt="Aitana Núñez" />}
          <div className="hero__editorial-overlay">
            <div className="hero__editorial-top">
              <span className="hero__editorial-tag">{t('hero_editorial_tag')}</span>
              <span className="hero__editorial-year">SS·26</span>
            </div>
            <div className="hero__editorial-bottom">
              <p className="hero__editorial-name">Aitana Núñez</p>
              <p className="hero__editorial-role">{t('hero_editorial_role')}</p>
              <div className="hero__editorial-line" />
              <p className="hero__editorial-city">{t('hero_editorial_city')}</p>
            </div>
          </div>
        </div>
        <div className="hero__year">2026</div>
      </div>
    </section>
  );
};

export default Hero;
