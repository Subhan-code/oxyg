"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = Array.from({ length: 12 }, (_, i) => `/grid/${(i % 12) + 1}.webp`);

export function StickyGridScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  
  const colLeftRef = useRef<HTMLDivElement>(null);
  const colCenterRef = useRef<HTMLDivElement>(null);
  const colRightRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const scroller = containerRef.current;
    const trigger = triggerRef.current;
    const grid = gridRef.current;
    const colLeft = colLeftRef.current;
    const colCenter = colCenterRef.current;
    const colRight = colRightRef.current;

    const title = titleRef.current;
    const desc = descRef.current;
    const btn = btnRef.current;

    if (!scroller || !trigger || !grid || !colLeft || !colCenter || !colRight || !title || !desc || !btn) return;

    // Reset components initial layout
    gsap.set([desc, btn], { opacity: 0, pointerEvents: "none" });
    
    // Position title centered vertically
    const titleOffsetY = 30; // initial offset
    gsap.set(title, { yPercent: titleOffsetY, opacity: 0 });

    const leftItems = Array.from(colLeft.children);
    const centerItems = Array.from(colCenter.children);
    const rightItems = Array.from(colRight.children);

    const columns = [leftItems, centerItems, rightItems];

    // Scroll height computation for local elements
    const scrollerHeight = scroller.clientHeight || 580;
    const dy = scrollerHeight * 1.2;

    // Reveal Timeline: columns slide from top/bottom
    const revealTimeline = gsap.timeline();
    
    // Column 0 and Column 2 (Left, Right) are even column indexes (0, 2) in original logic. They slide from top (-1)
    // Column 1 (Center) is odd, slides from bottom (1)
    revealTimeline.from(leftItems, {
      y: -dy,
      stagger: { each: 0.05, from: "end" },
      ease: "power2.inOut"
    }, "reveal");

    revealTimeline.from(rightItems, {
      y: -dy,
      stagger: { each: 0.05, from: "end" },
      ease: "power2.inOut"
    }, "reveal");

    revealTimeline.from(centerItems, {
      y: dy,
      stagger: { each: 0.05, from: "start" },
      ease: "power2.inOut"
    }, "reveal");

    // Zoom and Split Timeline
    const zoomTimeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    zoomTimeline.to(grid, { scale: 2.15 }, 0);
    zoomTimeline.to(leftItems, { xPercent: -50 }, 0);
    zoomTimeline.to(rightItems, { xPercent: 50 }, 0);
    
    // Central column split: items above midpoint move up, below move down
    centerItems.forEach((item, idx) => {
      const dir = idx < Math.floor(centerItems.length / 2) ? -1 : 1;
      zoomTimeline.to(item, { yPercent: dir * 55, duration: 0.8 }, 0);
    });

    // Content reveal logic bound to scroll direction
    const toggleContent = (direction: number) => {
      const show = direction === 1;
      gsap.to(title, {
        yPercent: show ? 0 : titleOffsetY,
        opacity: show ? 1 : 0,
        duration: 0.6,
        ease: "power2.inOut",
        overwrite: true
      });
      gsap.to([desc, btn], {
        opacity: show ? 1 : 0,
        pointerEvents: show ? "all" : "none",
        duration: 0.4,
        ease: "power2.inOut",
        overwrite: true
      });
    };

    // Master ScrollTrigger timeline
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        scroller: scroller,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          // Detect split milestone
          const progress = self.progress;
          if (progress > 0.6) {
            toggleContent(1);
          } else {
            toggleContent(-1);
          }
        }
      }
    });

    mainTimeline
      .add(revealTimeline)
      .add(zoomTimeline, "-=0.3");

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.scroller === scroller) t.kill();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[580px] bg-[#0c0c0e] text-white flex flex-col font-sans rounded-3xl overflow-y-auto overflow-x-hidden relative border border-white/[0.08] select-none"
      style={{ scrollbarWidth: "thin" }}
    >
      {/* Top sticky scrollbar prompt */}
      <div className="absolute top-4 right-6 z-40 bg-neutral-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 text-[9.5px] font-black uppercase text-neutral-400 tracking-wider">
        Drag Scrollbar to Explore
      </div>

      {/* Main scrolling wrapper */}
      <div ref={triggerRef} className="relative w-full h-[320%]">
        
        {/* Sticky viewport content container */}
        <div className="sticky top-0 w-full h-[580px] flex items-center justify-center overflow-hidden">
          
          {/* Centered Revealed Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-25 pointer-events-none">
            <h2 
              ref={titleRef}
              className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white max-w-md leading-none select-none font-serif"
            >
              Sticky Grid Scroll
            </h2>
            <p 
              ref={descRef}
              className="text-xs uppercase tracking-widest text-neutral-400 max-w-xs font-semibold leading-relaxed mt-4"
            >
              A structured scroll-driven image grid where movement unfolds progressively within a sticky layout.
            </p>
            <a 
              ref={btnRef}
              href="#/"
              className="text-[10px] uppercase font-black px-5 py-2.5 bg-white text-black hover:bg-neutral-100 rounded-full cursor-pointer pointer-events-auto transition-transform active:scale-95 shadow-2xl mt-6"
            >
              Explore Showcase
            </a>
          </div>

          {/* Gallery View Wrapper */}
          <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px] flex items-center justify-center scale-90 md:scale-100">
            <ul 
              ref={gridRef}
              className="w-full h-full grid grid-cols-3 gap-4 md:gap-5 transform-gpu will-change-transform"
            >
              {/* Column 0: Left */}
              <div ref={colLeftRef} className="flex flex-col gap-4 md:gap-5 w-full">
                {[0, 3, 6, 9].map((idx) => (
                  <div key={idx} className="w-full aspect-square rounded-2xl overflow-hidden border border-white/5 shadow-2xl transform-gpu">
                    <img src={IMAGES[idx]} alt={`img-${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Column 1: Center */}
              <div ref={colCenterRef} className="flex flex-col gap-4 md:gap-5 w-full">
                {[1, 4, 7, 10].map((idx) => (
                  <div key={idx} className="w-full aspect-square rounded-2xl overflow-hidden border border-white/5 shadow-2xl transform-gpu">
                    <img src={IMAGES[idx]} alt={`img-${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Column 2: Right */}
              <div ref={colRightRef} className="flex flex-col gap-4 md:gap-5 w-full">
                {[2, 5, 8, 11].map((idx) => (
                  <div key={idx} className="w-full aspect-square rounded-2xl overflow-hidden border border-white/5 shadow-2xl transform-gpu">
                    <img src={IMAGES[idx]} alt={`img-${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
