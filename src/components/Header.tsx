import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { useState } from "react";

export function Header({ dark = false }: { dark?: boolean }) {
  const { scrollY } = useScroll();
  const [showJoin, setShowJoin] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowJoin(latest > 150);
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-6 px-4 pointer-events-none">
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`${dark ? "bg-[#1d1f27]/90 border border-white/5" : "bg-[#ededed]/90"} backdrop-blur-[24px] rounded-full h-[60px] flex items-center px-6 w-full max-w-[584px] justify-between pointer-events-auto shadow-[0_4px_12px_rgba(0,0,0,0.03)] overflow-hidden`}
      >
        <a href="#/" className={`flex-shrink-0 flex items-center font-bold tracking-tight text-lg ${dark ? "text-white" : "text-[#141414]"}`} aria-label="Oxygen UI">
          <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
          Oxygen UI
        </a>
        
        <nav className="flex items-center h-full">
          <div className="flex items-center gap-6">
            <a href="#/pricing" className={`hidden sm:block text-[15px] font-[600] ${dark ? "text-[#f5f5f5]" : "text-neutral-900"} transition-colors hover:opacity-80`}>Pricing</a>
            <a href="#/awards" className={`hidden sm:block text-[15px] font-[600] ${dark ? "text-[#f5f5f5]" : "text-neutral-900"} transition-colors hover:opacity-80`}>Awards</a>
            <a href="#/login" className={`text-[15px] font-[600] ${dark ? "text-[#f5f5f5]" : "text-neutral-900"} transition-colors hover:opacity-80`}>Log in</a>
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
      </motion.div>
    </header>
  );
}
