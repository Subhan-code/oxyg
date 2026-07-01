import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import React, { useState, useEffect } from "react";
import logoUrl from "../assets/oxygen-ui-logo.png";
import { Menu, X, Copy, Download } from "lucide-react";

export function Header({ dark = false }: { dark?: boolean }) {
  const { scrollY } = useScroll();
  const [showJoin, setShowJoin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  // Close context menu on click or scroll
  useEffect(() => {
    const handleClose = () => setContextMenu(null);
    window.addEventListener("click", handleClose);
    window.addEventListener("scroll", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
      window.removeEventListener("scroll", handleClose);
    };
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleCopySvg = (e: React.MouseEvent) => {
    e.stopPropagation();
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="#3b82f6" stroke-width="8" fill="none" />
  <text x="50" y="58" font-family="system-ui, sans-serif" font-weight="bold" font-size="24" fill="#3b82f6" text-anchor="middle">O₂</text>
</svg>`;
    navigator.clipboard.writeText(svgString).then(() => {
      // Sleek alert/toast
    }).catch(err => {
      console.error("Could not copy text: ", err);
    });
    setContextMenu(null);
  };

  const handleDownloadWordmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const wordmarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80" width="300" height="80">
  <circle cx="40" cy="40" r="20" stroke="#3b82f6" stroke-width="5" fill="none" />
  <text x="40" y="46" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#3b82f6" text-anchor="middle">O₂</text>
  <text x="85" y="48" font-family="system-ui, sans-serif" font-weight="bold" font-size="28" fill="#3b82f6">Oxygen UI</text>
</svg>`;
    const blob = new Blob([wordmarkSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "oxygen-ui-wordmark.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setContextMenu(null);
  };

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
          height: isMenuOpen ? "auto" : 60,
          borderRadius: isMenuOpen ? "28px" : "30px"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className={`${
          dark || isMenuOpen ? "bg-[#1d1f27]/95 border border-white/5 text-white" : "bg-[#ededed]/90 text-[#141414]"
        } backdrop-blur-[24px] flex flex-col px-6 w-full max-w-[584px] pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden`}
      >
        {/* Top bar (always visible, height 60px) */}
        <div className="h-[60px] flex items-center justify-between w-full shrink-0">
          <a 
            href="#/" 
            onContextMenu={handleContextMenu}
            className="flex-shrink-0 flex items-center font-bold tracking-tight text-lg cursor-pointer" 
            aria-label="Oxygen UI"
          >
            <img src={logoUrl} alt="Oxygen UI Logo" className="h-8 w-8 mr-2 object-contain" />
            {!isMenuOpen && <span>Oxygen UI</span>}
          </a>
          
          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center h-full">
            <div className="flex items-center gap-6">
              <a href="#/installation" className="text-[15px] font-[600] transition-colors hover:opacity-80">Installation</a>
              <a href="#/pricing" className="text-[15px] font-[600] transition-colors hover:opacity-80">Pricing</a>
              <a href="#contact" className="text-[15px] font-[600] transition-colors hover:opacity-80">Contact</a>
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
                    className={`${dark ? "bg-white text-neutral-900" : "bg-[#141414] text-white"} hover:opacity-90 transition-[opacity,transform] active:scale-[0.96] h-[44px] px-4 rounded-full text-[15px] font-[600] flex items-center justify-center whitespace-nowrap`}
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

        {/* Mobile menu content (reveals dynamically with staggered child animations) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={{
                closed: {
                  opacity: 0,
                  height: 0,
                  transition: {
                    duration: 0.25,
                    ease: "easeInOut",
                    when: "afterChildren",
                    staggerChildren: 0.03,
                    staggerDirection: -1
                  }
                },
                open: {
                  opacity: 1,
                  height: "auto",
                  transition: {
                    duration: 0.35,
                    ease: "easeOut",
                    staggerChildren: 0.04,
                    delayChildren: 0.05
                  }
                }
              }}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col w-full pb-6 pt-2 justify-between sm:hidden overflow-hidden"
            >
              {/* Menu items list */}
              <div className="flex flex-col gap-3.5 text-left px-2">
                {[
                  { href: "#/installation", label: "Installation" },
                  { href: "#/pricing", label: "Pricing" },
                  { href: "#contact", label: "Contact" },
                  { href: "#/changelog", label: "Changelog" },
                  { href: "#/careers", label: "Careers" },
                  { href: "#/merch", label: "Merch" },
                  { href: "#/support", label: "Support" },
                  { href: "#/login", label: "Log in" }
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    variants={{
                      closed: { opacity: 0, y: -16 },
                      open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } }
                    }}
                  >
                    <a 
                      href={item.href} 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-[20px] font-bold tracking-tight py-1 transition-colors hover:opacity-80 block"
                    >
                      {item.label}
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Action Button */}
              <motion.div 
                variants={{
                  closed: { opacity: 0, y: -16 },
                  open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } }
                }}
                className="w-full mt-5"
              >
                <a 
                  href="#/signup"
                  className="bg-white text-neutral-900 font-bold h-[54px] rounded-full text-[16px] flex items-center justify-center shadow-lg hover:bg-neutral-100 transition-[background-color,transform] active:scale-[0.96] w-full"
                >
                  Join for free
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Custom Context Menu */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.12 }}
            style={{ 
              top: contextMenu.y, 
              left: contextMenu.x,
              position: "fixed"
            }}
            className="z-[999] bg-[#2a2a2a]/95 border border-white/10 text-white rounded-2xl p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md w-[200px] pointer-events-auto flex flex-col gap-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleCopySvg}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[14px] font-[600] text-left hover:bg-white/10 rounded-xl transition-[background-color,transform] active:scale-[0.96] cursor-pointer select-none text-white/90"
            >
              <Copy className="w-4 h-4 text-white/70" />
              <span>Copy svg</span>
            </button>
            <button 
              onClick={handleDownloadWordmark}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[14px] font-[600] text-left hover:bg-white/10 rounded-xl transition-[background-color,transform] active:scale-[0.96] cursor-pointer select-none text-white/90"
            >
              <Download className="w-4 h-4 text-white/70" />
              <span>Download wordmark</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
