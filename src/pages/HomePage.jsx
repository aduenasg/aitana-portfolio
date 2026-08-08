import { useEffect } from 'react';
import Navbar  from '../components/Navbar';
import Hero    from '../components/Hero';
import Ticker  from '../components/Ticker';
import Works   from '../components/Works';
import About   from '../components/About';
import Clients from '../components/Clients';
import Contact from '../components/Contact';
import Footer  from '../components/Footer';
import Reveal  from '../components/Reveal';
import Collaborations from '../components/Collaborations';
import AboutMeImg from '../img/AitanaPerfil.jpg';
import IntroImg from '../img/Intro.jpg';

const HomePage = () => {
  // Navbar scrolled: añade clase al nav cuando se hace scroll
  useEffect(() => {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('navbar--scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cada sección encaja pieza a pieza desde dentro: About, Contact,
  // Collaborations y Footer ya escalonan sus propios bloques con <Reveal>,
  // y Works lo hace con ScrollFloat + la pila de StackCard.
  //
  // Ojo: no envolver Works ni About en un <Reveal>. Works contiene
  // .works__stack-item (position: sticky) y el transform de la pieza
  // crearía un bloque contenedor que anula ese sticky; About se animaría
  // dos veces. El Ticker sí se envuelve porque no tiene entrada propia.
  return (
    <>
      {/* Primer tabulador de la página: salta el navbar y el ticker */}
      <a href="#works" className="skip-link">Saltar al contenido</a>
      <Navbar />
      <Hero heroImage={IntroImg} />
      <Reveal duration={0.9} seam><Ticker /></Reveal>
      <Works />
      <About aboutImage={AboutMeImg} />
      {/* <Clients /> */}
      <Collaborations />
      <Contact email="aitananr2@gmail.com" />
      <Reveal><Footer /></Reveal>
    </>
  );
};

export default HomePage;
