import { lazy, Suspense } from 'react';
import { useLenis } from './hooks/useLenis';
import { useNoPinchZoom } from './hooks/useNoPinchZoom';
import Loader from './components/Loader';
import AuroraBackground from './components/AuroraBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

// The 3D showcase pulls in three.js / R3F — load it on demand so the hero
// paints instantly and the heavy bundle streams in as you approach it.
const ShowcaseSpine = lazy(() => import('./components/showcase/ShowcaseSpine'));

function ShowcaseFallback() {
  return (
    <section className="relative flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="eyebrow mb-3">Selected Work</p>
        <div className="mx-auto flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-teal [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan [animation-delay:300ms]" />
        </div>
      </div>
    </section>
  );
}

function App() {
  useLenis();
  useNoPinchZoom();

  return (
    <>
      <Loader />
      <AuroraBackground />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<ShowcaseFallback />}>
          <ShowcaseSpine />
        </Suspense>
        <Services />
        <Pricing />
        <Portfolio />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
