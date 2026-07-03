import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ReactLenis } from 'lenis/react';

import { Header } from './Header';
import { Footer } from './Footer';
import { Dashboard } from './Dashboard';
import { Login } from './Login';
import { Installation } from './Installation';
import { Pricing } from './Pricing';
import ComponentPage from './demos/ComponentPage';
import { Hero } from './Hero';
import { RecordingToggle } from './RecordingToggle';
import { Features } from './Features';
import { InteractiveShowcase } from './InteractiveShowcase';
import { TimelineSection } from './TimelineSection';
import { BespokeSection } from './BespokeSection';
import InkRevealDemo from './demos/InkRevealDemo';
import { iOSFAQ as IOSFAQ } from './iOSFAQ';
import { FooterAndTestimonials } from './FooterAndTestimonials';

// Separate Home Page Component
function Home({ triggerToast }: { triggerToast: (msg: string) => void }) {
  return (
    <div className="relative z-10 bg-white dark:bg-[#141414] shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-b-[40px] md:rounded-b-[48px] mb-0 md:mb-[400px] md-reveal-layer">
      <main>
        <Hero />
        <section className="py-16 bg-[#fafafa] dark:bg-[#18181b] flex flex-col items-center justify-center border-b border-neutral-100 dark:border-neutral-800 relative z-10 w-full overflow-hidden">
          <RecordingToggle />
        </section>
        <Features />
        <InteractiveShowcase />
        <TimelineSection />
        <BespokeSection />
        <section className="py-20 md:py-32 w-full relative z-10 border-t border-neutral-100 dark:border-neutral-800 flex flex-col items-center">
          <div className="max-w-3xl mx-auto text-center px-4 mb-10 md:mb-16">
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase text-neutral-400">Interactive Elements</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#141414] dark:text-white leading-tight mt-3">
              Ink Reveal Canvas
            </h2>
            <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed mt-4">
              Move your mouse across the canvas to carve away the ink overlay. A fluid math-based brush wobble expands organically to reveal the landscape hidden underneath.
            </p>
          </div>
          <div className="w-full relative h-[450px] md:h-[650px] bg-[#fafafa] dark:bg-[#18181b] border-y border-neutral-100 dark:border-neutral-800 overflow-hidden shadow-inner">
            <InkRevealDemo />
          </div>
        </section>
        <IOSFAQ />
      </main>
      <FooterAndTestimonials triggerToast={triggerToast} />
    </div>
  );
}

export default function AnimatedRoutes() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 2500);
  };

  const isComponentPage = currentPath.startsWith('/components/');
  const isViewportLocked = currentPath === '/login' || currentPath === '/dashboard';
  const isComponentsList = currentPath === '/components';
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  return (
    <ReactLenis root={!isViewportLocked && !isComponentPage && !isTouchDevice} options={{ duration: 0.9, lerp: 0.15 }}>
      <div className={`font-sans antialiased selection:bg-neutral-900 selection:text-white relative z-0 min-h-screen transition-colors duration-300 bg-[#141414] overflow-x-clip ${
        currentPath === '/pricing' || currentPath === '/installation' || isViewportLocked || isComponentPage || isComponentsList ? 'text-white' : 'text-[#141414]'
      }`}>
        {/* Global Header (hidden on component playground page and components list page) */}
        {!isViewportLocked && !isComponentPage && !isComponentsList && (
          <Header dark={currentPath === '/pricing' || currentPath === '/installation'} />
        )}

        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <>
              <Home triggerToast={triggerToast} />
              <Footer />
            </>
          } />
          <Route path="/pricing" element={
            <>
              <div className="relative z-10 bg-[#141414] shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-b-[40px] md:rounded-b-[48px] overflow-hidden mb-0 md:mb-[400px] border-b border-neutral-800 md-reveal-layer">
                <Pricing />
              </div>
              <Footer />
            </>
          } />
          <Route path="/installation" element={
            <>
              <div className="relative z-10 bg-[#0a0a0c] shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-b-[40px] md:rounded-b-[48px] overflow-hidden mb-0 md:mb-[400px] border-b border-neutral-900 md-reveal-layer">
                <Installation />
              </div>
              <Footer />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Navigate to="/components" replace />} />
          <Route path="/components" element={<Dashboard />} />
          <Route path="/components/:name" element={<ComponentPage />} />
        </Routes>

        {/* Global Toast */}
        <AnimatePresence>
          {showToast && (
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className="fixed bottom-8 right-8 z-999 bg-neutral-900 border border-white/10 text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-sm font-bold">{showToast}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ReactLenis>
  );
}
