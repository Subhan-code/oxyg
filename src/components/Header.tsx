import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import logoUrl from "../assets/oxygen-ui-logo.png";
import { Menu, X } from "lucide-react";

export function Header({ dark = false }: { dark?: boolean }) {
  const { scrollY } = useScroll();
  const [showJoin, setShowJoin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show dynamic Join button on desktop scroll
    setShowJoin(latest > 150 && !isMenuOpen);
  });

  // Close menu on resize if viewport becomes desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-3 sm:mt-6 px-4 pointer-events-none">
      <motion.div 
        animate={{ 
          height: isMenuOpen ? 480 : 60,
          borderRadius: isMenuOpen ? "32px" : "9999px"
        }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className={`${
          dark || isMenuOpen ? "bg-[#1d1f27]/95 border border-white/5 text-white" : "bg-[#ededed]/90 text-[#141414]"
        } backdrop-blur-[24px] flex flex-col px-6 w-full max-w-[584px] pointer-events-auto shadow-[0_4px_12px_rgba(0,0,0,0.03)] overflow-hidden`}
      >
        {/* Top bar (always visible, height 60px) */}
        <div className="h-[60px] flex items-center justify-between w-full shrink-0">
          <a href="#/" className="flex-shrink-0 flex items-center font-bold tracking-tight text-lg" aria-label="Oxygen UI">
            <img src={logoUrl} alt="Oxygen UI Logo" className="h-8 w-8 mr-2 object-contain" />
            {!isMenuOpen && <span>Oxygen UI</span>}
          </a>
          
          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center h-full">
            <div className="flex items-center gap-6">
              <a href="#/pricing" className="text-[15px] font-[600] transition-colors hover:opacity-80">Pricing</a>
              <a href="#/awards" className="text-[15px] font-[600] transition-colors hover:opacity-80">Awards</a>
              <a href="#/login" className="text-[15px] font-[600] transition-colors hover:opacity-80">Log in</a>
            </div>
            <AnimatePresence>
              {showJoin && (
                <motion.div
                  initial={{ width: 0, opacity: 0, paddingLeft: 0 }}
                  animate={{ width: "auto", opacity: 1, paddingLeft: 24 }}
                  exit={{ width: 0, opacity: 0, paddingLeft: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden block -mr-3"
                >
                  <a 
                    href="#/signup"
                    className={`${dark ? "bg-white text-neutral-900" : "bg-[#141414] text-white"} hover:opacity-90 transition-opacity h-[44px] px-4 rounded-full text-[15px] font-[600] flex items-center justify-center whitespace-nowrap`}
                  >
                    Join for free
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* Mobile hamburger / close button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden flex items-center justify-center p-2 rounded-full cursor-pointer focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity" />
            ) : (
              <Menu className="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity" />
            )}
          </button>
        </div>

        {/* Mobile menu content (reveals dynamically) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col w-full pb-6 pt-2 h-[420px] justify-between sm:hidden"
            >
              {/* Menu items list */}
              <div className="flex flex-col gap-4 text-left px-2">
                <a href="#/changelog" className="text-[20px] font-bold tracking-tight py-1 transition-colors hover:opacity-80">Changelog</a>
                <a href="#/pricing" className="text-[20px] font-bold tracking-tight py-1 transition-colors hover:opacity-80">Pricing</a>
                <a href="#/awards" className="text-[20px] font-bold tracking-tight py-1 transition-colors hover:opacity-80">Awards</a>
                <a href="#/careers" className="text-[20px] font-bold tracking-tight py-1 transition-colors hover:opacity-80">Careers</a>
                <a href="#/merch" className="text-[20px] font-bold tracking-tight py-1 transition-colors hover:opacity-80">Merch</a>
                <a href="#/support" className="text-[20px] font-bold tracking-tight py-1 transition-colors hover:opacity-80">Support</a>
                <a href="#/login" className="text-[20px] font-bold tracking-tight py-1 transition-colors hover:opacity-80">Log in</a>
              </div>

              {/* Action Button */}
              <div className="w-full mt-4">
                <a 
                  href="#/signup"
                  className="bg-white text-neutral-900 font-bold h-[54px] rounded-full text-[16px] flex items-center justify-center shadow-lg hover:bg-neutral-100 transition-colors w-full"
                >
                  Join for free
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
