"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ProgressiveFluxLoaderProps {
  duration?: number; // duration in seconds
  onComplete?: () => void;
  className?: string;
}

const PHASES = [
  "INITIALIZING FLUX CORE",
  "CONNECTING NETWORK NEURONS",
  "STREAMING DATA SYNAPSE",
  "SYNC COMPLETE - SYSTEM ONLINE",
];

export function ProgressiveFluxLoader({
  duration = 8,
  onComplete,
  className = "",
}: ProgressiveFluxLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    let animFrame: number;

    const update = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      const phaseCount = PHASES.length;
      const index = Math.min(
        Math.floor((pct / 100) * phaseCount),
        phaseCount - 1
      );
      setPhaseIndex(index);

      if (pct < 100) {
        animFrame = requestAnimationFrame(update);
      } else {
        if (onComplete) onComplete();
      }
    };

    animFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animFrame);
  }, [duration, onComplete]);

  const currentPhase = PHASES[phaseIndex];

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(2px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring" as const, stiffness: 150, damping: 12 },
    },
  };

  return (
    <div className={`w-full max-w-sm mx-auto flex flex-col items-center gap-6 p-8 bg-neutral-950 border border-neutral-800 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] ${className}`}>
      <div className="flex flex-col items-center gap-1.5">
        <motion.span
          className="text-4xl md:text-5xl font-black tracking-tight text-white font-mono bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {Math.round(progress)}%
        </motion.span>
        <span className="text-[9px] font-extrabold tracking-[0.25em] uppercase text-neutral-500">
          Sync Progress
        </span>
      </div>

      <div className="w-full relative h-3 bg-neutral-900 rounded-full overflow-visible p-[2px] border border-white/5">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 rounded-full blur-md opacity-70 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
        
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-full relative z-10"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="h-6 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase}
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-wrap justify-center gap-[2px]"
          >
            {currentPhase.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="text-[10px] md:text-xs font-black tracking-wider text-cyan-400 uppercase font-mono"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ProgressiveFluxLoader;
