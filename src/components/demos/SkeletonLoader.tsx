"use client";

import React, { useState } from "react";
import { Sparkles, Calendar, Heart } from "lucide-react";

export default function SkeletonLoader() {
  const [state, setState] = useState<"loading" | "ready">("loading");
  const [isResetting, setIsResetting] = useState(false);

  const handleToggle = () => {
    if (state === "loading") {
      setState("ready");
    } else {
      // Replay loading state instantly without transition
      setIsResetting(true);
      setState("loading");
      // Force reflow and remove resetting
      setTimeout(() => {
        setIsResetting(false);
      }, 50);
    }
  };

  const isRevealed = state === "ready";

  return (
    <div className="w-full max-w-[360px] mx-auto p-6 bg-[#0d0e12] rounded-3xl border border-white/5 flex flex-col gap-5 text-white shadow-2xl select-none">
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider">Transitions.dev</span>
        <h3 className="text-lg font-bold text-white tracking-tight">Skeleton Loader Reveal</h3>
      </div>

      {/* The main wrapper displaying skeleton ↔ content */}
      <div className="min-h-[160px] bg-neutral-950/60 rounded-2xl border border-white/5 relative overflow-hidden p-6">
        <div 
          className={`t-skel w-full h-full ${isRevealed ? "is-revealed" : ""} ${isResetting ? "is-resetting" : ""}`}
        >
          {/* Skeleton Pulse Layer */}
          <div className="t-skel-skeleton is-pulsing flex flex-col gap-3.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10" />
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="h-4 bg-white/10 rounded-md w-28" />
                <div className="h-3 bg-white/10 rounded-md w-16" />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="h-3 bg-white/10 rounded-md w-full" />
              <div className="h-3 bg-white/10 rounded-md w-5/6" />
            </div>
          </div>

          {/* Real Content Layer */}
          <div className="t-skel-content flex flex-col gap-3.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="flex flex-col flex-1">
                <h4 className="text-sm font-bold text-white">Visual Design Tokens</h4>
                <span className="text-[11px] text-neutral-500 font-semibold flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3 h-3" />
                  Updated 2m ago
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mt-1">
              <p className="text-xs text-neutral-400 font-medium leading-relaxed">
                Re-engineered interface layout systems mapping tokens to HSL colors for maximum UI control.
              </p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-2 py-0.5 rounded-full">
                  Engineering
                </span>
                <span className="text-xs font-semibold text-neutral-500 flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                  <Heart className="w-3.5 h-3.5" />
                  124
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleToggle}
        className="w-full h-10 bg-neutral-900 border border-white/10 hover:bg-neutral-800 active:scale-[0.98] transition-all rounded-xl text-xs font-bold tracking-tight cursor-pointer"
      >
        {isRevealed ? "Reset to Loading" : "Simulate Data Load"}
      </button>
    </div>
  );
}
