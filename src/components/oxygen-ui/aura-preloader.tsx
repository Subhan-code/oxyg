import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface AuraPreloaderProps {
  logoText?: string;
  duration?: number;
  onComplete?: () => void;
}

export function AuraPreloader({
  logoText = 'aura.',
  duration = 2000,
  onComplete,
}: AuraPreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Blurred overlay background */}
          <motion.div
            key="preloader-overlay"
            className="fixed inset-0 z-[9998] bg-zinc-950/95 backdrop-blur-2xl pointer-events-auto"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Centered logo reveal */}
          <motion.div
            key="preloader-content"
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none select-none"
            exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ filter: 'blur(20px)', opacity: 0, scale: 0.9 }}
              animate={{ filter: 'blur(0px)', opacity: 1, scale: 1 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 1.2 }}
              className="text-6xl sm:text-8xl font-bold tracking-tighter text-zinc-100 dark:text-zinc-100 font-sans"
            >
              {logoText}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


