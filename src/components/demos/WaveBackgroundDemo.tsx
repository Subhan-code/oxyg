"use client";

import React, { useState } from "react";
import { WaveBackground } from "../oxygen-ui/wave-background";
import { cn } from "@/lib/utils";
import { SlidersHorizontal, Sparkles, Copy, Check, Eye, LayoutGrid } from "lucide-react";

const themePresets = [
  {
    name: "Emerald Shore",
    fill: "#10b981", // Emerald
    background: "#0c0a09" // Stone 950
  },
  {
    name: "Neon Eclipse",
    fill: "#a855f7", // Purple 500
    background: "#09090b" // Zinc 950
  },
  {
    name: "Sunset Dust",
    fill: "#f97316", // Orange 500
    background: "#1c1917" // Stone 900
  },
  {
    name: "Glacier Water",
    fill: "#3b82f6", // Blue 500
    background: "#030712" // Gray 950
  }
];

export function WaveBackgroundDemo() {
  const [variant, setVariant] = useState<"scroll" | "ambient">("ambient");
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [height, setHeight] = useState(120);
  const [speed, setSpeed] = useState(1);
  const [amplitude, setAmplitude] = useState(28);
  const [activeThemeIdx, setActiveThemeIdx] = useState(0);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const theme = themePresets[activeThemeIdx];

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("npx shadcn@latest add @oxygen-ui/wave-background");
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const codeExample = `import { WaveBackground } from "@/components/oxygen-ui/wave-background";

export default function WaveShowcase() {
  return (
    <div className="w-full relative overflow-hidden bg-[${theme.background}]">
      <WaveBackground
        variant="${variant}"
        direction="${direction}"
        height={${height}}
        speed={${speed}}
        amplitude={${amplitude}}
        fill="${theme.fill}"
        background="${theme.background}"
      />
    </div>
  );
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeExample);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex flex-col gap-10 w-full max-w-5xl mx-auto p-4 md:p-6 select-none text-foreground bg-background">
      
      {/* Header Info */}
      <div className="flex flex-col gap-2 text-left">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-black tracking-tight font-decorative">Wave Background</h2>
          <span className="text-[10px] font-mono font-bold bg-primary/10 text-primary py-0.5 px-2 rounded">New</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
          A morphing SVG wave divider with scroll-driven morphing and intersection-observer optimized ambient looping animations.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Playground Canvas */}
        <div className="lg:col-span-2 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-surface/50 dark:bg-zinc-900/10 p-6 flex flex-col justify-between min-h-[400px] relative overflow-hidden shadow-sm">
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
            <Eye size={12} className="text-primary" />
            Live Playground
          </div>

          <div 
            className="flex-1 w-full flex items-center justify-center rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800/80 min-h-[260px] relative"
            style={{ backgroundColor: theme.background }}
          >
            {variant === "scroll" && (
              <div className="absolute top-2 right-4 text-[10px] text-zinc-450 z-20 font-bold bg-zinc-950/70 border border-white/5 py-0.5 px-2 rounded-full">
                Scroll the column to morph ↓
              </div>
            )}

            <div className="w-full absolute bottom-0 inset-x-0">
              <WaveBackground
                variant={variant}
                direction={direction}
                height={height}
                speed={speed}
                amplitude={amplitude}
                fill={theme.fill}
                background={theme.background}
              />
            </div>
            
            <div className="text-center z-10 text-white p-8">
              <h4 className="text-lg font-black tracking-tight uppercase">Section Divider</h4>
              <p className="text-xs text-white/50 mt-1">Scroll or loop the waves dynamically</p>
            </div>
          </div>
          
          <div className="text-[10px] text-zinc-400 dark:text-zinc-500 py-1.5 px-3.5 rounded-full self-center flex items-center gap-1.5 mt-4 border border-zinc-250/20">
            <span>SVG paths are mathematical morphs ensuring extremely light CPU rendering</span>
          </div>
        </div>

        {/* Customization Toolbar */}
        <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-zinc-100 dark:border-zinc-900 pb-3">
            <SlidersHorizontal size={16} className="text-primary" />
            <h3 className="text-sm font-bold">Customization</h3>
          </div>

          <div className="flex-1 space-y-5 text-left">
            {/* Variant Switcher */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">Animation Variant</label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: "Scroll Morph", val: "scroll" },
                  { label: "Ambient Loop", val: "ambient" }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setVariant(item.val as any)}
                    className={cn(
                      "text-[10px] font-bold py-2 px-1 rounded-lg border transition-all cursor-pointer",
                      variant === item.val
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Direction switcher */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">Wave Direction</label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: "Crest Down", val: "down" },
                  { label: "Crest Up", val: "up" }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setDirection(item.val as any)}
                    className={cn(
                      "text-[10px] font-bold py-2 px-1 rounded-lg border transition-all cursor-pointer",
                      direction === item.val
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Presets */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">Color Palette</label>
              <div className="grid grid-cols-2 gap-1.5">
                {themePresets.map((t, idx) => (
                  <button
                    key={t.name}
                    onClick={() => setActiveThemeIdx(idx)}
                    className={cn(
                      "text-[10px] font-bold py-2 px-1 rounded-lg border transition-all cursor-pointer truncate",
                      activeThemeIdx === idx
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-muted-foreground"
                    )}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Height Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-zinc-550 dark:text-zinc-400">Wave Height</span>
                <span className="font-mono text-primary font-bold">{height}px</span>
              </div>
              <input
                type="range"
                min="60"
                max="240"
                step="10"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Ambient parameters */}
            {variant === "ambient" && (
              <>
                {/* Speed Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-semibold text-zinc-550 dark:text-zinc-400">Looping Speed</span>
                    <span className="font-mono text-primary font-bold">{speed}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Amplitude Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-semibold text-zinc-550 dark:text-zinc-400">Wave Amplitude</span>
                    <span className="font-mono text-primary font-bold">{amplitude}px</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="2"
                    value={amplitude}
                    onChange={(e) => setAmplitude(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </>
            )}

          </div>
        </div>

      </div>

      {/* Structured Real-world Layout Examples */}
      <div className="flex flex-col gap-6 text-left border-t border-zinc-150 dark:border-zinc-900/40 pt-10">
        <div className="flex items-center gap-2 mb-2">
          <LayoutGrid size={18} className="text-primary" />
          <h3 className="text-lg font-bold">Integration Showcases</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card Accent Example */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-black overflow-hidden flex flex-col justify-between h-[300px]">
            <div className="h-28 bg-gradient-to-br from-[#10b981] to-[#047857] p-5 flex items-end">
              <span className="text-white text-xs font-mono font-bold tracking-widest uppercase">Emerald Dashboard</span>
            </div>
            
            <WaveBackground
              variant="ambient"
              fill="#09090b"
              background="#047857"
              direction="down"
              height={36}
              speed={0.8}
              amplitude={12}
            />

            <div className="flex-1 bg-[#09090b] text-white p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wide">Card Accent Wave</h4>
                <p className="text-[11px] text-zinc-450 mt-1 leading-relaxed">
                  Smoothly blends a graphical header or photo card deck into standard dark body copy using ambient undulating SVG coordinates.
                </p>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold self-start mt-2">Active Integration →</span>
            </div>
          </div>

          {/* Hero Transition Example */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-[#0c0a09] overflow-hidden flex flex-col justify-between h-[300px] relative">
            <div className="flex-1 p-6 flex flex-col justify-center items-center text-center">
              <span className="text-[10px] font-bold tracking-widest text-orange-400 uppercase bg-orange-400/5 border border-orange-400/10 py-1 px-3.5 rounded-full mb-3">Hero Header Section</span>
              <h4 className="text-xl font-bold tracking-tight text-white">AMBIENT TRANSITIONS</h4>
              <p className="text-[11px] text-zinc-400 max-w-xs mt-2 leading-relaxed">
                Add an organic full-width transition wave revealing the subsequent section background smoothly.
              </p>
            </div>
            
            <WaveBackground
              variant="ambient"
              fill="#1c1917"
              background="#0c0a09"
              direction="down"
              height={50}
              speed={1.1}
              amplitude={16}
            />
            
            <div className="h-10 bg-[#1c1917] w-full" />
          </div>

        </div>
      </div>

      {/* Code Snippets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-zinc-150 dark:border-zinc-900/40 pt-10">
        
        {/* CLI Install */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 flex flex-col justify-between shadow-sm">
          <div className="text-left">
            <h3 className="text-xs font-bold mb-1">CLI Installation</h3>
            <p className="text-[11px] text-muted-foreground mb-4">Install via shadcn packages command.</p>
          </div>
          
          <div className="relative flex items-center justify-between bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-mono text-xs text-zinc-700 dark:text-zinc-300 w-full overflow-x-auto select-all">
            <span className="whitespace-nowrap">npx shadcn@latest add @oxygen-ui/wave-background</span>
            <button
              onClick={handleCopyInstall}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-muted-foreground hover:text-foreground transition-colors ml-2 cursor-pointer shrink-0"
            >
              {copiedInstall ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
            </button>
          </div>
        </div>

        {/* Code Snippet */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 flex flex-col justify-between shadow-sm">
          <div className="text-left">
            <h3 className="text-xs font-bold mb-1">Usage Snippet</h3>
            <p className="text-[11px] text-muted-foreground mb-4">Import and overlay inside any parent layout.</p>
          </div>

          <div className="relative w-full">
            <button
              onClick={handleCopyCode}
              className="absolute top-2 right-2 p-1.5 z-10 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {copiedCode ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
            </button>
            <pre className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 font-mono text-[9px] text-zinc-750 dark:text-zinc-350 overflow-x-auto max-h-[120px] text-left">
              <code>{codeExample}</code>
            </pre>
          </div>
        </div>

      </div>

    </div>
  );
}

export default WaveBackgroundDemo;
