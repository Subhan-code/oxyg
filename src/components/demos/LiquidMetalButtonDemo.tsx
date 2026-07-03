import React, { useState } from 'react';
import { LiquidMetalButton } from '../oxygen-ui/liquid-metal-button';
import { Sparkles, Activity } from 'lucide-react';

export default function LiquidMetalButtonDemo() {
  const [clickLog, setClickLog] = useState<string[]>([]);

  const handleButtonClick = (style: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setClickLog(prev => [`[${timestamp}] Triggered "${style}" molten flow action`, ...prev.slice(0, 5)]);
  };

  return (
    <div className="w-full h-full min-h-[500px] bg-zinc-50 dark:bg-zinc-950 p-6 sm:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between font-sans">
      
      {/* Header */}
      <div className="space-y-2 max-w-xl">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/50 dark:bg-zinc-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="size-3 text-purple-500 animate-pulse" />
          Liquid Metal Button
        </span>
        <h2 className="text-3xl font-serif tracking-tight text-zinc-950 dark:text-zinc-50">
          Molten Web Interactions
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          An ultra-premium, fluid gooey merge animation built by driving moving sub-layers into an SVG blur matrix filter. Excellent for highlight buttons, calls to action, or landing headers.
        </p>
      </div>

      {/* Grid of Styles */}
      <div className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-items-center">
        {/* Silver Chrome */}
        <div className="flex flex-col items-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/65 shadow-sm w-full">
          <span className="text-xs font-bold tracking-wide uppercase text-zinc-400">Chrome Silver</span>
          <LiquidMetalButton 
            text="Join Waitlist"
            onClick={() => handleButtonClick('Chrome Silver')}
          />
        </div>

        {/* Purple Aurora */}
        <div className="flex flex-col items-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/65 shadow-sm w-full">
          <span className="text-xs font-bold tracking-wide uppercase text-zinc-400">Royal Purple</span>
          <LiquidMetalButton 
            text="Launch Space" 
            gradient="from-purple-300 via-purple-100 to-indigo-300 dark:from-purple-200 dark:via-purple-100 dark:to-indigo-300"
            onClick={() => handleButtonClick('Royal Purple')}
          />
        </div>

        {/* Gold Luxury */}
        <div className="flex flex-col items-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/65 shadow-sm w-full">
          <span className="text-xs font-bold tracking-wide uppercase text-zinc-400">Luxury Gold</span>
          <LiquidMetalButton 
            text="Unlock Pro" 
            gradient="from-amber-200 via-yellow-50 to-orange-200"
            onClick={() => handleButtonClick('Luxury Gold')}
          />
        </div>

        {/* Obsidian */}
        <div className="flex flex-col items-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/65 shadow-sm w-full">
          <span className="text-xs font-bold tracking-wide uppercase text-zinc-400">Obsidian Slate</span>
          <LiquidMetalButton 
            text="Dark Protocol" 
            gradient="from-zinc-700 via-zinc-800 to-zinc-900 text-zinc-100 dark:from-zinc-800 dark:via-zinc-900 dark:to-black"
            onClick={() => handleButtonClick('Obsidian Slate')}
          />
        </div>
      </div>

      {/* Click Activity Logger */}
      <div className="bg-white dark:bg-zinc-900 p-4.5 rounded-xl border border-zinc-250/70 dark:border-zinc-800/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
          <Activity size={13} className="text-purple-500" />
          Flow Activity Logger
        </div>
        <div className="font-mono text-xs text-zinc-500 space-y-1.5 min-h-[45px]">
          {clickLog.length === 0 ? (
            <span className="italic">No clicks recorded yet. Hover and press any liquid metal button above!</span>
          ) : (
            clickLog.map((log, index) => (
              <div key={index} className="transition-all animate-fadeIn">{log}</div>
            ))
          )}
        </div>
      </div>
      
    </div>
  );
}
