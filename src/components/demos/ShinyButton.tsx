import React from 'react';
import { motion } from 'motion/react';

export default function ShinyButton({ shineSpeed = 1.5 }: { shineSpeed?: number }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-neutral-950 rounded-3xl">
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-semibold mb-2 text-white">Shiny Hover Button</h2>
        <p className="text-neutral-400">Hover the button to see the smooth shine texture effect</p>
      </div>

      <motion.button
        className="group relative px-8 py-4 font-semibold text-white bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-white/30 transition-colors duration-300"
        whileHover="hover"
        whileTap={{ scale: 0.96 }}
      >
        <span className="relative z-10 flex items-center gap-2 text-lg">
          <svg className="size-5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Get Started Now
        </span>
        
        {/* Ambient glow behind text */}
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* The Shine Texture/Gradient */}
        <motion.div
          className="absolute inset-0 -top-full bottom-0 z-0 w-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg]"
          variants={{
            hover: {
              x: ["-100%", "100%"],
              transition: {
                repeat: Infinity,
                duration: shineSpeed,
                ease: "linear"
              }
            }
          }}
          initial={{ x: "-100%" }}
        />
      </motion.button>
    </div>
  );
}
