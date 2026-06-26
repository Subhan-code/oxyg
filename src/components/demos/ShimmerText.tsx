"use client";

import React, { useState } from "react";

export default function ShimmerText() {
  const [text, setText] = useState("Planning next moves...");

  return (
    <div className="w-full max-w-[360px] mx-auto p-6 bg-[#0d0e12] rounded-3xl border border-white/5 flex flex-col gap-4 text-white shadow-2xl select-none">
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider">Transitions.dev</span>
        <h3 className="text-lg font-bold text-white tracking-tight">Pure CSS Shimmer Text</h3>
      </div>

      <div className="flex items-center justify-center min-h-[80px] bg-neutral-950/60 rounded-2xl border border-white/5 p-4">
        <span 
          className="t-shimmer text-xl font-bold tracking-tight text-center" 
          data-text={text}
        >
          {text}
        </span>
      </div>

      {/* Input to change text dynamically */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Customize text</label>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          className="h-10 px-3 bg-neutral-900/60 border border-white/10 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>
    </div>
  );
}
