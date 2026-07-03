"use client";

import React, { forwardRef, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "../oxygen-ui/AnimatedBeam";
import { Copy, Check, SlidersHorizontal, RefreshCw, Play, VolumeX, Volume2, ShieldAlert } from "lucide-react";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-20 flex size-12 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-3 shadow-md hover:scale-110 transition-transform duration-300 relative group cursor-pointer",
        className
      )}
    >
      <div className="absolute inset-0 rounded-full bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-300" />
      {children}
    </div>
  );
});
Circle.displayName = "Circle";

export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  // Configuration state
  const [preset, setPreset] = useState<"neon" | "cyberpunk" | "gold" | "emerald" | "sunset">("neon");
  const [curvature, setCurvature] = useState<number>(75);
  const [duration, setDuration] = useState<number>(4.5);
  const [delay, setDelay] = useState<number>(0);
  const [reverse, setReverse] = useState<boolean>(false);
  const [pathWidth, setPathWidth] = useState<number>(2.5);
  const [pathOpacity, setPathOpacity] = useState<number>(0.15);

  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Preset variables mapping
  const presetConfig = {
    neon: {
      startColor: "#3b82f6",
      stopColor: "#8b5cf6",
      pathColor: "#e4e4e7",
      darkPathColor: "#27272a"
    },
    cyberpunk: {
      startColor: "#ff007f",
      stopColor: "#00f0ff",
      pathColor: "#f43f5e",
      darkPathColor: "#3f1a26"
    },
    gold: {
      startColor: "#eab308",
      stopColor: "#f97316",
      pathColor: "#fef08a",
      darkPathColor: "#453215"
    },
    emerald: {
      startColor: "#10b981",
      stopColor: "#06b6d4",
      pathColor: "#a7f3d0",
      darkPathColor: "#14352b"
    },
    sunset: {
      startColor: "#f43f5e",
      stopColor: "#fb923c",
      pathColor: "#fecdd3",
      darkPathColor: "#4c1a23"
    }
  };

  const currentPreset = presetConfig[preset];

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("pnpm dlx shadcn@latest add @oxygen-ui/animated-beam");
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(manualCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleReset = () => {
    setPreset("neon");
    setCurvature(75);
    setDuration(4.5);
    setDelay(0);
    setReverse(false);
    setPathWidth(2.5);
    setPathOpacity(0.15);
  };

  const manualCode = `import { useRef } from "react";
import { AnimatedBeam } from "@/src/components/oxygen-ui/AnimatedBeam";

export function IntegrationDemo() {
  const containerRef = useRef(null);
  const fromRef = useRef(null);
  const toRef = useRef(null);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center p-10">
      <div ref={fromRef} className="z-10 p-3 rounded-full bg-white border">Source</div>
      <div ref={toRef} className="z-10 p-3 rounded-full bg-white border">Destination</div>
      
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fromRef}
        toRef={toRef}
        curvature={${curvature}}
        duration={${duration}}
        delay={${delay}}
        reverse={${reverse ? "true" : "false"}}
        pathWidth={${pathWidth}}
        pathOpacity={${pathOpacity}}
        gradientStartColor="${currentPreset.startColor}"
        gradientStopColor="${currentPreset.stopColor}"
      />
    </div>
  );
}`;

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto p-4 md:p-8 select-none text-foreground bg-background">
      {/* Header Info */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black tracking-tight font-decorative">Animated Beam</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          An animated beam of light traveling along a dynamic curved path between elements. Perfect for integration pages, pipeline visualizers, and data flows.
        </p>
      </div>

      {/* Main Interactive Playground Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Visual Preview Area (Takes 2 columns) */}
        <div className="lg:col-span-2 rounded-[2rem] border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/10 p-6 flex flex-col justify-between relative min-h-[450px] overflow-hidden shadow-sm">
          {/* Subtle Grid Backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          
          <div className="flex justify-between items-center relative z-20">
            <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Interactive Preview</span>
            <div className="flex gap-2">
              <button 
                onClick={handleReset} 
                className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-850 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-450 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                title="Reset controls"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          {/* Interactive Integration Area */}
          <div 
            ref={containerRef}
            className="relative flex h-[350px] w-full items-center justify-center overflow-hidden"
          >
            <div className="flex size-full max-h-[260px] max-w-lg flex-col items-stretch justify-between gap-6 relative">
              
              {/* Row 1 */}
              <div className="flex flex-row items-center justify-between">
                <Circle ref={div1Ref}>
                  <Icons.googleDrive className="size-full" />
                </Circle>
                <Circle ref={div5Ref}>
                  <Icons.googleDocs className="size-full" />
                </Circle>
              </div>

              {/* Row 2 */}
              <div className="flex flex-row items-center justify-between">
                <Circle ref={div2Ref}>
                  <Icons.notion className="size-full" />
                </Circle>
                {/* Central Hub Node */}
                <Circle ref={div4Ref} className="size-20 border-2 border-blue-500/30 bg-zinc-50 dark:bg-zinc-900 shadow-lg relative group">
                  <div className="absolute inset-0 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300 animate-pulse" />
                  <Icons.openai className="size-10 fill-foreground stroke-foreground text-foreground relative z-10" />
                </Circle>
                <Circle ref={div6Ref}>
                  <Icons.zapier className="size-full" />
                </Circle>
              </div>

              {/* Row 3 */}
              <div className="flex flex-row items-center justify-between">
                <Circle ref={div3Ref}>
                  <Icons.whatsapp className="size-full" />
                </Circle>
                <Circle ref={div7Ref}>
                  <Icons.messenger className="size-full" />
                </Circle>
              </div>

            </div>

            {/* Left side connections (inputs) -> Central Hub */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div1Ref}
              toRef={div4Ref}
              curvature={-curvature}
              duration={duration}
              delay={delay}
              reverse={reverse}
              pathWidth={pathWidth}
              pathOpacity={pathOpacity}
              gradientStartColor={currentPreset.startColor}
              gradientStopColor={currentPreset.stopColor}
              pathColor={currentPreset.darkPathColor}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div2Ref}
              toRef={div4Ref}
              curvature={0}
              duration={duration}
              delay={delay + 0.5}
              reverse={reverse}
              pathWidth={pathWidth}
              pathOpacity={pathOpacity}
              gradientStartColor={currentPreset.startColor}
              gradientStopColor={currentPreset.stopColor}
              pathColor={currentPreset.darkPathColor}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div3Ref}
              toRef={div4Ref}
              curvature={curvature}
              duration={duration}
              delay={delay + 1.0}
              reverse={reverse}
              pathWidth={pathWidth}
              pathOpacity={pathOpacity}
              gradientStartColor={currentPreset.startColor}
              gradientStopColor={currentPreset.stopColor}
              pathColor={currentPreset.darkPathColor}
            />

            {/* Right side connections (outputs) -> Central Hub (using reverse to make it look outgoing) */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div5Ref}
              toRef={div4Ref}
              curvature={-curvature}
              duration={duration}
              delay={delay + 0.2}
              reverse={!reverse}
              pathWidth={pathWidth}
              pathOpacity={pathOpacity}
              gradientStartColor={currentPreset.startColor}
              gradientStopColor={currentPreset.stopColor}
              pathColor={currentPreset.darkPathColor}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div6Ref}
              toRef={div4Ref}
              curvature={0}
              duration={duration}
              delay={delay + 0.7}
              reverse={!reverse}
              pathWidth={pathWidth}
              pathOpacity={pathOpacity}
              gradientStartColor={currentPreset.startColor}
              gradientStopColor={currentPreset.stopColor}
              pathColor={currentPreset.darkPathColor}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div7Ref}
              toRef={div4Ref}
              curvature={curvature}
              duration={duration}
              delay={delay + 1.2}
              reverse={!reverse}
              pathWidth={pathWidth}
              pathOpacity={pathOpacity}
              gradientStartColor={currentPreset.startColor}
              gradientStopColor={currentPreset.stopColor}
              pathColor={currentPreset.darkPathColor}
            />
          </div>

          <div className="text-[11px] text-zinc-400 flex items-center justify-center gap-1.5 mt-2 bg-zinc-100 dark:bg-zinc-900/60 py-1.5 px-3 rounded-full self-center">
            <span>💡 Hover over nodes to scale them</span>
          </div>
        </div>

        {/* Customization Dashboard Control Panel (Takes 1 column) */}
        <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 flex flex-col justify-between shadow-sm min-h-[450px]">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal size={16} className="text-blue-500" />
            <h3 className="text-base font-bold">Control Panel</h3>
          </div>

          <div className="flex-1 space-y-5">
            {/* Presets */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-550 dark:text-zinc-400">Design Preset</label>
              <div className="grid grid-cols-5 gap-1.5">
                {(["neon", "cyberpunk", "gold", "emerald", "sunset"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPreset(p)}
                    className={cn(
                      "text-[9px] font-bold py-1.5 px-1 rounded-lg border capitalize transition-all",
                      preset === p
                        ? "bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-100"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-muted-foreground"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Curvature */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-zinc-550 dark:text-zinc-400">Curvature</span>
                <span className="font-mono text-blue-500">{curvature}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="150"
                value={curvature}
                onChange={(e) => setCurvature(Number(e.target.value))}
                className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Duration */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-zinc-550 dark:text-zinc-400">Sweep Speed</span>
                <span className="font-mono text-blue-500">{duration}s</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="10"
                step="0.5"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Path Width */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-zinc-550 dark:text-zinc-400">Path Width</span>
                <span className="font-mono text-blue-500">{pathWidth}px</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                step="0.5"
                value={pathWidth}
                onChange={(e) => setPathWidth(Number(e.target.value))}
                className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Path Opacity */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-zinc-550 dark:text-zinc-400">Path Opacity</span>
                <span className="font-mono text-blue-500">{pathOpacity * 100}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.5"
                step="0.05"
                value={pathOpacity}
                onChange={(e) => setPathOpacity(Number(e.target.value))}
                className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Reverse Checkbox */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-900">
              <label className="text-xs font-semibold text-zinc-550 dark:text-zinc-400 cursor-pointer" htmlFor="reverse-chk">
                Reverse Flow Direction
              </label>
              <input
                type="checkbox"
                id="reverse-chk"
                checked={reverse}
                onChange={(e) => setReverse(e.target.checked)}
                className="size-4 rounded border-zinc-300 text-blue-500 focus:ring-blue-500 bg-background accent-blue-500 cursor-pointer"
              />
            </div>

          </div>
        </div>

      </div>

      {/* Code Installation Guides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        
        {/* CLI Installation */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-6 flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="text-sm font-bold mb-1">Installation via CLI</h3>
            <p className="text-xs text-muted-foreground mb-4">Add the component directly to your project using CLI.</p>
          </div>
          
          <div className="relative flex items-center justify-between bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-mono text-xs text-zinc-700 dark:text-zinc-300 w-full overflow-x-auto select-all">
            <span className="whitespace-nowrap">pnpm dlx shadcn@latest add @oxygen-ui/animated-beam</span>
            <button
              onClick={handleCopyInstall}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-muted-foreground hover:text-foreground transition-colors ml-2"
            >
              {copiedInstall ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
            </button>
          </div>
        </div>

        {/* Manual Copy Code */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-6 flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="text-sm font-bold mb-1">React Code Usage</h3>
            <p className="text-xs text-muted-foreground mb-4">Integrate the code directly into your custom page component.</p>
          </div>

          <div className="relative w-full">
            <button
              onClick={handleCopyCode}
              className="absolute top-2 right-2 p-1.5 z-10 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-muted-foreground hover:text-foreground transition-colors"
            >
              {copiedCode ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
            </button>
            <pre className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 font-mono text-[10px] text-zinc-750 dark:text-zinc-350 overflow-x-auto max-h-[140px] text-left">
              <code>{manualCode}</code>
            </pre>
          </div>
        </div>

      </div>

    </div>
  );
}

// Icons dictionary as static SVG functions
export const Icons = {
  notion: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z"
        fill="#ffffff"
      />
      <path
        d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z"
        fill="#000000"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  ),
  openai: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),
  googleDrive: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 87.3 78"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
        fill="#0066da"
      />
      <path
        d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
        fill="#00ac47"
      />
      <path
        d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
        fill="#ea4335"
      />
      <path
        d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
        fill="#00832d"
      />
      <path
        d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
        fill="#2684fc"
      />
      <path
        d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
        fill="#ffba00"
      />
    </svg>
  ),
  whatsapp: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 175.216 175.552"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient
          id="w-gradient"
          x1="85.915"
          x2="86.535"
          y1="32.567"
          y2="137.092"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#57d163" />
          <stop offset="1" stopColor="#23b33a" />
        </linearGradient>
      </defs>
      <path
        d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0"
        fill="#b3b3b3"
      />
      <path
        d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"
        fill="#ffffff"
      />
      <path
        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z"
        fill="url(#w-gradient)"
      />
      <path
        d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
        fill="#ffffff"
        fillRule="evenodd"
      />
    </svg>
  ),
  googleDocs: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 47 65"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <path
          d="M29.375,0 L4.40625,0 C1.9828125,0 0,1.99431818 0,4.43181818 L0,60.5681818 C0,63.0056818 1.9828125,65 4.40625,65 L42.59375,65 C45.0171875,65 47,63.0056818 47,60.5681818 L47,17.7272727 L29.375,0 Z"
          id="gdoc-path-1"
        />
        <linearGradient
          x1="50.0053945%"
          y1="8.58610612%"
          x2="50.0053945%"
          y2="100.013939%"
          id="gdoc-linear"
        >
          <stop stopColor="#1A237E" stopOpacity="0.2" offset="0%" />
          <stop stopColor="#1A237E" stopOpacity="0.02" offset="100%" />
        </linearGradient>
      </defs>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path
          d="M29.375,0 L4.40625,0 C1.9828125,0 0,1.99431818 0,4.43181818 L0,60.5681818 C0,63.0056818 1.9828125,65 4.40625,65 L42.59375,65 C45.0171875,65 47,63.0056818 47,60.5681818 L47,17.7272727 L36.71875,10.3409091 L29.375,0 Z"
          fill="#4285F4"
        />
        <polygon
          fill="url(#gdoc-linear)"
          points="30.6638281 16.4309659 47 32.8582386 47 17.7272727"
        />
        <path
          d="M11.75,47.2727273 L35.25,47.2727273 L35.25,44.3181818 L11.75,44.3181818 L11.75,47.2727273 Z M11.75,53.1818182 L29.375,53.1818182 L29.375,50.2272727 L11.75,50.2272727 L11.75,53.1818182 Z M11.75,32.5 L11.75,35.4545455 L35.25,35.4545455 L35.25,32.5 L11.75,32.5 Z M11.75,41.3636364 L35.25,41.3636364 L35.25,38.4090909 L11.75,38.4090909 L11.75,41.3636364 Z"
          fill="#F1F1F1"
        />
        <path
          d="M29.375,0 L29.375,13.2954545 C29.375,15.7440341 31.3467969,17.7272727 33.78125,17.7272727 L47,17.7272727 L29.375,0 Z"
          fill="#A1C2FA"
        />
      </g>
    </svg>
  ),
  zapier: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 244 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M57.1877 45.2253L57.1534 45.1166L78.809 25.2914V15.7391H44.0663V25.2914H64.8181L64.8524 25.3829L43.4084 45.2253V54.7775H79.1579V45.2253H57.1877Z"
        fill="currentColor"
      />
      <path
        d="M100.487 14.8297C96.4797 14.8297 93.2136 15.434 90.6892 16.6429C88.3376 17.6963 86.3568 19.4321 85.0036 21.6249C83.7091 23.8321 82.8962 26.2883 82.6184 28.832L93.1602 30.3135C93.5415 28.0674 94.3042 26.4754 95.4482 25.5373C96.7486 24.5562 98.3511 24.0605 99.9783 24.136C102.118 24.136 103.67 24.7079 104.634 25.8519C105.59 26.9959 106.076 28.5803 106.076 30.6681V31.7091H95.9401C90.7807 31.7091 87.0742 32.8531 84.8206 35.1411C82.5669 37.429 81.442 40.4492 81.4458 44.2014C81.4458 48.0452 82.5707 50.9052 84.8206 52.7813C87.0704 54.6574 89.8999 55.5897 93.3089 55.5783C97.5379 55.5783 100.791 54.1235 103.067 51.214C104.412 49.426 105.372 47.3793 105.887 45.2024H106.27L107.723 54.7546H117.275V30.5651C117.275 25.5659 115.958 21.6936 113.323 18.948C110.688 16.2024 106.409 14.8297 100.487 14.8297ZM103.828 44.6475C102.312 45.9116 100.327 46.5408 97.8562 46.5408C95.8199 46.5408 94.4052 46.1843 93.6121 45.4712C93.2256 45.1338 92.9182 44.7155 92.7116 44.246C92.505 43.7764 92.4043 43.2671 92.4166 42.7543C92.3941 42.2706 92.4702 41.7874 92.6403 41.3341C92.8104 40.8808 93.071 40.4668 93.4062 40.1174C93.7687 39.7774 94.1964 39.5145 94.6633 39.3444C95.1303 39.1743 95.6269 39.1006 96.1231 39.1278H106.093V39.7856C106.113 40.7154 105.919 41.6374 105.527 42.4804C105.134 43.3234 104.553 44.0649 103.828 44.6475Z"
        fill="currentColor"
      />
      <path
        d="M175.035 15.7391H163.75V54.7833H175.035V15.7391Z"
        fill="currentColor"
      />
      <path
        d="M241.666 15.7391C238.478 15.7391 235.965 16.864 234.127 19.1139C232.808 20.7307 231.805 23.1197 231.119 26.2809H230.787L229.311 15.7391H219.673V54.7775H230.959V34.7578C230.959 32.2335 231.55 30.2982 232.732 28.9521C233.914 27.606 236.095 26.933 239.275 26.933H243.559V15.7391H241.666Z"
        fill="currentColor"
      />
      <path
        d="M208.473 17.0147C205.839 15.4474 202.515 14.6657 198.504 14.6695C192.189 14.6695 187.247 16.4675 183.678 20.0634C180.108 23.6593 178.324 28.6166 178.324 34.9352C178.233 38.7553 179.067 42.5407 180.755 45.9689C182.3 49.0238 184.706 51.5592 187.676 53.2618C190.665 54.9892 194.221 55.8548 198.344 55.8586C201.909 55.8586 204.887 55.3095 207.278 54.2113C209.526 53.225 211.483 51.6791 212.964 49.7211C214.373 47.7991 215.42 45.6359 216.052 43.3377L206.329 40.615C205.919 42.1094 205.131 43.4728 204.041 44.5732C202.942 45.6714 201.102 46.2206 198.521 46.2206C195.451 46.2206 193.163 45.3416 191.657 43.5837C190.564 42.3139 189.878 40.5006 189.575 38.1498H216.201C216.31 37.0515 216.367 36.1306 216.367 35.387V32.9561C216.431 29.6903 215.757 26.4522 214.394 23.4839C213.118 20.7799 211.054 18.5248 208.473 17.0147ZM198.178 23.9758C202.754 23.9758 205.348 26.2275 205.962 30.731H189.775C190.032 29.2284 190.655 27.8121 191.588 26.607C193.072 24.8491 195.268 23.972 198.178 23.9758Z"
        fill="currentColor"
      />
      <path
        d="M169.515 0.00366253C168.666 -0.0252113 167.82 0.116874 167.027 0.421484C166.234 0.726094 165.511 1.187 164.899 1.77682C164.297 2.3723 163.824 3.08658 163.512 3.87431C163.2 4.66204 163.055 5.50601 163.086 6.35275C163.056 7.20497 163.201 8.05433 163.514 8.84781C163.826 9.64129 164.299 10.3619 164.902 10.9646C165.505 11.5673 166.226 12.0392 167.02 12.3509C167.814 12.6626 168.663 12.8074 169.515 12.7762C170.362 12.8082 171.206 12.6635 171.994 12.3514C172.782 12.0392 173.496 11.5664 174.091 10.963C174.682 10.3534 175.142 9.63077 175.446 8.83849C175.75 8.04621 175.89 7.20067 175.859 6.35275C175.898 5.50985 175.761 4.66806 175.456 3.88115C175.151 3.09424 174.686 2.37951 174.09 1.78258C173.493 1.18565 172.779 0.719644 171.992 0.414327C171.206 0.109011 170.364 -0.0288946 169.521 0.00938803L169.515 0.00366253Z"
        fill="currentColor"
      />
      <path
        d="M146.201 14.6695C142.357 14.6695 139.268 15.8764 136.935 18.2902C135.207 20.0786 133.939 22.7479 133.131 26.2981H132.771L131.295 15.7563H121.657V66H132.942V45.3054H133.354C133.698 46.6852 134.181 48.0267 134.795 49.3093C135.75 51.3986 137.316 53.1496 139.286 54.3314C141.328 55.446 143.629 56.0005 145.955 55.9387C150.68 55.9387 154.277 54.0988 156.748 50.419C159.219 46.7392 160.455 41.6046 160.455 35.0153C160.455 28.6509 159.259 23.6689 156.869 20.0691C154.478 16.4694 150.922 14.6695 146.201 14.6695ZM147.345 42.9602C146.029 44.8668 143.97 45.8201 141.167 45.8201C140.012 45.8735 138.86 45.6507 137.808 45.1703C136.755 44.6898 135.832 43.9656 135.116 43.0574C133.655 41.2233 132.927 38.7122 132.931 35.5243V34.7807C132.931 31.5432 133.659 29.0646 135.116 27.3448C136.572 25.625 138.59 24.7747 141.167 24.7937C144.02 24.7937 146.092 25.6994 147.385 27.5107C148.678 29.322 149.324 31.8483 149.324 35.0896C149.332 38.4414 148.676 41.065 147.356 42.9602H147.345Z"
        fill="currentColor"
      />
      <path d="M39.0441 45.2253H0V54.789H39.0441V45.2253Z" fill="#FF4F00" />
    </svg>
  ),
  messenger: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <radialGradient
        id="messenger-rad"
        cx="11.087"
        cy="7.022"
        r="47.612"
        gradientTransform="matrix(1 0 0 -1 0 50)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#1292ff"></stop>
        <stop offset=".079" stopColor="#2982ff"></stop>
        <stop offset=".23" stopColor="#4e69ff"></stop>
        <stop offset=".351" stopColor="#6559ff"></stop>
        <stop offset=".428" stopColor="#6d53ff"></stop>
        <stop offset=".754" stopColor="#df47aa"></stop>
        <stop offset=".946" stopColor="#ff6257"></stop>
      </radialGradient>
      <path
        fill="url(#messenger-rad)"
        d="M44,23.5C44,34.27,35.05,43,24,43c-1.651,0-3.25-0.194-4.784-0.564	c-0.465-0.112-0.951-0.069-1.379,0.145L13.46,44.77C12.33,45.335,11,44.513,11,43.249v-4.025c0-0.575-0.257-1.111-0.681-1.499	C6.425,34.165,4,29.11,4,23.5C4,12.73,12.95,4,24,4S44,12.73,44,23.5z"
      />
      <path
        fill="#ffffff"
        d="M34.394,18.501l-5.7,4.22c-0.61,0.46-1.44,0.46-2.04,0.01L22.68,19.74	c-1.68-1.25-4.06-0.82-5.19,0.94l-1.21,1.89l-4.11,6.68c-0.6,0.94,0.55,2.01,1.44,1.34l5.7-4.22c0.61-0.46,1.44-0.46,2.04-0.01	l3.974,2.991c1.68,1.25,4.06,0.82,5.19-0.94l1.21-1.89l4.11-6.68C36.434,18.901,35.284,17.831,34.394,18.501z"
      />
    </svg>
  ),
};
