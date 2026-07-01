import { ReactLenis } from 'lenis/react';
import { useState, useEffect } from 'react';
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { FooterAndTestimonials } from "./components/FooterAndTestimonials";
import { Footer } from "./components/Footer";
import { Pricing } from "./components/Pricing";
import { iOSFAQ as IOSFAQ } from "./components/iOSFAQ";
import { InteractiveShowcase } from "./components/InteractiveShowcase";
import { BespokeSection } from "./components/BespokeSection";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { RecordingToggle } from "./components/RecordingToggle";
import InkRevealDemo from "./components/demos/InkRevealDemo";
import GlowHorizonDemo from "./components/demos/GlowHorizonDemo";
import { Installation } from "./components/Installation";
import { TimelineSection } from "./components/TimelineSection";

// Import toast dependencies
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentPath, setCurrentPath] = useState("/");
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 2500);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") || "/";
      setCurrentPath(hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const isViewportLocked = currentPath === "/login" || currentPath === "/dashboard";

  return (
    <ReactLenis root={!isViewportLocked} options={{ duration: 0.9, lerp: 0.15 }}>
      <div className={`font-sans antialiased selection:bg-neutral-900 selection:text-white relative z-0 min-h-screen transition-colors duration-300 bg-[#141414] overflow-x-clip ${
        currentPath === "/pricing" || currentPath === "/installation" || isViewportLocked ? "text-white" : "text-[#141414]"
      }`}>
        {!isViewportLocked && <Header dark={currentPath === "/pricing" || currentPath === "/installation"} />}
        {currentPath === "/pricing" ? (
          <>
            <div 
              className="relative z-10 bg-[#141414] shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-b-[40px] md:rounded-b-[48px] overflow-hidden mb-0 md:mb-[400px] border-b border-neutral-800 md-reveal-layer"
            >
              <Pricing />
            </div>
            <Footer />
          </>
        ) : currentPath === "/installation" ? (
          <>
            <div 
              className="relative z-10 bg-[#0a0a0c] shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-b-[40px] md:rounded-b-[48px] overflow-hidden mb-0 md:mb-[400px] border-b border-neutral-900 md-reveal-layer"
            >
              <Installation />
            </div>
            <Footer />
          </>
        ) : currentPath === "/login" ? (
          <Login />
        ) : currentPath === "/dashboard" ? (
          <Dashboard />
        ) : (
          <>
            <div 
              className="relative z-10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1)] rounded-b-[40px] md:rounded-b-[48px] mb-0 md:mb-[400px] md-reveal-layer"
            >
              <main>
                <Hero />

                {/* ── Premium Recording Toggle Showcase (Block-Free) ── */}
                <section className="py-16 bg-white flex flex-col items-center justify-center border-b border-neutral-100 relative z-10 w-full overflow-hidden">
                  <RecordingToggle />
                </section>
                
                <Features />
                <InteractiveShowcase />
                <TimelineSection />
                <BespokeSection />

                {/* ── Ink Reveal Section (Full Width & Interactive Elements Text) ── */}
                <section className="py-20 md:py-32 w-full relative z-10 border-t border-neutral-100 flex flex-col items-center">
                  <div className="max-w-3xl mx-auto text-center px-4 mb-10 md:mb-16">
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase text-neutral-400">Interactive Elements</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#141414] leading-tight mt-3">
                      Ink Reveal Canvas
                    </h2>
                    <p className="text-sm md:text-base text-neutral-500 font-medium leading-relaxed mt-4">
                      Move your mouse across the canvas to carve away the ink overlay. A fluid math-based brush wobble expands organically to reveal the landscape hidden underneath.
                    </p>
                  </div>
                  <div className="w-full relative h-[450px] md:h-[650px] bg-[#fafafa] border-y border-neutral-100 overflow-hidden shadow-inner">
                    <InkRevealDemo />
                  </div>
                </section>

                <IOSFAQ />
              </main>
              <FooterAndTestimonials triggerToast={triggerToast} />
            </div>
            <Footer />
          </>
        )}

        {/* Alert toast notification */}
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
