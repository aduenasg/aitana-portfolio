import { useEffect } from 'react';
import Navbar  from '../components/Navbar';
import Hero    from '../components/Hero';
import Ticker  from '../components/Ticker';
import Works   from '../components/Works';
import About   from '../components/About';
import Clients from '../components/Clients';
import Contact from '../components/Contact';
import Footer  from '../components/Footer';
import AboutMeImg from '../img/AitanaPerfil.jpg';
import IntroImg from '../img/Intro.jpg';

const HomePage = () => {
  // Scroll reveal: añade clase .is-visible cuando el elemento entra en viewport
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Navbar scrolled: añade clase al nav cuando se hace scroll
  useEffect(() => {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('navbar--scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Navbar />
      <Hero heroImage={IntroImg} />
      <Ticker />
      <div className="reveal reveal--up"><Works /></div>
      <div className="reveal reveal--up" style={{ transitionDelay: '0.1s' }}><About aboutImage={AboutMeImg} /></div>
      <div className="reveal reveal--up" style={{ transitionDelay: '0.05s' }}><Clients /></div>
      <div className="reveal reveal--up"><Contact email="hola@aitananunez.com" /></div>
      <Footer />
    </>
  );
};

export default HomePage;
