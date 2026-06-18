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

const HomePage = () => (
  <>
    <Navbar />
    <Hero heroImage = {IntroImg} />
    <Ticker />
    <Works  />
    <About aboutImage = {AboutMeImg}/>
    <Clients />
    <Contact email="hola@aitananunez.com" />
    <Footer />
  </>
);

export default HomePage;
