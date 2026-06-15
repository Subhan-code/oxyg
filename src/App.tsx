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

export default function App() {
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") || "/";
      setCurrentPath(hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <ReactLenis root>
      <div className="font-sans antialiased text-neutral-900 bg-[#141414] selection:bg-neutral-900 selection:text-white relative z-0 min-h-screen">
        <Header dark={currentPath === "/pricing"} />
        {currentPath === "/pricing" ? (
          <>
            <div 
              className="relative z-10 bg-[#141414] shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-b-[40px] md:rounded-b-[48px] overflow-hidden mb-0 md:mb-[400px] border-b border-neutral-800"
              style={{ transform: "translateZ(0)" }}
            >
              <Pricing />
            </div>
            <Footer />
          </>
        ) : (
          <>
            <div 
              className="relative z-10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1)] rounded-b-[40px] md:rounded-b-[48px] mb-0 md:mb-[400px] border-b border-neutral-200/50"
              style={{ transform: "translateZ(0)" }}
            >
              <main>
                <Hero />
                <Features />
                <InteractiveShowcase />
                <iOSFAQ />
              </main>
              <FooterAndTestimonials />
            </div>
            <Footer />
          </>
        )}
      </div>
    </ReactLenis>
  );
}
