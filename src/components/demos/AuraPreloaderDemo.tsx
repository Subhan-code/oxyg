import React, { useState } from 'react';
import { AuraPreloader } from '../oxygen-ui/aura-preloader';
import { RefreshCw, Play, Settings } from 'lucide-react';

export default function AuraPreloaderDemo() {
  const [trigger, setTrigger] = useState(false);
  const [logoText, setLogoText] = useState('aura.');
  const [duration, setDuration] = useState(1800);
  const [key, setKey] = useState(0);

  const handleTriggerPreloader = () => {
    setKey(prev => prev + 1);
    setTrigger(true);
  };

  return (
    <div className="w-full h-full min-h-[500px] bg-zinc-50 dark:bg-zinc-950 p-6 sm:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between font-sans relative">
      
      {/* Preloader Instance */}
      {trigger && (
        <AuraPreloader
          key={key}
          logoText={logoText}
          duration={duration}
          onComplete={() => setTrigger(false)}
        />
      )}

      {/* Header Info */}
      <div className="space-y-2 max-w-xl">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/50 dark:bg-zinc-800 text-xs font-bold uppercase tracking-wider select-none">
          <Play className="size-3 text-purple-500" />
          Aura Preloader
        </span>
        <h2 className="text-3xl font-serif tracking-tight text-zinc-950 dark:text-zinc-50">
          Fluid Entrance Preloader
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          A layout-coordinated startup overlay. Shows a blurry logo reveal that smoothly fades away, transitioning the user seamlessly into your digital application.
        </p>
      </div>

      {/* Center Settings Console */}
      <div className="my-10 max-w-md mx-auto w-full p-6 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-3xl shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-450 uppercase select-none pb-2 border-b border-zinc-100 dark:border-zinc-850">
          <Settings size={13} className="text-purple-500" />
          Preloader Customizer Console
        </div>

        {/* Custom Text */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Logo Brand Text</label>
          <input
            type="text"
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm outline-none focus:border-zinc-300 dark:focus:border-zinc-700"
            value={logoText}
            onChange={(e) => setLogoText(e.target.value)}
          />
        </div>

        {/* Custom Timing */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
            Preloading Timing ({duration}ms)
          </label>
          <input
            type="range"
            min="1000"
            max="4000"
            step="200"
            className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-purple-600 dark:accent-purple-500"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleTriggerPreloader}
          className="w-full py-3 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold rounded-xl text-sm transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 select-none"
        >
          <RefreshCw className="size-4" />
          Trigger Reveal Overlay
        </button>
      </div>

      <div className="text-center text-xs text-zinc-400 dark:text-zinc-500 leading-normal max-w-sm mx-auto">
        Clicking trigger launches a fullscreen loading veil. The interface will fade out and morph cleanly when the custom timer expires.
      </div>
      
    </div>
  );
}
