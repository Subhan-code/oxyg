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
        <a href="#/" className={`flex-shrink-0 flex items-center ${dark ? "text-white" : "text-black"}`} aria-label="Mobbin">
          <svg xmlns="http://www.w3.org/2000/svg" width="117" height="17" fill="none" overflow="visible"><path d="M 94.51 16.986 C 98.007 16.986 99.895 13.99 99.895 10.638 C 99.895 7.286 98.076 4.333 94.482 4.333 C 92.847 4.333 91.396 5.038 90.776 6.076 L 90.776 0.197 L 87.629 0.197 L 87.629 16.729 L 90.776 16.729 L 90.776 14.969 C 91.409 16.14 92.746 16.986 94.51 16.986 Z M 93.713 14.005 C 91.783 14.005 90.636 12.436 90.636 10.51 C 90.636 8.584 91.88 7.029 93.741 7.029 C 95.797 7.029 96.818 8.727 96.818 10.51 C 96.818 12.293 95.629 14.005 93.713 14.005 Z M 106.063 16.729 L 109.252 16.729 L 109.252 10.61 C 109.252 8.784 109.881 7.329 111.657 7.329 C 113.433 7.329 113.811 8.798 113.811 10.51 L 113.811 16.729 L 117 16.729 L 117 9.511 C 117 6.416 115.476 4.333 112.762 4.333 C 111.195 4.333 109.673 5.011 109.168 6.836 L 109.168 5.033 L 106.063 5.033 Z M 100.962 3.575 L 104.646 3.575 L 104.646 0 L 100.962 0 Z M 101.202 16.729 L 104.405 16.729 L 104.405 5.033 L 101.202 5.033 Z M 80.985 16.986 C 84.482 16.986 86.37 13.99 86.37 10.638 C 86.37 7.286 84.552 4.333 80.957 4.333 C 79.322 4.333 77.871 5.038 77.251 6.076 L 77.251 0.197 L 74.104 0.197 L 74.104 16.729 L 77.251 16.729 L 77.251 14.969 C 77.884 16.14 79.221 16.986 80.985 16.986 Z M 80.188 14.005 C 78.258 14.005 77.111 12.436 77.111 10.51 C 77.111 8.584 78.356 7.029 80.216 7.029 C 82.272 7.029 83.293 8.727 83.293 10.51 C 83.293 12.293 82.104 14.005 80.188 14.005 Z M 66.579 13.952 C 64.573 13.952 63.471 12.439 63.471 10.581 C 63.471 8.593 64.7 7.21 66.579 7.21 C 68.641 7.21 69.771 8.809 69.771 10.581 C 69.771 12.353 68.599 13.952 66.579 13.952 Z M 66.579 17 C 70.37 17 72.789 14.333 72.789 10.667 C 72.789 7.001 70.286 4.276 66.579 4.276 C 62.873 4.276 60.453 6.986 60.453 10.667 C 60.453 14.347 62.957 17 66.579 17 Z M 41.921 16.843 L 45.054 16.843 L 45.054 5.472 L 49.04 16.187 L 52.033 16.187 L 56.02 5.472 L 56.02 16.843 L 59.153 16.843 L 59.153 0.197 L 55.083 0.197 L 50.537 12.778 L 46.005 0.197 L 41.921 0.197 Z M 12.309 16.843 L 21.554 16.843 L 25.327 12.737 L 25.327 16.843 L 35.518 16.843 L 35.518 7.01 L 29.793 7.01 L 29.793 0.201 L 21.129 0.201 L 17.234 4.341 L 17.234 0.201 L 7.234 0.201 L 0 7.989 L 0 16.839 L 8.322 16.843 L 12.309 12.504 Z" fill="currentColor"></path></svg>
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
