"use client";

import React, { useRef, useState, useEffect } from "react";
import { MoveDown } from "lucide-react";

interface ParallaxItem {
  id: number;
  title: string;
  subtitle: string;
  img: string;
}

const ITEMS: ParallaxItem[] = [
  { id: 1, title: "Tactile Kinetics", subtitle: "Physics-based microinteractions", img: "/grid/13.webp" },
  { id: 2, title: "Spatial Interface", subtitle: "3D translation and depth maps", img: "/grid/14.webp" },
  { id: 3, title: "Tactical Geometry", subtitle: "Geometric layout constraints", img: "/grid/15.webp" },
  { id: 4, title: "Future Canvas", subtitle: "High performance WebGL layers", img: "/grid/16.webp" }
];

// Repeat items to allow seamless scrolling loop (3 copies: previous, current, next)
const LOOP_ITEMS = [...ITEMS, ...ITEMS, ...ITEMS];

export function InfiniteScrollParallax() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const marqueeTextsRef = useRef<SVGSVGElement[]>([]);
  
  // Track scroll position to calculate offset transforms
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Initialize position at the middle set of items for seamless loop
    const itemHeight = 360; // approximate height of card + margin
    const initialScrollTop = itemHeight * ITEMS.length;
    scroller.scrollTop = initialScrollTop;

    const handleScroll = () => {
      const scrollTop = scroller.scrollTop;
      const scrollHeight = scroller.scrollHeight;
      const clientHeight = scroller.clientHeight;

      const singleLoopHeight = itemHeight * ITEMS.length;

      // Infinite scroll looping logic
      if (scrollTop <= 10) {
        // Jump down to the second copy
        scroller.scrollTop = initialScrollTop + scrollTop;
      } else if (scrollTop >= scrollHeight - clientHeight - 10) {
        // Jump up to the middle copy
        scroller.scrollTop = initialScrollTop + (scrollTop % singleLoopHeight);
      }

      setScrollProgress(scrollTop);

      // Apply Parallax transforms manually in rAF loop for maximum performance
      itemsRef.current.forEach((itemEl, idx) => {
        if (!itemEl) return;
        const imgEl = imagesRef.current[idx];
        const svgEl = marqueeTextsRef.current[idx];

        const rect = itemEl.getBoundingClientRect();
        const scrollerRect = scroller.getBoundingClientRect();

        // Calculate card position relative to the scroller viewport center (-1 to 1)
        const centerOffset = (rect.top + rect.height / 2 - scrollerRect.top - scrollerRect.height / 2) / scrollerRect.height;

        // Image Parallax translation: translate background image in opposite direction
        if (imgEl) {
          const yPercent = centerOffset * 35; // translate percentage offset
          imgEl.style.transform = `translate3d(0, ${yPercent}%, 0) scale(1.15)`;
        }

        // SVG Marquee Scale animation (1.4 at edges down to 0.7 at center)
        if (svgEl) {
          const scale = 1.3 - Math.min(Math.abs(centerOffset), 0.6) * 0.9;
          svgEl.style.transform = `scale(${scale})`;
        }
      });
    };

    scroller.addEventListener("scroll", handleScroll);
    // Initial call to set positions
    setTimeout(handleScroll, 50);

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full h-[580px] bg-black text-white flex flex-col font-sans rounded-3xl overflow-hidden border border-white/[0.08] relative select-none">
      {/* Top Floating Info Tag */}
      <div className="absolute top-4 left-6 z-30 bg-neutral-900/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/5 flex items-center gap-2 text-[10px] font-bold text-neutral-300">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
        <span>Infinite Scroll + Depth Parallax</span>
      </div>

      {/* Down arrow scroll helper */}
      <div className="absolute bottom-6 right-6 z-30 bg-indigo-600/90 backdrop-blur-md p-3 rounded-full text-white border border-indigo-500/35 hover:scale-105 active:scale-95 transition-transform flex items-center justify-center animate-bounce pointer-events-none">
        <MoveDown className="w-4 h-4" />
      </div>

      {/* Vertical scroll track */}
      <div
        ref={scrollerRef}
        className="flex-grow overflow-y-auto no-scrollbar scroll-smooth py-12 px-6 flex flex-col items-center gap-12"
      >
        {LOOP_ITEMS.map((item, idx) => {
          return (
            <div
              key={idx}
              ref={(el) => {
                if (el) itemsRef.current[idx] = el;
              }}
              className="w-full max-w-md h-[280px] rounded-2xl overflow-hidden relative border border-white/[0.06] bg-neutral-900 shrink-0 transform-gpu"
            >
              {/* Parallax Image Background container */}
              <div className="absolute inset-0 w-full h-[140%] -top-[20%] overflow-hidden pointer-events-none">
                <img
                  ref={(el) => {
                    if (el) imagesRef.current[idx] = el;
                  }}
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover will-change-transform transform-gpu scale-[1.15]"
                />
                {/* Image Overlay tint */}
                <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black via-black/20 to-black/40" />
              </div>

              {/* Foreground Typography Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 z-20">
                <div>
                  <span className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.25em]">
                    0{(item.id)} / 0{ITEMS.length}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white leading-none mt-1.5 select-none font-serif">
                    {item.title}
                  </h3>
                </div>

                <div className="flex justify-between items-end">
                  <p className="text-[11px] text-neutral-400 font-semibold tracking-wide uppercase leading-relaxed max-w-[200px]">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Centered Large SVG Marquee Typography */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <svg
                  ref={(el) => {
                    if (el) marqueeTextsRef.current[idx] = el;
                  }}
                  className="w-full h-12 overflow-visible transform transition-transform duration-100 ease-out transform-gpu origin-center opacity-30"
                >
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-black text-[2rem] fill-none stroke-white uppercase tracking-[0.1em] font-sans"
                    strokeWidth="1"
                  >
                    {item.title}
                  </text>
                </svg>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
