import { CaseStudies } from './components/CaseStudies/CaseStudies';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Projects } from './components/Projects/Projects';
import { TechStrip } from './components/TechStrip/TechStrip';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function App() {
  useSmoothScroll();

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
    </>
  );
}

export default App;
