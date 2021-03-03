import { lazy, Suspense } from 'react';

const Header = lazy(() => import('./Components/Header'));
const Main = lazy(() => import('./Components/Main'));
const Project = lazy(() => import('./Components/Project/Project'));
const Skills = lazy(() => import('./Components/Skills'));
const Contact = lazy(() => import('./Components/Contact'));

function App() {
  return (
    <Suspense
      fallback={
        <div className='sk-folding-cube'>
          <div className='sk-cube1 sk-cube'></div>
          <div className='sk-cube2 sk-cube'></div>
          <div className='sk-cube4 sk-cube'></div>
          <div className='sk-cube3 sk-cube'></div>
        </div>
      }
    >
      <div className='App container my-10 mx-auto max-w-screen-lg bg-black'>
        <Header />
        <main>
          <Main />
          <Project />
          <Skills />
          <Contact />
        </main>
      </div>
    </Suspense>
  );
}

export default App;

