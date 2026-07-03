"use client";

import React, { useState } from "react";
import { AuroraBars } from "../oxygen-ui/aurora-bars";
import { cn } from "@/lib/utils";
import { SlidersHorizontal, Sparkles, Copy, Check, Eye } from "lucide-react";

const colorPresets = [
  {
    name: "Aurora Pink",
    colors: ["#ffd6eb", "#ff9acb", "#ff5aa6", "#ff2d78", "#00000000"]
  },
  {
    name: "Northern Lights",
    colors: ["#c7f9cc", "#80ed99", "#57cc99", "#38a3a5", "#22577a", "#00000000"]
  },
  {
    name: "Cyberpunk Violet",
    colors: ["#ff007f", "#7f00ff", "#00f0ff", "#00000000"]
  },
  {
    name: "Sunset Ember",
    colors: ["#ffb56b", "#f85c50", "#9e0059", "#ff2d78", "#00000000"]
  }
];

export function AuroraBarsDemo() {
  const [barCount, setBarCount] = useState(24);
  const [speed, setSpeed] = useState(0.5);
  const [blur, setBlur] = useState(0);
  const [gap, setGap] = useState(3);
  const [maxHeightRatio, setMaxHeightRatio] = useState(0.92);
  const [minHeightRatio, setMinHeightRatio] = useState(0.18);
  const [activePresetIdx, setActivePresetIdx] = useState(0);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const colors = colorPresets[activePresetIdx].colors;

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("npx shadcn@latest add @oxygen-ui/aurora-bars");
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const codeExample = `import { AuroraBars } from "@/components/oxygen-ui/aurora-bars";

export default function AuroraShowcase() {
  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden">
      <AuroraBars
        barCount={${barCount}}
        speed={${speed}}
        blur={${blur}}
        gap={${gap}}
        maxHeightRatio={${maxHeightRatio}}
        minHeightRatio={${minHeightRatio}}
        colors={${JSON.stringify(colors)}}
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
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto p-4 md:p-6 select-none text-foreground bg-background">
      
      {/* Header Info */}
      <div className="flex flex-col gap-2 text-left">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-black tracking-tight font-decorative">Aurora Bars</h2>
          <span className="text-[10px] font-mono font-bold bg-primary/10 text-primary py-0.5 px-2 rounded">New</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
          Animated bars with aurora-inspired gradient effects and organic, smooth transitions using mathematical sine wave noise.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Playground Canvas */}
        <div className="lg:col-span-2 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-black p-1 flex flex-col min-h-[400px] relative overflow-hidden shadow-2xl">
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
            <Eye size={12} className="text-primary" />
            Live Preview
          </div>
          
          <div className="flex-1 w-full h-full rounded-[1.8rem] overflow-hidden">
            <AuroraBars
              barCount={barCount}
              speed={speed}
              blur={blur}
              gap={gap}
              maxHeightRatio={maxHeightRatio}
              minHeightRatio={minHeightRatio}
              colors={colors}
            />
          </div>
        </div>

        {/* Customization Toolbar */}
        <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-zinc-100 dark:border-zinc-900 pb-3">
            <SlidersHorizontal size={16} className="text-primary" />
            <h3 className="text-sm font-bold">Customization</h3>
          </div>

          <div className="flex-1 space-y-5 text-left">
            {/* Color Presets */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">Color Presets</label>
              <div className="grid grid-cols-2 gap-1.5">
                {colorPresets.map((preset, idx) => (
                  <button
                    key={preset.name}
                    onClick={() => setActivePresetIdx(idx)}
                    className={cn(
                      "text-[10px] font-bold py-2 px-1 rounded-lg border transition-all cursor-pointer truncate",
                      activePresetIdx === idx
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-muted-foreground"
                    )}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Bar Count Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-zinc-550 dark:text-zinc-400">Bar Count</span>
                <span className="font-mono text-primary font-bold">{barCount}</span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                step="2"
                value={barCount}
                onChange={(e) => setBarCount(Number(e.target.value))}
                className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Undulation Speed Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-zinc-550 dark:text-zinc-400">Animation Speed</span>
                <span className="font-mono text-primary font-bold">{speed}x</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="2.5"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Blur (Glow) Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-zinc-550 dark:text-zinc-400">Blur (Soft Glow)</span>
                <span className="font-mono text-primary font-bold">{blur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Gap Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-zinc-550 dark:text-zinc-400">Bar Gap</span>
                <span className="font-mono text-primary font-bold">{gap}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="1"
                value={gap}
                onChange={(e) => setGap(Number(e.target.value))}
                className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Ratio Sliders */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="font-semibold text-zinc-500">Min Height</span>
                  <span className="font-mono text-primary">{Math.round(minHeightRatio * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.4"
                  step="0.01"
                  value={minHeightRatio}
                  onChange={(e) => setMinHeightRatio(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="font-semibold text-zinc-500">Max Height</span>
                  <span className="font-mono text-primary">{Math.round(maxHeightRatio * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.0"
                  step="0.01"
                  value={maxHeightRatio}
                  onChange={(e) => setMaxHeightRatio(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Code Snippets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CLI Install */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 flex flex-col justify-between shadow-sm">
          <div className="text-left">
            <h3 className="text-xs font-bold mb-1">CLI Installation</h3>
            <p className="text-[11px] text-muted-foreground mb-4">Install via shadcn packages command.</p>
          </div>
          
          <div className="relative flex items-center justify-between bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-mono text-xs text-zinc-700 dark:text-zinc-300 w-full overflow-x-auto select-all">
            <span className="whitespace-nowrap">npx shadcn@latest add @oxygen-ui/aurora-bars</span>
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

export default AuroraBarsDemo;
