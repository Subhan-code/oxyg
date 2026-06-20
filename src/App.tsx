import { ReactLenis } from 'lenis/react';
import { useState, useEffect } from 'react';
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { FooterAndTestimonials } from "./components/FooterAndTestimonials";
import { Footer } from "./components/Footer";
import { Pricing } from "./components/Pricing";
import { iOSFAQ } from "./components/iOSFAQ";
import { InteractiveShowcase } from "./components/InteractiveShowcase";
import { BespokeSection } from "./components/BespokeSection";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";

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
    <ReactLenis root={!isViewportLocked}>
      <div className={`font-sans antialiased selection:bg-neutral-900 selection:text-white relative z-0 min-h-screen transition-colors duration-300 bg-[#141414] overflow-x-hidden ${
        currentPath === "/pricing" || isViewportLocked ? "text-white" : "text-[#141414]"
      }`}>
        {!isViewportLocked && <Header dark={currentPath === "/pricing"} />}
        {currentPath === "/pricing" ? (
          <>
            <div 
              className="relative z-10 bg-[#141414] shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-b-[40px] md:rounded-b-[48px] overflow-hidden mb-0 md:mb-[400px] border-b border-neutral-800 md-reveal-layer"
            >
              <Pricing />
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
                <Features />
                <InteractiveShowcase />
                <BespokeSection />
                <iOSFAQ />
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
