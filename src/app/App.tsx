import { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navigation } from '@/app/components/Navigation';
import { LoadingScreen } from '@/app/components/LoadingScreen';
import { RootsBackground } from '@/app/components/RootsBackground';
import { StrangerThingsD20 } from '@/app/components/StrangerThingsD20';
import { CrackingOverlay } from '@/app/components/CrackingOverlay';
import { Home } from '@/app/components/sections/Home';

// Lazy load non-critical sections
const About = lazy(() => import('@/app/components/sections/About').then(module => ({ default: module.About })));
const Projects = lazy(() => import('@/app/components/sections/Projects').then(module => ({ default: module.Projects })));
const TechStack = lazy(() => import('@/app/components/sections/TechStack').then(module => ({ default: module.TechStack })));
const Contact = lazy(() => import('@/app/components/sections/Contact').then(module => ({ default: module.Contact })));

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showCracking, setShowCracking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Force loading screen for cinematic effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to section handler
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Active section detection using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
        threshold: 0
      }
    );

    const sections = ['home', 'about', 'projects', 'techstack', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleCrackComplete = () => {
    setShowCracking(false);
    scrollToSection('contact');
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden transition-all duration-1000">

      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <RootsBackground />

      <StrangerThingsD20 onCrack={() => setShowCracking(true)} />

      {showCracking && <CrackingOverlay onComplete={handleCrackComplete} />}

      <div className="relative z-10">
        <Navigation
          activeSection={activeSection}
          onSectionChange={scrollToSection}
        />

        <main className="container mx-auto px-4">

          <section id="home" className="min-h-screen flex items-center justify-center">
            <Home onExplore={() => scrollToSection('about')} />
          </section>

          <section id="about" className="min-h-screen py-20 flex items-center justify-center">
            <Suspense fallback={<LoadingScreen />}>
              <About />
            </Suspense>
          </section>

          <section id="projects" className="min-h-screen py-20 flex items-center justify-center">
            <Suspense fallback={<LoadingScreen />}>
              <Projects />
            </Suspense>
          </section>

          <section id="techstack" className="min-h-screen py-20 flex items-center justify-center">
            <Suspense fallback={<LoadingScreen />}>
              <TechStack />
            </Suspense>
          </section>

          <section id="contact" className="min-h-screen py-20 flex items-center justify-center">
            <Suspense fallback={<LoadingScreen />}>
              <Contact />
            </Suspense>
          </section>
        </main>
      </div>
    </div>
  );
}