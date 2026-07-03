"use client";

import React, { useState, useRef } from "react";
import { ScrollImageTextReveal, InlineRevealImage } from "../oxygen-ui/ScrollImageTextReveal";
import { cn } from "@/lib/utils";
import { Copy, Check, SlidersHorizontal, Sparkles, Code, Layout, RefreshCw, Eye } from "lucide-react";

export function ScrollImageTextRevealDemo() {
  const [maxWidth, setMaxWidth] = useState(160);
  const [heightClass, setHeightClass] = useState("h-8 sm:h-10 md:h-12");
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  
  // Demo images
  const images = {
    design: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=400",
    dev: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400",
    team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400",
    product: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400"
  };

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("npm install motion");
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const codeExample = `import { ScrollImageTextReveal, InlineRevealImage } from "@/components/oxygen-ui/ScrollImageTextReveal";

export default function TextRevealShowcase() {
  return (
    <ScrollImageTextReveal className="max-w-4xl mx-auto py-20">
      {(progress) => (
        <p className="text-3xl md:text-5xl font-medium tracking-tight leading-relaxed text-foreground text-center">
          We build
          <InlineRevealImage
            src="${images.design}"
            alt="Design process"
            containerProgress={progress}
            scrollRange={[0.1, 0.4]}
            maxWidth={${maxWidth}}
            heightClassName="${heightClass}"
          />
          extraordinary digital interfaces that blend
          <InlineRevealImage
            src="${images.dev}"
            alt="Development"
            containerProgress={progress}
            scrollRange={[0.3, 0.6]}
            maxWidth={${maxWidth}}
            heightClassName="${heightClass}"
          />
          creative engineering with beautiful code. Our team of
          <InlineRevealImage
            src="${images.team}"
            alt="Team"
            containerProgress={progress}
            scrollRange={[0.5, 0.8]}
            maxWidth={${maxWidth}}
            heightClassName="${heightClass}"
          />
          designers and developers shape the products of tomorrow.
        </p>
      )}
    </ScrollImageTextReveal>
  );
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeExample);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex flex-col gap-10 w-full max-w-6xl mx-auto p-4 md:p-8 select-none text-foreground bg-background">
      
      {/* Header Panel */}
      <div className="flex flex-col gap-2 text-left">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-black tracking-tight font-decorative">Scroll Image Text Reveal</h2>
          <span className="text-[10px] font-mono font-bold bg-primary/10 text-primary py-0.5 px-2 rounded">New</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
          An elegant scroll-linked typographic animation where high-quality preview images smoothly expand inline inside standard body copy as you scroll the page.
        </p>
      </div>

      {/* Main Interactive Demo Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Interactive Play Canvas */}
        <div className="lg:col-span-2 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 p-6 md:p-8 flex flex-col justify-between min-h-[450px] relative overflow-hidden shadow-sm">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          
          <div className="flex justify-between items-center relative z-20 mb-6">
            <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
              <Eye size={12} className="text-primary" />
              Scroll to reveal images
            </span>
          </div>

          {/* Morph Center Area - Scrolling Preview */}
          <div className="flex-1 flex flex-col items-center justify-center py-12 px-2 text-center">
            {/* Scroll Indicator */}
            <div className="mb-8 animate-bounce text-xs font-semibold text-primary/70 bg-primary/5 py-1 px-3 rounded-full border border-primary/15">
              Scroll down the page to trigger the reveal ↓
            </div>

            <ScrollImageTextReveal className="max-w-2xl">
              {(progress) => (
                <p className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight leading-loose text-zinc-900 dark:text-zinc-100 transition-all duration-300">
                  We build
                  <InlineRevealImage
                    src={images.design}
                    alt="Design Process"
                    containerProgress={progress}
                    scrollRange={[0.1, 0.4]}
                    maxWidth={maxWidth}
                    heightClassName={heightClass}
                  />
                  extraordinary digital experiences that combine
                  <InlineRevealImage
                    src={images.dev}
                    alt="Development"
                    containerProgress={progress}
                    scrollRange={[0.3, 0.6]}
                    maxWidth={maxWidth}
                    heightClassName={heightClass}
                  />
                  creative engineering with pixel perfection. Our dedicated
                  <InlineRevealImage
                    src={images.team}
                    alt="Team collaboration"
                    containerProgress={progress}
                    scrollRange={[0.5, 0.8]}
                    maxWidth={maxWidth}
                    heightClassName={heightClass}
                  />
                  teams craft the interactive future.
                </p>
              )}
            </ScrollImageTextReveal>
          </div>

          <div className="text-[11px] text-zinc-400 dark:text-zinc-500 bg-zinc-100/85 dark:bg-zinc-900/60 py-1.5 px-3.5 rounded-full self-center flex items-center gap-1.5 relative z-20 mt-6 border border-zinc-200/50 dark:border-zinc-800/40">
            <span>Inline images expand automatically pushing adjacent text layout gracefully</span>
          </div>
        </div>

        {/* Dashboard Settings */}
        <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-zinc-100 dark:border-zinc-900 pb-3">
            <SlidersHorizontal size={16} className="text-primary" />
            <h3 className="text-base font-bold">Customization</h3>
          </div>

          <div className="flex-1 space-y-6 text-left">
            {/* Max Width Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-zinc-500 dark:text-zinc-400">Max Reveal Width</span>
                <span className="font-mono text-primary font-bold">{maxWidth}px</span>
              </div>
              <input
                type="range"
                min="100"
                max="240"
                step="10"
                value={maxWidth}
                onChange={(e) => setMaxWidth(Number(e.target.value))}
                className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Height Presets */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Image Aspect / Height</label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: "Compact", val: "h-6 sm:h-7 md:h-8" },
                  { label: "Regular", val: "h-8 sm:h-10 md:h-12" },
                  { label: "Prominent", val: "h-10 sm:h-12 md:h-16" }
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setHeightClass(preset.val)}
                    className={cn(
                      "text-[10px] font-bold py-2 px-1 rounded-lg border capitalize transition-all cursor-pointer",
                      heightClass === preset.val
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-muted-foreground"
                    )}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scroll mapping details */}
            <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900/60 p-4 border border-zinc-100 dark:border-zinc-900 text-[11px] leading-relaxed text-muted-foreground space-y-2">
              <div className="font-bold text-zinc-700 dark:text-zinc-300">How it works:</div>
              <p>
                Each image tracks the parent scroll progress container. They are mapped to active scroll windows via the <code className="text-primary font-semibold">scrollRange</code> prop (e.g. <code className="text-zinc-900 dark:text-zinc-100">{'[0.1, 0.4]'}</code>).
              </p>
              <p>
                Animations utilize custom spring presets to damp wiggles and guarantee soft fluid scaling adjustments.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Code Snippets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Package CLI */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-6 flex flex-col justify-between shadow-sm">
          <div className="text-left">
            <h3 className="text-sm font-bold mb-1">Prerequisites</h3>
            <p className="text-xs text-muted-foreground mb-4">Install Framer Motion to enable scroll timeline functions.</p>
          </div>
          
          <div className="relative flex items-center justify-between bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-mono text-xs text-zinc-700 dark:text-zinc-300 w-full overflow-x-auto select-all">
            <span className="whitespace-nowrap">npm install motion</span>
            <button
              onClick={handleCopyInstall}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-muted-foreground hover:text-foreground transition-colors ml-2 cursor-pointer"
            >
              {copiedInstall ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
            </button>
          </div>
        </div>

        {/* Usage Snippet */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-6 flex flex-col justify-between shadow-sm">
          <div className="text-left">
            <h3 className="text-sm font-bold mb-1">React Code Usage</h3>
            <p className="text-xs text-muted-foreground mb-4">Wrap target paragraph text and add inline reveal markers.</p>
          </div>

          <div className="relative w-full">
            <button
              onClick={handleCopyCode}
              className="absolute top-2 right-2 p-1.5 z-10 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {copiedCode ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
            </button>
            <pre className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 font-mono text-[10px] text-zinc-750 dark:text-zinc-350 overflow-x-auto max-h-[160px] text-left">
              <code>{codeExample}</code>
            </pre>
          </div>
        </div>

      </div>

    </div>
  );
}

export default ScrollImageTextRevealDemo;
