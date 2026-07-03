"use client";

import React, { useState, useEffect } from "react";
import { Calligraph } from "calligraph";
import { cn } from "@/lib/utils";
import { Copy, Check, SlidersHorizontal, RefreshCw, Sparkles, BookOpen, Layers, Info, CheckCircle2, XCircle } from "lucide-react";

export function CalligraphDemo() {
  // Demo interactive states
  const [variant, setVariant] = useState<"text" | "number" | "slots">("text");
  const [animation, setAnimation] = useState<"smooth" | "snappy" | "bouncy">("smooth");
  const [textIndex, setTextIndex] = useState(0);
  const [numberVal, setNumberVal] = useState(1248);
  const [stagger, setStagger] = useState(0.02);
  const [trend, setTrend] = useState<1 | -1 | 0>(0);
  const [driftX, setDriftX] = useState(15);
  const [driftY, setDriftY] = useState(0);

  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const textWords = [
    "Calligraph animates text",
    "Fluid transitions powered by Motion",
    "Shared characters slide smoothly",
    "Elegant design-engineered interfaces"
  ];

  // Rotate text automatically or manually
  const triggerNextText = () => {
    setTextIndex((prev) => (prev + 1) % textWords.length);
  };

  const handleRandomizeNumber = () => {
    setNumberVal(Math.floor(Math.random() * 9000) + 1000);
  };

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("npm install calligraph");
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const codeExample = `import { Calligraph } from "calligraph";

export default function TextMorph() {
  return (
    <Calligraph
      variant="${variant}"
      animation="${animation}"
      stagger={${stagger}}
      trend={${trend}}
      drift={{ x: ${driftX}, y: ${driftY} }}
    >
      {${variant === "text" ? `"${textWords[textIndex]}"` : numberVal}}
    </Calligraph>
  );
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeExample);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Comparisons matrix details
  const comparisonData = {
    animation: [
      { feature: "Text", calligraph: true, torph: true, numberflow: false, numerictext: false },
      { feature: "Number", calligraph: true, torph: true, numberflow: true, numerictext: true },
      { feature: "Slots", calligraph: true, torph: true, numberflow: false, numerictext: false },
      { feature: "Springs", calligraph: true, torph: true, numberflow: true, numerictext: true },
      { feature: "Stagger", calligraph: true, torph: true, numberflow: false, numerictext: false },
      { feature: "Auto-size", calligraph: true, torph: true, numberflow: true, numerictext: true },
      { feature: "Trend direction", calligraph: true, torph: true, numberflow: true, numerictext: false }
    ],
    formatting: [
      { feature: "Intl.NumberFormat", calligraph: false, torph: false, numberflow: true, numerictext: true },
      { feature: "Plugins", calligraph: false, torph: false, numberflow: false, numerictext: false }
    ],
    architecture: [
      { feature: "Dependencies", calligraph: "Motion", torph: "None", numberflow: "React", numerictext: "None" },
      { feature: "React Support", calligraph: true, torph: true, numberflow: true, numerictext: true },
      { feature: "Vue Support", calligraph: false, torph: true, numberflow: true, numerictext: false },
      { feature: "Svelte Support", calligraph: false, torph: true, numberflow: true, numerictext: false },
      { feature: "Angular Support", calligraph: false, torph: true, numberflow: false, numerictext: false },
      { feature: "TypeScript ready", calligraph: true, torph: true, numberflow: true, numerictext: true },
      { feature: "SSR compatible", calligraph: true, torph: true, numberflow: true, numerictext: true }
    ],
    accessibility: [
      { feature: "Reduced motion", calligraph: true, torph: true, numberflow: true, numerictext: true },
      { feature: "Screen reader friendly", calligraph: true, torph: true, numberflow: true, numerictext: true }
    ]
  };

  const renderVal = (val: boolean | string) => {
    if (typeof val === "boolean") {
      return val ? (
        <CheckCircle2 className="size-4 text-emerald-500 mx-auto" />
      ) : (
        <XCircle className="size-4 text-zinc-300 dark:text-zinc-800 mx-auto opacity-30" />
      );
    }
    return <span className="text-xs font-mono font-semibold text-blue-500">{val}</span>;
  };

  return (
    <div className="flex flex-col gap-10 w-full max-w-6xl mx-auto p-4 md:p-8 select-none text-foreground bg-background">
      
      {/* Header Panel */}
      <div className="flex flex-col gap-2 text-left">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-black tracking-tight font-decorative">Calligraph</h2>
          <span className="text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 py-0.5 px-2 rounded">v1.4.1</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
          Fluid, character-morphing text and number transitions powered by Motion. Animate headings, metrics, and slots naturally as content changes.
        </p>
      </div>

      {/* Main Interactive Demo Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Interactive Play Canvas */}
        <div className="lg:col-span-2 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 p-8 flex flex-col justify-between min-h-[380px] relative overflow-hidden shadow-sm">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          
          <div className="flex justify-between items-center relative z-20">
            <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">Interactive Canvas</span>
            <div className="flex gap-2">
              {variant === "text" ? (
                <button
                  onClick={triggerNextText}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
                >
                  <Sparkles size={12} />
                  <span>Morph Text</span>
                </button>
              ) : (
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setNumberVal(prev => prev - 123)}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                  >
                    -123
                  </button>
                  <button
                    onClick={() => setNumberVal(prev => prev + 123)}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                  >
                    +123
                  </button>
                  <button
                    onClick={handleRandomizeNumber}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    <span>Randomize</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Morph Center Area */}
          <div className="flex-1 flex items-center justify-center p-6 min-h-[160px]">
            <div className="text-center font-decorative text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white transition-all duration-300">
              {variant === "text" ? (
                <Calligraph
                  variant="text"
                  animation={animation}
                  stagger={stagger}
                  trend={trend}
                  drift={{ x: driftX, y: driftY }}
                >
                  {textWords[textIndex]}
                </Calligraph>
              ) : variant === "number" ? (
                <Calligraph
                  key="calligraph-number"
                  variant="number"
                  animation={animation}
                  stagger={stagger}
                  trend={trend}
                >
                  {numberVal}
                </Calligraph>
              ) : (
                <Calligraph
                  key="calligraph-slots"
                  variant="slots"
                  animation={animation}
                  stagger={stagger}
                  trend={trend}
                >
                  {numberVal}
                </Calligraph>
              )}
            </div>
          </div>

          <div className="text-[11px] text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-900/60 py-1.5 px-3.5 rounded-full self-center flex items-center gap-1.5 relative z-20">
            <Info size={11} className="text-blue-500" />
            <span>Fluid sliding animation swaps shared letters dynamically</span>
          </div>
        </div>

        {/* Dashboard Settings */}
        <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal size={16} className="text-blue-500" />
            <h3 className="text-base font-bold">Customization</h3>
          </div>

          <div className="flex-1 space-y-4 text-left">
            {/* Variant */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-550 dark:text-zinc-400">Variant Mode</label>
              <div className="grid grid-cols-3 gap-1.5">
                {(["text", "number", "slots"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={cn(
                      "text-[10px] font-bold py-2 px-1 rounded-lg border capitalize transition-all cursor-pointer",
                      variant === v
                        ? "bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-100"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-muted-foreground"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Animation Spring Preset */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-550 dark:text-zinc-400">Spring Physics</label>
              <div className="grid grid-cols-3 gap-1.5">
                {(["smooth", "snappy", "bouncy"] as const).map((anim) => (
                  <button
                    key={anim}
                    onClick={() => setAnimation(anim)}
                    className={cn(
                      "text-[10px] font-bold py-2 px-1 rounded-lg border capitalize transition-all cursor-pointer",
                      animation === anim
                        ? "bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-100"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-muted-foreground"
                    )}
                  >
                    {anim}
                  </button>
                ))}
              </div>
            </div>

            {/* Stagger Delay */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-zinc-550 dark:text-zinc-400">Stagger Delay</span>
                <span className="font-mono text-blue-500">{stagger}s</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.1"
                step="0.01"
                value={stagger}
                onChange={(e) => setStagger(Number(e.target.value))}
                className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Trend Direction */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-550 dark:text-zinc-400">Trend Direction</label>
              <div className="grid grid-cols-3 gap-1.5">
                {([-1, 0, 1] as const).map((tr) => (
                  <button
                    key={tr}
                    onClick={() => setTrend(tr)}
                    className={cn(
                      "text-[10px] font-bold py-2 px-1 rounded-lg border transition-all cursor-pointer",
                      trend === tr
                        ? "bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-100"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-muted-foreground"
                    )}
                  >
                    {tr === 1 ? "Upwards" : tr === -1 ? "Downwards" : "Neutral"}
                  </button>
                ))}
              </div>
            </div>

            {/* Drift X / Y (Only Text Variant) */}
            {variant === "text" && (
              <>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-zinc-550 dark:text-zinc-400">Drift X</span>
                    <span className="font-mono text-blue-500">{driftX}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={driftX}
                    onChange={(e) => setDriftX(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-zinc-550 dark:text-zinc-400">Drift Y</span>
                    <span className="font-mono text-blue-500">{driftY}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={driftY}
                    onChange={(e) => setDriftY(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              </>
            )}

          </div>
        </div>

      </div>

      {/* Code Snippets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Package CLI */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-6 flex flex-col justify-between shadow-sm">
          <div className="text-left">
            <h3 className="text-sm font-bold mb-1">Package Installation</h3>
            <p className="text-xs text-muted-foreground mb-4">Install Calligraph package via npm or yarn.</p>
          </div>
          
          <div className="relative flex items-center justify-between bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-mono text-xs text-zinc-700 dark:text-zinc-300 w-full overflow-x-auto select-all">
            <span className="whitespace-nowrap">npm install calligraph</span>
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
            <p className="text-xs text-muted-foreground mb-4">Morph dynamic content seamlessly inside your React elements.</p>
          </div>

          <div className="relative w-full">
            <button
              onClick={handleCopyCode}
              className="absolute top-2 right-2 p-1.5 z-10 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {copiedCode ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
            </button>
            <pre className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 font-mono text-[10px] text-zinc-750 dark:text-zinc-350 overflow-x-auto max-h-[140px] text-left">
              <code>{codeExample}</code>
            </pre>
          </div>
        </div>

      </div>

      {/* Comparisons Section */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-10 mt-6 text-left">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-blue-500" />
            <h3 className="text-xl font-bold">Library Comparisons</h3>
          </div>
          <p className="text-sm text-muted-foreground max-w-3xl">
            Four libraries that animate text and numbers on the web, each with a different philosophy. Interact with each library side-by-side and see exactly where they overlap and where they diverge.
          </p>
        </div>

        {/* Matrix Comparison Table */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/20 overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-400 w-1/4">Feature</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white text-center w-1/5 bg-blue-50/20 dark:bg-blue-950/5">Calligraph</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-550 dark:text-zinc-350 text-center w-1/5">Torph</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-550 dark:text-zinc-350 text-center w-1/5">NumberFlow</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-550 dark:text-zinc-350 text-center w-1/5">NumericText</th>
              </tr>
            </thead>
            <tbody>
              
              {/* Category: Animation */}
              <tr className="bg-zinc-50/20 dark:bg-zinc-900/10 border-b border-zinc-200 dark:border-zinc-800">
                <td colSpan={5} className="p-3 text-[10px] font-bold tracking-widest text-blue-500 uppercase">Animation</td>
              </tr>
              {comparisonData.animation.map((row) => (
                <tr key={row.feature} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors">
                  <td className="p-4 text-sm font-medium text-zinc-800 dark:text-zinc-200 pl-6">{row.feature}</td>
                  <td className="p-4 text-center bg-blue-50/20 dark:bg-blue-950/5">{renderVal(row.calligraph)}</td>
                  <td className="p-4 text-center">{renderVal(row.torph)}</td>
                  <td className="p-4 text-center">{renderVal(row.numberflow)}</td>
                  <td className="p-4 text-center">{renderVal(row.numerictext)}</td>
                </tr>
              ))}

              {/* Category: Formatting */}
              <tr className="bg-zinc-50/20 dark:bg-zinc-900/10 border-b border-zinc-200 dark:border-zinc-800">
                <td colSpan={5} className="p-3 text-[10px] font-bold tracking-widest text-blue-500 uppercase">Formatting</td>
              </tr>
              {comparisonData.formatting.map((row) => (
                <tr key={row.feature} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors">
                  <td className="p-4 text-sm font-medium text-zinc-800 dark:text-zinc-200 pl-6">{row.feature}</td>
                  <td className="p-4 text-center bg-blue-50/20 dark:bg-blue-950/5">{renderVal(row.calligraph)}</td>
                  <td className="p-4 text-center">{renderVal(row.torph)}</td>
                  <td className="p-4 text-center">{renderVal(row.numberflow)}</td>
                  <td className="p-4 text-center">{renderVal(row.numerictext)}</td>
                </tr>
              ))}

              {/* Category: Architecture */}
              <tr className="bg-zinc-50/20 dark:bg-zinc-900/10 border-b border-zinc-200 dark:border-zinc-800">
                <td colSpan={5} className="p-3 text-[10px] font-bold tracking-widest text-blue-500 uppercase">Architecture</td>
              </tr>
              {comparisonData.architecture.map((row) => (
                <tr key={row.feature} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors">
                  <td className="p-4 text-sm font-medium text-zinc-800 dark:text-zinc-200 pl-6">{row.feature}</td>
                  <td className="p-4 text-center bg-blue-50/20 dark:bg-blue-950/5">{renderVal(row.calligraph)}</td>
                  <td className="p-4 text-center">{renderVal(row.torph)}</td>
                  <td className="p-4 text-center">{renderVal(row.numberflow)}</td>
                  <td className="p-4 text-center">{renderVal(row.numerictext)}</td>
                </tr>
              ))}

              {/* Category: Accessibility */}
              <tr className="bg-zinc-50/20 dark:bg-zinc-900/10 border-b border-zinc-200 dark:border-zinc-800">
                <td colSpan={5} className="p-3 text-[10px] font-bold tracking-widest text-blue-500 uppercase">Accessibility</td>
              </tr>
              {comparisonData.accessibility.map((row) => (
                <tr key={row.feature} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors">
                  <td className="p-4 text-sm font-medium text-zinc-800 dark:text-zinc-200 pl-6">{row.feature}</td>
                  <td className="p-4 text-center bg-blue-50/20 dark:bg-blue-950/5">{renderVal(row.calligraph)}</td>
                  <td className="p-4 text-center">{renderVal(row.torph)}</td>
                  <td className="p-4 text-center">{renderVal(row.numberflow)}</td>
                  <td className="p-4 text-center">{renderVal(row.numerictext)}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
