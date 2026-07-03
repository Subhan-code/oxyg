import React, { useState, useRef } from 'react';
import { LiquidMetalProgress, LiquidMetalBackToTop } from '../oxygen-ui/liquid-metal-progress';
import { Sparkles, Sliders, ArrowUp, RefreshCw, Layers } from 'lucide-react';

export default function LiquidMetalProgressDemo() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [demoSize, setDemoSize] = useState(80);
  const [demoStroke, setDemoStroke] = useState(5);
  const [customIcon, setCustomIcon] = useState<'arrow' | 'sparkle' | 'layers'>('arrow');

  const getIcon = () => {
    switch (customIcon) {
      case 'arrow':
        return <ArrowUp className="size-6 text-white transition-transform duration-300 group-hover:-translate-y-0.5" />;
      case 'sparkle':
        return <Sparkles className="size-6 text-purple-300 animate-pulse" />;
      case 'layers':
        return <Layers className="size-5.5 text-blue-300" />;
    }
  };

  return (
    <div className="w-full h-full min-h-[500px] bg-zinc-50 dark:bg-zinc-950 p-6 sm:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between font-sans">
      
      {/* Header Info */}
      <div className="space-y-2 max-w-xl">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/50 dark:bg-zinc-800 text-xs font-bold uppercase tracking-wider select-none">
          <Sparkles className="size-3 text-purple-500 animate-pulse" />
          Liquid Metal Progress Bar
        </span>
        <h2 className="text-3xl font-serif tracking-tight text-zinc-950 dark:text-zinc-50">
          WebGL Scroll Canvas Progress
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          A high-end, responsive circular scroll tracker powered by dynamic SVG stroke masks and liquid zinc shaders. Works globally or targets bounded custom scrollable containers.
        </p>
      </div>

      {/* Main Grid: Interactive Setup on Left, Local Scrollable Sim on Right */}
      <div className="my-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Side: Setup Panel */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pb-2 border-b border-zinc-100 dark:border-zinc-850">
              <Sliders size={13} className="text-purple-500" />
              Progress Customizer Panel
            </div>

            {/* Custom Icon Choice */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Center Overlay Icon</label>
              <div className="flex gap-2">
                {[
                  { id: 'arrow', label: 'Up Arrow' },
                  { id: 'sparkle', label: 'Sparkle' },
                  { id: 'layers', label: 'Layers' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setCustomIcon(opt.id as any)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                      customIcon === opt.id
                        ? 'bg-zinc-950 border-zinc-950 dark:bg-zinc-100 dark:border-zinc-100 text-white dark:text-zinc-950 shadow-sm'
                        : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider: Circle Size */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                <span>Circle Size</span>
                <span className="font-mono text-[10px]">{demoSize}px</span>
              </div>
              <input
                type="range"
                min="48"
                max="120"
                step="4"
                className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-purple-600 dark:accent-purple-500"
                value={demoSize}
                onChange={(e) => setDemoSize(parseInt(e.target.value))}
              />
            </div>

            {/* Slider: Stroke Width */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                <span>Zinc Stroke Width</span>
                <span className="font-mono text-[10px]">{demoStroke}px</span>
              </div>
              <input
                type="range"
                min="2.5"
                max="8"
                step="0.5"
                className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-purple-600 dark:accent-purple-500"
                value={demoStroke}
                onChange={(e) => setDemoStroke(parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div className="text-[11px] text-zinc-450 dark:text-zinc-500 leading-normal bg-zinc-50 dark:bg-zinc-950/40 p-3.5 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/40">
            A WebGL canvas operates inside the element continuously. Adjusting settings immediately recalculates dynamic SVG path boundaries used to mask high-performance shaders in real time.
          </div>
        </div>

        {/* Right Side: Scrollable Sandbox Simulation */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between gap-6 relative overflow-hidden">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              Live Bounded Scroll Sandbox
            </span>
            <div className="flex gap-1.5 items-center">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active</span>
            </div>
          </div>

          {/* Sandbox container with absolute floating indicator in bottom corner */}
          <div className="relative border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl h-[220px] overflow-hidden flex flex-col">
            
            {/* Scrollable Box */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar relative scroll-smooth"
            >
              <div className="space-y-2">
                <h4 className="text-sm font-bold">Scroll Down ↓</h4>
                <p className="text-xs text-zinc-450 leading-relaxed">
                  Start scrolling down inside this frame! A floating Liquid Metal Back to Top trigger will smoothly scale into visibility in the bottom corner.
                </p>
              </div>
              <div className="h-[200px] border-l-2 border-dashed border-zinc-200 dark:border-zinc-800 pl-4 py-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Scrolled Section 01</span>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">Zinc fluid flows along with scroll coordinates.</p>
              </div>
              <div className="h-[200px] border-l-2 border-dashed border-zinc-200 dark:border-zinc-800 pl-4 py-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Scrolled Section 02</span>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">Almost full! Keep going to see the circle fill with chrome.</p>
              </div>
              <div className="h-[20px]" />
            </div>

            {/* Bottom floating simulated indicator */}
            <div className="absolute bottom-4 right-4 z-20 transition-all duration-300">
              <LiquidMetalProgress 
                containerRef={scrollContainerRef}
                size={demoSize}
                strokeWidth={demoStroke}
                icon={getIcon()}
                className="shadow-lg shadow-zinc-250/20 dark:shadow-none bg-zinc-950 rounded-full"
                key={`${demoSize}-${demoStroke}-${customIcon}`}
              />
            </div>
          </div>

          <p className="text-center text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            Scroll inside the box to test the progress filling and vector curves!
          </p>
        </div>
      </div>

      <div className="text-center text-xs text-zinc-400 dark:text-zinc-500 leading-normal max-w-md mx-auto">
        This page also operates a global viewport Back to Top floating widget. Look at the bottom-right corner of your browser screen to test window scrolling!
      </div>
      
    </div>
  );
}
