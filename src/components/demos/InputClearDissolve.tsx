"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Search } from "lucide-react";

export default function InputClearDissolve() {
  const [value, setValue] = useState("Exploring fluid design patterns");
  const [isClearing, setIsClearing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    if (isClearing || !value) return;
    setIsClearing(true);

    const mirror = mirrorRef.current;
    const glow = glowRef.current;
    if (!mirror || !glow) {
      setValue("");
      setIsClearing(false);
      return;
    }

    // Split text into words to measure and stagger
    const words = value.split(/(\s+)/);
    mirror.innerHTML = "";

    // Build span wrappers for each word to control their individual positions
    const wordSpans = words.map((word) => {
      const span = document.createElement("span");
      span.textContent = word;
      span.style.display = "inline-block";
      span.style.transition = "none";
      span.style.transformStyle = "preserve-3d";
      mirror.appendChild(span);
      return { span, text: word };
    });

    const startTime = performance.now();
    const duration = 800; // ms

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Animate each word span with delay/stagger
      wordSpans.forEach(({ span }, idx) => {
        const delay = idx * 25; // 25ms delay per word segment
        const segmentProgress = Math.max(0, Math.min(1, (elapsed - delay) / 400));
        
        if (segmentProgress > 0) {
          // Fly up and fade out
          const translateY = -16 * segmentProgress;
          const opacity = 1 - segmentProgress;
          const blur = segmentProgress * 2;
          span.style.transform = `translate3d(0, ${translateY}px, 0)`;
          span.style.opacity = opacity.toString();
          span.style.filter = `blur(${blur}px)`;
        }
      });

      // Write glow radial gradients for dissolving streaks
      const glowOpacity = Math.sin(progress * Math.PI) * 0.7; // Peak in middle
      glow.style.opacity = glowOpacity.toString();

      const gradients: string[] = [];
      wordSpans.forEach(({ span, text }, idx) => {
        if (text.trim().length === 0) return;
        const rect = span.getBoundingClientRect();
        const containerRect = containerRef.current!.getBoundingClientRect();
        
        const x = rect.left - containerRect.left + rect.width / 2;
        const delay = idx * 25;
        const segmentProgress = Math.max(0, Math.min(1, (elapsed - delay) / 400));
        
        // Dissolve streak moves from bottom to top
        const y = containerRect.height - (containerRect.height * segmentProgress);
        gradients.push(`radial-gradient(circle 24px at ${x}px ${y}px, rgba(110, 110, 110, 0.45) 0%, transparent 100%)`);
      });
      
      glow.style.background = gradients.join(", ");

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValue("");
        setIsClearing(false);
        glow.style.opacity = "0";
        glow.style.background = "none";
        if (inputRef.current) inputRef.current.focus();
      }
    };

    requestAnimationFrame(animate);
  };

  const hasValue = value.length > 0;

  return (
    <div className="w-full max-w-[360px] mx-auto p-6 bg-[#0d0e12] rounded-3xl border border-white/5 flex flex-col gap-4 text-white shadow-2xl select-none">
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider">Transitions.dev</span>
        <h3 className="text-lg font-bold text-white tracking-tight">Input Dissolve Clear</h3>
      </div>
      
      <div 
        ref={containerRef}
        className={`t-clear relative flex items-center h-12 w-full bg-neutral-900/60 rounded-xl px-4 border border-white/10 ${hasValue ? "has-value" : ""} ${isClearing ? "is-clearing" : ""}`}
      >
        <Search className="w-4 h-4 text-neutral-500 mr-2 z-10 shrink-0" />
        
        <input 
          ref={inputRef}
          type="text" 
          value={value} 
          onChange={(e) => setValue(e.target.value)}
          disabled={isClearing}
          className="w-full text-sm font-medium bg-transparent border-none text-white focus:outline-none focus:ring-0 z-10 pr-8"
        />

        {/* Text Mirror */}
        <div ref={mirrorRef} className="t-clear-mirror text-sm font-medium text-white/80 pl-8" aria-hidden="true">
          {value}
        </div>

        {/* Fake Placeholder */}
        <div className="t-clear-placeholder text-sm font-medium text-neutral-500 pl-8" aria-hidden="true">
          Search workspaces...
        </div>

        {/* Streak Dissolve Overlay */}
        <div ref={glowRef} className="t-clear-glow" aria-hidden="true" />

        {/* Action Button */}
        {hasValue && !isClearing && (
          <button 
            onClick={handleClear}
            className="t-clear-btn absolute right-3 z-25 w-6 h-6 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/15 transition-all text-neutral-400 hover:text-white cursor-pointer active:scale-90"
            aria-label="Clear input"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
