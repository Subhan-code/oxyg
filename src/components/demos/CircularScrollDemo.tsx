"use client";

import React, { useRef } from "react";
import CircularScroll from "../oxygen-ui/CircularScroll";
import { ArrowDown, HelpCircle, Move } from "lucide-react";

export function CircularScrollDemo({ showPercent = false }: { showPercent?: boolean }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 bg-card rounded-3xl border border-border text-foreground relative h-[70vh] flex flex-col overflow-hidden">
      {/* Scroll progress widget, passing the inner scrollable container ref */}
      <CircularScroll container={scrollContainerRef} showPercent={showPercent} />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-border shrink-0 z-10 bg-card">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold font-decorative tracking-tight">Circular Scroll</h2>
            <span className="bg-sky-500/10 text-sky-500 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold">New</span>
          </div>
          <p className="text-muted-foreground text-xs mt-1.5 font-light max-w-xl">
            A beautiful, drag-repositionable circular scroll progress tracker. Drag it anywhere across your viewport. It will respect boundaries.
          </p>
        </div>
        <div className="flex gap-2.5 mt-4 md:mt-0 text-xs font-mono text-muted-foreground/60">
          <span>drag-physics</span> / <span>scroll-percent</span>
        </div>
      </div>

      {/* Scrollable Content wrapper */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto space-y-8 pr-4 select-none relative"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Instructional Prompts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 shrink-0">
          <div className="bg-surface border border-border rounded-2xl p-5 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-card border border-border text-sky-500">
              <Move className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Drag to Move</h4>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Grab the floating circular bubble at the top-right and drag it anywhere across your viewport. It will respect window bounds.
              </p>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-5 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-card border border-border text-emerald-500">
              <ArrowDown className="size-5 animate-bounce" />
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Scroll Down to Track</h4>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Scroll down the page. Hover over the bubble to see the exact scroll progress percentage update dynamically with springy digit transformations.
              </p>
            </div>
          </div>
        </div>

        {/* Mock Long Content */}
        <div className="pt-6 space-y-16 border-t border-border mt-8">
          {[1, 2, 3, 4].map((section) => (
            <div key={section} className="space-y-4 max-w-2xl">
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-500">Section {section}</span>
              <h3 className="text-lg font-bold font-decorative">Fluid Scroll Mechanics</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-light">
                Designing interfaces that feel responsive to human interaction requires mapping raw inputs (like scroll events) into smooth visual properties. By wrapping raw document offsets in spring-damped motion transforms, the resulting animations look organic and integrated with user focus.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CircularScrollDemo;
