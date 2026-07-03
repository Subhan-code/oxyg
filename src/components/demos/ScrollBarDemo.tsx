"use client";

import React, { useEffect, useRef, useState } from "react";
import ScrollBar from "../oxygen-ui/ScrollBar";
import { ArrowDown, Check, Layers, Sliders, Sparkles } from "lucide-react";

const SECTIONS = [
  { id: 0, title: "Introduction" },
  { id: 1, title: "Spring Dynamics" },
  { id: 2, title: "Fluid Shaders" },
  { id: 3, title: "UI Architecture" },
  { id: 4, title: "Playground Settings" },
];

export function ScrollBarDemo({ showScrollCard = true }: { showScrollCard?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = containerRef.current.scrollTop;
      const containerHeight = containerRef.current.clientHeight;

      let currentActive = 0;
      let maxVisibleArea = 0;

      sectionRefs.current.forEach((ref, idx) => {
        if (!ref) return;
        const rectTop = ref.offsetTop;
        const rectHeight = ref.offsetHeight;
        
        // Calculate the overlap between the section and the visible viewport of the container
        const visibleTop = Math.max(rectTop, scrollTop);
        const visibleBottom = Math.min(rectTop + rectHeight, scrollTop + containerHeight);
        const overlap = Math.max(0, visibleBottom - visibleTop);

        if (overlap > maxVisibleArea) {
          maxVisibleArea = overlap;
          currentActive = idx;
        }
      });

      setActiveSection(currentActive);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      // Trigger initial calculation
      setTimeout(handleScroll, 100);
    }
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 bg-card rounded-3xl border border-border text-foreground relative h-[70vh] flex flex-col overflow-hidden">
      {/* Scrollbar integration */}
      <ScrollBar 
        activeSection={activeSection} 
        showScrollCard={showScrollCard} 
        sections={SECTIONS}
        container={containerRef}
      />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-border shrink-0 z-10 bg-card">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold font-decorative tracking-tight">Scroll Bar</h2>
            <span className="bg-sky-500/10 text-sky-500 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold">New</span>
          </div>
          <p className="text-muted-foreground text-xs mt-1.5 font-light max-w-xl">
            A premium vertical progress tracker that displays active sections and info cards on hover/scroll. Drag-free, pure spring transitions.
          </p>
        </div>
        <div className="flex gap-2.5 mt-4 md:mt-0 text-xs font-mono text-muted-foreground/60">
          <span>spring-damping</span> / <span>section-nav</span>
        </div>
      </div>

      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto pr-8 relative space-y-12 scroll-smooth select-none"
        style={{ scrollbarWidth: "none" }}
      >
        {SECTIONS.map((section, idx) => (
          <div
            key={section.id}
            ref={(el) => { sectionRefs.current[idx] = el; }}
            className="min-h-[50vh] flex flex-col justify-center border-b border-border/40 last:border-b-0 pb-12 last:pb-0 pt-6"
          >
            <div className="space-y-4 max-w-xl">
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-500">// Section 0{section.id + 1}</span>
              <h3 className="text-xl font-bold font-decorative text-white">{section.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-light">
                {idx === 0 && "Design and implementation of custom user interfaces starts here. We map raw user input directly to visual animations that feel intuitive and satisfying. Scroll down the container to trigger the right-hand scroll progress widget."}
                {idx === 1 && "Framer Motion's useSpring values are configured with a stiffness of 100 and a damping of 30. This dampens abrupt changes and yields organic visual motion that doesn't feel robotic or jar the user."}
                {idx === 2 && "Sleek composite SVG filters make the transitions look fluid and clean. Micro-interactions in components react dynamically to mouse position and scroll velocity, keeping the layout active."}
                {idx === 3 && "By structure, the ScrollBar component accepts absolute sections coordinate layouts, tracking day-to-day contributions, budget splits, or usage parameters in unified dashboards."}
                {idx === 4 && "Go to the floating Playground Pill settings tab at the bottom to toggle the Scroll Info Card visibility state. It communicates status flags back to the demo dynamically."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScrollBarDemo;
