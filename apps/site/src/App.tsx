import { CaseStudies } from './components/CaseStudies/CaseStudies';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Projects } from './components/Projects/Projects';
import { Scrollbar } from './components/Scrollbar/Scrollbar';
import { TechStrip } from './components/TechStrip/TechStrip';
import { useReveal } from './hooks/useReveal';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function App() {
  useSmoothScroll();
  useReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <CaseStudies />
        <Projects />
        <TechStrip />
        <Contact />
      </main>
      <Footer />
      <Scrollbar />
    </>
  );
}

export default App;
