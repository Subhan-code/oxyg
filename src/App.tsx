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
import { ThreeDTextScrollSection } from "./components/ThreeDTextScrollSection";
import { MinutesToMoon } from "./components/demos/MinutesToMoon";

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
      <div className={`font-sans antialiased selection:bg-neutral-900 selection:text-white relative z-0 min-h-screen transition-colors duration-300 bg-[#141414] overflow-x-clip ${
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
                
                {/* ── 13 Minutes to the Moon Interactive Section ── */}
                <section className="py-20 md:py-32 w-full max-w-[1280px] mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-12 border-t border-neutral-100">
                  <div className="flex-1 flex flex-col gap-4 text-left max-w-xl">
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase text-neutral-400">Design Engineering Feature</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#141414] leading-tight text-balance">
                      13 Minutes to the Moon
                    </h2>
                    <p className="text-sm md:text-base text-neutral-500 font-medium leading-relaxed">
                      A premium, interactive GSAP timeline animation exploring clipping-path masking and organic image translation transitions. Click the canvas to trigger the sequence.
                    </p>
                    <div className="flex gap-3 mt-2">
                      <button 
                        onClick={() => {
                          const showcaseEl = document.getElementById("sandbox-showcase");
                          if (showcaseEl) {
                            showcaseEl.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="bg-neutral-900 text-white hover:bg-neutral-800 transition-colors font-bold px-6 py-3.5 rounded-full text-[13px] active:scale-[0.96] cursor-pointer"
                      >
                        Explore Sandbox
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 w-full max-w-[500px] h-[500px] flex items-center justify-center bg-black rounded-3xl overflow-hidden shadow-2xl relative z-10 border border-neutral-800">
                    <MinutesToMoon />
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
