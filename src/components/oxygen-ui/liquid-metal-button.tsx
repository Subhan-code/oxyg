import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export interface LiquidMetalButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  gradient?: string;
}

export function LiquidMetalButton({
  text = 'Join the Waitlist',
  onClick,
  className,
  gradient = 'from-zinc-200 via-zinc-100 to-zinc-300 dark:from-zinc-100 dark:via-zinc-50 dark:to-zinc-300',
}: LiquidMetalButtonProps) {
  return (
    <div className="relative inline-block select-none">
      {/* SVG gooey composite filter */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="liquid-metal">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
            <feComposite in="SourceGraphic" in2="liquid" operator="atop" />
          </filter>
        </defs>
      </svg>
      
      <motion.button 
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        className={cn(
          "relative flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-br text-zinc-950 font-bold text-base tracking-tight overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.2)] border border-white/20 active:outline-none focus:outline-none cursor-pointer",
          gradient,
          className
        )}
        style={{ filter: 'url(#liquid-metal)' }}
      >
        <span className="relative z-20 drop-shadow-sm font-semibold tracking-wide">{text}</span>
        
        {/* Animated Liquid blob nodes */}
        <motion.div 
          animate={{ 
            x: [0, 30, -10, 0], 
            y: [0, -15, 15, 0],
            scale: [1, 1.3, 0.8, 1]
          }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-12 h-12 bg-white/70 rounded-full mix-blend-overlay blur-[2px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 20, 0], 
            y: [0, 20, -20, 0],
            scale: [1, 0.8, 1.4, 1]
          }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute bottom-0 right-1/4 w-16 h-16 bg-zinc-300 rounded-full mix-blend-overlay blur-[2px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, 35, -25, 0], 
            y: [0, 20, -10, 0],
            scale: [1, 1.4, 0.9, 1]
          }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-10 h-10 bg-zinc-100 rounded-full mix-blend-overlay blur-[2px]" 
        />
        
        {/* Shiny sweep effect */}
        <motion.div 
          animate={{ x: ['-200%', '200%'] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
          className="absolute inset-0 z-10 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60 skew-x-[25deg] pointer-events-none"
        />
      </motion.button>
    </div>
  );
}


