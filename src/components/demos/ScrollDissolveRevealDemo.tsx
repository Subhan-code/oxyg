import React, { useRef } from 'react';
import { ScrollDissolveReveal } from '../oxygen-ui/scroll-dissolve-reveal';

export function ScrollDissolveRevealDemo() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div
      ref={scrollContainerRef}
      className="w-full h-[80vh] rounded-3xl border border-border overflow-y-auto relative bg-[#0a0a0a]"
      style={{ scrollbarWidth: "none" }}
    >
      <ScrollDissolveReveal
        imageFront="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200"
        imageBack="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1200"
        className="h-full"
        scrollContainerRef={scrollContainerRef}
      />
      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none z-50 text-white/50 text-sm font-medium tracking-wide">
        Scroll down inside this area to dissolve the image
      </div>
    </div>
  );
}

export default ScrollDissolveRevealDemo;
