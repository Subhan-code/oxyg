"use client";

import React, { useState } from "react";
import { Signature } from "../oxygen-ui/Signature";
import { cn } from "@/lib/utils";
import { SlidersHorizontal, Sparkles, Copy, Check, Eye, RefreshCw } from "lucide-react";

const colorPresets = [
  { name: "Cyan Spark", value: "#06b6d4" },
  { name: "Emerald", value: "#10b981" },
  { name: "Sunset Gold", value: "#f59e0b" },
  { name: "Rose Accent", value: "#f43f5e" },
  { name: "Pure White", value: "#ffffff" },
  { name: "Glow Purple", value: "#a855f7" },
];

const fontPresets = [
  { name: "Lastoria Bold (Local)", url: "/LastoriaBoldRegular.otf" },
  { name: "Mr De Haviland (Google)", url: "https://raw.githubusercontent.com/google/fonts/main/ofl/mrdehaviland/MrDeHaviland-Regular.ttf" },
  { name: "Monsieur La Doulaise (Google)", url: "https://raw.githubusercontent.com/google/fonts/main/ofl/monsieurladoulaise/MonsieurLaDoulaise-Regular.ttf" },
  { name: "Herr Von Muellerhoff (Google)", url: "https://raw.githubusercontent.com/google/fonts/main/ofl/herrvonmuellerhoff/HerrVonMuellerhoff-Regular.ttf" },
  { name: "Pinyon Script (Google)", url: "https://raw.githubusercontent.com/google/fonts/main/ofl/pinyonscript/PinyonScript-Regular.ttf" },
];

export function SignatureDemo() {
  const [text, setText] = useState("Oxygen UI");
  const [fontSize, setFontSize] = useState(48);
  const [duration, setDuration] = useState(1.8);
  const [delay, setDelay] = useState(0.1);
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [activeFontIdx, setActiveFontIdx] = useState(0);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const selectedColor = colorPresets[activeColorIdx].value;
  const selectedFontUrl = fontPresets[activeFontIdx].url;

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("pnpm dlx shadcn@latest add @oxygen-ui/signature");
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`import { Signature } from "@/components/oxygen-ui/Signature";

export default function Example() {
  return (
    <Signature
      text="${text}"
      color="${selectedColor}"
      fontSize={${fontSize}}
      duration={${duration}}
      delay={${delay}}
      fontUrl="${selectedFontUrl}"
    />
  );
}`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const triggerReset = () => {
    setAnimKey((prev) => prev + 1);
  };

  const codeExample = `import { Signature } from "@/components/oxygen-ui/Signature";

export default function SignatureShowcase() {
  return (
    <Signature
      text="${text}"
      color="${selectedColor}"
      fontSize={${fontSize}}
      duration={${duration}}
      delay={${delay}}
      fontUrl="${selectedFontUrl}"
    />
  );
}`;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-sky-500/10 text-sky-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Animations
            </span>
            <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Opentype.js
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Signature Reveal</h2>
          <p className="text-xs text-muted-foreground">
            An animated SVG signature effect that draws out custom text dynamically like handwriting.
          </p>
        </div>
        
        <button
          onClick={triggerReset}
          className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
        >
          <RefreshCw size={12} className="animate-spin-slow" />
          Replay Animation
        </button>
      </div>

      {/* Main Showcase Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Interactive Canvas */}
        <div className="lg:col-span-8 flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 overflow-hidden min-h-[350px] relative shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] -z-10 opacity-70" />
          
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200/50 dark:border-zinc-800/50 text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
            <span>PREVIEW CANVAS</span>
            <span className="flex items-center gap-1 text-[9px]"><Sparkles size={10} className="text-sky-500" /> Active Drawing</span>
          </div>

          <div className="flex-1 flex items-center justify-center p-6 md:p-8 min-h-[220px] overflow-auto">
            <Signature
              key={animKey}
              text={text}
              color={selectedColor}
              fontSize={fontSize}
              duration={duration}
              delay={delay}
              once={true}
              inView={false}
              fontUrl={selectedFontUrl}
            />
          </div>
        </div>

        {/* Right: Controller Sidebar */}
        <div className="lg:col-span-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 space-y-5 shadow-sm">
          <div className="flex items-center gap-1.5 text-zinc-900 dark:text-white border-b border-zinc-150 dark:border-zinc-900 pb-3">
            <SlidersHorizontal size={14} className="text-sky-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Parameters</h3>
          </div>

          {/* Text Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wide text-zinc-500 block">Text Content</label>
            <input
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                triggerReset();
              }}
              placeholder="Signature text"
              className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-900 dark:text-white font-medium focus:outline-none focus:ring-1 focus:ring-sky-500/50"
            />
          </div>

          {/* Font Selector */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wide text-zinc-500 block">Font Style</label>
            <select
              value={activeFontIdx}
              onChange={(e) => {
                setActiveFontIdx(Number(e.target.value));
                triggerReset();
              }}
              className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-900 dark:text-white font-medium focus:outline-none focus:ring-1 focus:ring-sky-500/50"
            >
              {fontPresets.map((font, idx) => (
                <option key={font.name} value={idx}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>

          {/* Color Selector */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wide text-zinc-500 block">Signature Color</label>
            <div className="flex flex-wrap gap-2">
              {colorPresets.map((color, idx) => (
                <button
                  key={color.name}
                  onClick={() => {
                    setActiveColorIdx(idx);
                    triggerReset();
                  }}
                  className={cn(
                    "size-5.5 rounded-full border transition-all duration-200 cursor-pointer relative flex items-center justify-center",
                    activeColorIdx === idx 
                      ? "border-sky-500 scale-110 shadow-sm" 
                      : "border-zinc-200 dark:border-zinc-850 hover:scale-105"
                  )}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {activeColorIdx === idx && (
                    <span className={cn(
                      "size-1.5 rounded-full",
                      color.value === "#ffffff" ? "bg-black" : "bg-white"
                    )} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wide text-zinc-500">
              <span>Font Size</span>
              <span className="font-mono text-zinc-900 dark:text-zinc-300">{fontSize}px</span>
            </div>
            <input
              type="range"
              min={24}
              max={72}
              step={1}
              value={fontSize}
              onChange={(e) => {
                setFontSize(Number(e.target.value));
                triggerReset();
              }}
              className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>

          {/* Duration Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wide text-zinc-500">
              <span>Draw Duration</span>
              <span className="font-mono text-zinc-900 dark:text-zinc-300">{duration}s</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={4}
              step={0.1}
              value={duration}
              onChange={(e) => {
                setDuration(Number(e.target.value));
                triggerReset();
              }}
              className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>

          {/* Stagger Delay Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wide text-zinc-500">
              <span>Start Delay</span>
              <span className="font-mono text-zinc-900 dark:text-zinc-300">{delay}s</span>
            </div>
            <input
              type="range"
              min={0}
              max={1.5}
              step={0.05}
              value={delay}
              onChange={(e) => {
                setDelay(Number(e.target.value));
                triggerReset();
              }}
              className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
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
            <span className="whitespace-nowrap">pnpm dlx shadcn@latest add @oxygen-ui/signature</span>
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
          <div className="text-left flex justify-between items-start">
            <div>
              <h3 className="text-xs font-bold mb-1">Usage Snippet</h3>
              <p className="text-[11px] text-muted-foreground mb-4">Copy the JSX component import code.</p>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 text-[10px] font-semibold text-sky-500 hover:text-sky-600 transition-colors border border-sky-500/25 px-2.5 py-1 rounded-lg cursor-pointer bg-sky-500/5 hover:bg-sky-500/10"
            >
              {copiedCode ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} />}
              {copiedCode ? "Copied" : "Copy JSX"}
            </button>
          </div>
          
          <div className="relative bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 font-mono text-[10px] text-zinc-750 dark:text-zinc-350 w-full overflow-y-auto max-h-[90px]">
            <pre className="whitespace-pre">{codeExample}</pre>
          </div>
        </div>

      </div>

    </div>
  );
}

export default SignatureDemo;
