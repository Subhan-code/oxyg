import React, { useState } from 'react';
import { OsmoButton } from './OsmoButton';
import { MenuOverlay } from './MenuOverlay';
import { Menu, Zap, Layers, Sparkles } from 'lucide-react';

export default function OsmoButtonsDemo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar bg-zinc-50 dark:bg-[#000000] text-zinc-950 dark:text-white p-6 sm:p-10 rounded-2xl flex flex-col justify-between relative transition-colors duration-300">
      
      {/* Menu Overlay */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Floating Demo Trigger Navbar inside the sandbox */}
      <div className="flex justify-between items-center w-full bg-white/70 dark:bg-zinc-900/60 backdrop-blur border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl px-6 py-4 shadow-sm relative z-30">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-[#FF4400] flex items-center justify-center text-white font-black text-sm">
            O
          </div>
          <span className="font-bold text-sm tracking-tight uppercase">Osmo Interaction</span>
        </div>
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="flex items-center gap-2 uppercase text-xs font-black tracking-widest text-zinc-650 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
        >
          <span>Trigger Overlay</span>
          <Menu className="w-4 h-4 text-[#FF4400]" />
        </button>
      </div>

      {/* Center Action Zone */}
      <div className="my-12 flex flex-col items-center justify-center text-center gap-8 max-w-xl mx-auto relative z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF4400]/10 text-[#FF4400] border border-[#FF4400]/25 text-[10px] font-bold tracking-widest uppercase">
            <Sparkles className="w-3 h-3" /> Elastic Tilt & Wipe
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-none text-zinc-900 dark:text-white">
            Osmo Stagger Button
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
            Hover over the buttons below to see the interactive springy side tilt, color wipe, and vertical character staggered lift.
          </p>
        </div>

        {/* Buttons Flex Row */}
        <div className="flex flex-wrap gap-4 items-center justify-center mt-4">
          <OsmoButton text="Orange" variant="orange" />
          <OsmoButton text="Blue" variant="blue" />
          <OsmoButton text="Purple" variant="purple" />
          <OsmoButton text="Green" variant="green" />
        </div>
      </div>

      {/* Tech Specifications and Explanations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-auto relative z-10">
        
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 text-zinc-950 dark:text-white mb-3">
            <Zap className="w-4 h-4 text-[#FF4400]" />
            <span className="text-xs font-black uppercase tracking-wider">Dynamic Spring Physics</span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Measures your exact cursor entrance point inside the button to tilt the sliding colors in real time. The color panels straighten up on entry using springy elasticity constants.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 text-zinc-950 dark:text-white mb-3">
            <Layers className="w-4 h-4 text-[#FF4400]" />
            <span className="text-xs font-black uppercase tracking-wider">Staggered Reveal</span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            The fullscreen menu utilizes nested offset staggered panels. Opening layers slide down in sequence and navigation letters bounce into place starting before the panels finish sliding.
          </p>
        </div>

      </div>

    </div>
  );
}
