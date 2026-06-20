"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const MENU_ITEMS = [
  { word: "Gotiva", img: "/grid/5.webp" },
  { word: "Hava", img: "/grid/10.webp" },
  { word: "Sikter", img: "/grid/15.webp" },
  { word: "Valo", img: "/grid/20.webp" },
  { word: "Opanci", img: "/grid/25.webp" },
  { word: "Insan", img: "/grid/30.webp" },
];

function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b;
}

function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

// Subcomponent representing a single 3D rotating and floating menu item
function MenuItem({ word, img, index }: { word: string; img: string; index: number }) {
  const itemRef = useRef<HTMLAnchorElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const revealInnerRef = useRef<HTMLDivElement>(null);
  const revealImgRef = useRef<HTMLDivElement>(null);

  const titleCharsRef = useRef<HTMLSpanElement[]>([]);
  const cloneCharsRef = useRef<HTMLSpanElement[]>([]);

  // State refs for physics following
  const animProperties = useRef({
    tx: { prev: 0, curr: 0, amt: 0.15 },
    ty: { prev: 0, curr: 0, amt: 0.15 },
    rotation: { prev: 0, curr: 0, amt: 0.15 },
    brightness: { prev: 1, curr: 1, amt: 0.08 },
  });

  const mouseRef = useRef({ x: 0, y: 0 });
  const mouseCacheRef = useRef({ x: 0, y: 0 });
  const cursorDirRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);
  const firstCycleRef = useRef(true);
  const boundsRef = useRef({ left: 0, top: 0, width: 350, height: 450 });

  const isPositionOdd = index % 2 !== 0;

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const updateBounds = () => {
      if (item) {
        const rect = item.getBoundingClientRect();
        boundsRef.current = {
          left: rect.left,
          top: rect.top,
          width: 350,
          height: 450,
        };
      }
    };

    // GSAP character animation references
    let animTimeline: gsap.core.Timeline | null = null;
    let revealTimeline: gsap.core.Timeline | null = null;

    const loop = () => {
      if (!isHoveredRef.current) return;

      const mouseDistX = clamp(Math.abs(mouseCacheRef.current.x - mouseRef.current.x), 0, 100);
      cursorDirRef.current = {
        x: mouseCacheRef.current.x - mouseRef.current.x,
        y: mouseCacheRef.current.y - mouseRef.current.y,
      };
      mouseCacheRef.current = { ...mouseRef.current };

      const state = animProperties.current;
      const bounds = boundsRef.current;

      // Position logic mapping depending on odd/even index
      state.tx.curr = isPositionOdd
        ? Math.abs(mouseRef.current.x - bounds.left)
        : Math.abs(mouseRef.current.x - bounds.left) - bounds.width;

      state.ty.curr = firstCycleRef.current
        ? bounds.height / 1.5
        : Math.abs(mouseRef.current.y - bounds.top);

      // Rotation velocity angle maps
      const startAngle = -30;
      state.rotation.curr = firstCycleRef.current
        ? startAngle
        : startAngle + (cursorDirRef.current.x < 0 ? mouseDistX * 1.5 : -mouseDistX * 1.5);

      state.brightness.curr = firstCycleRef.current ? 1 : 1 + (mouseDistX / 100) * 2;

      // LERP steps
      state.tx.prev = firstCycleRef.current
        ? state.tx.curr
        : lerp(state.tx.prev, state.tx.curr, state.tx.amt);

      state.ty.prev = firstCycleRef.current
        ? state.ty.curr
        : lerp(state.ty.prev, state.ty.curr, state.ty.amt);

      state.rotation.prev = firstCycleRef.current
        ? state.rotation.curr
        : lerp(state.rotation.prev, state.rotation.curr, state.rotation.amt);

      state.brightness.prev = firstCycleRef.current
        ? state.brightness.curr
        : lerp(state.brightness.prev, state.brightness.curr, state.brightness.amt);

      // Apply style coordinates
      if (revealRef.current) {
        gsap.set(revealRef.current, {
          x: state.tx.prev,
          y: state.ty.prev,
          rotation: state.rotation.prev,
          filter: `brightness(${state.brightness.prev.toFixed(2)})`,
        });
      }

      firstCycleRef.current = false;
      rafIdRef.current = requestAnimationFrame(loop);
    };

    const onMouseEnter = (e: MouseEvent) => {
      isHoveredRef.current = true;
      firstCycleRef.current = true;
      mouseRef.current = { x: e.clientX, y: e.clientY };
      mouseCacheRef.current = { ...mouseRef.current };

      updateBounds();
      window.addEventListener("mousemove", onMouseMove);

      // 1. Text 3D rotate character stagger in
      if (animTimeline) animTimeline.kill();
      animTimeline = gsap.timeline({
        defaults: { duration: 0.55, ease: "power2.out", stagger: 0.02 },
      })
      .to(titleCharsRef.current, {
        yPercent: 100,
        rotationX: -90,
        opacity: 0,
      })
      .to(cloneCharsRef.current, {
        startAt: { yPercent: -100, rotationX: 90, opacity: 0 },
        yPercent: 0,
        rotationX: 0,
        opacity: 1,
      }, 0);

      // 2. Reveal Image animation in
      if (revealTimeline) revealTimeline.kill();
      revealTimeline = gsap.timeline({
        onStart: () => {
          gsap.set([revealRef.current, revealInnerRef.current], { opacity: 1 });
          gsap.set(item, { zIndex: 100 });
        },
      })
      .to(revealInnerRef.current, {
        duration: 1.2,
        ease: "expo.out",
        startAt: { scale: 0.55 },
        scale: 1,
      })
      .to(revealImgRef.current, {
        duration: 1.2,
        ease: "expo.out",
        startAt: { scaleX: 2 },
        scaleX: 1,
      }, 0);

      rafIdRef.current = requestAnimationFrame(loop);
    };

    const onMouseLeave = () => {
      isHoveredRef.current = false;
      window.removeEventListener("mousemove", onMouseMove);
      
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      // 1. Text 3D rotate character stagger out
      if (animTimeline) animTimeline.kill();
      animTimeline = gsap.timeline({
        defaults: { duration: 0.55, ease: "power2.out", stagger: 0.02 },
      })
      .to(cloneCharsRef.current, {
        yPercent: -100,
        rotationX: 90,
        opacity: 0,
      })
      .to(titleCharsRef.current, {
        startAt: { yPercent: 100, rotationX: -90, opacity: 0 },
        yPercent: 0,
        rotationX: 0,
        opacity: 1,
      }, 0);

      // 2. Reveal Image animation out
      if (revealTimeline) revealTimeline.kill();
      revealTimeline = gsap.timeline({
        defaults: { duration: 1.0, ease: "power2.out" },
        onStart: () => {
          gsap.set(item, { zIndex: 1 });
        },
        onComplete: () => {
          if (!isHoveredRef.current) {
            gsap.set(revealRef.current, { opacity: 0 });
          }
        },
      })
      .to(revealInnerRef.current, {
        opacity: 0,
      })
      .to(revealImgRef.current, {
        scaleX: 1.6,
      }, 0)
      .to(revealRef.current, {
        rotation: cursorDirRef.current.x < 0 ? "+=5" : "-=5",
        yPercent: 120,
      }, 0);
    };

    item.addEventListener("mouseenter", onMouseEnter);
    item.addEventListener("mouseleave", onMouseLeave);

    return () => {
      item.removeEventListener("mouseenter", onMouseEnter);
      item.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousemove", onMouseMove);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isPositionOdd]);

  return (
    <a 
      ref={itemRef}
      className="menu__item relative block mb-6 select-none leading-none will-change-transform z-10"
      style={{ cursor: "pointer" }}
    >
      {/* 3D Title Word Container */}
      <span className="menu__item-text pointer-events-none block relative z-10 text-[6.5vw] md:text-[5.5vw] uppercase font-black tracking-tighter leading-none select-none">
        
        {/* Main word display */}
        <span className="word inline-block overflow-hidden relative" style={{ perspective: "1000px" }}>
          {word.split("").map((char, charIdx) => (
            <span
              key={charIdx}
              ref={(el) => {
                if (el) titleCharsRef.current[charIdx] = el;
              }}
              className="char inline-block will-change-transform transform-style-3d origin-top-left"
            >
              {char}
            </span>
          ))}
        </span>

        {/* Word Clone for 3D spin overlays */}
        <span className="word word--clone absolute inset-0 inline-block overflow-hidden pointer-events-none" style={{ perspective: "1000px" }}>
          {word.split("").map((char, charIdx) => (
            <span
              key={charIdx}
              ref={(el) => {
                if (el) cloneCharsRef.current[charIdx] = el;
              }}
              className="char inline-block will-change-transform transform-style-3d origin-top-left opacity-0"
            >
              {char}
            </span>
          ))}
        </span>

      </span>

      {/* Floating Reveal Image Container */}
      <div 
        ref={revealRef}
        className="hover-reveal absolute z-0 pointer-events-none opacity-0 select-none overflow-hidden"
        style={{
          width: "220px",
          height: "280px",
          top: "0px",
          left: "0px",
          transformOrigin: "100% 0%",
        }}
      >
        <div ref={revealInnerRef} className="hover-reveal__inner w-full h-full overflow-hidden select-none">
          <div 
            ref={revealImgRef} 
            className="hover-reveal__img w-full h-full bg-cover bg-center select-none"
            style={{ backgroundImage: `url(${img})` }}
          />
        </div>
      </div>
    </a>
  );
}

export default function ThreeDLettersMenuHover() {
  return (
    <div className="relative w-full h-[580px] rounded-2xl overflow-hidden bg-[#e0ded8] text-black border border-white/10 flex flex-col font-sans select-none shadow-2xl">
      
      {/* Mini Title Frame */}
      <header className="absolute top-6 left-6 z-30 pointer-events-none flex flex-col gap-1">
        <h3 className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-black/50">
          Letters Hover
        </h3>
        <h4 className="text-xl font-black uppercase text-black tracking-tight leading-none">
          3D LETTERS MENU
        </h4>
      </header>

      {/* Instruction Overlay */}
      <div className="absolute top-6 right-6 z-30 pointer-events-none bg-black/5 border border-black/10 px-3 py-1.5 rounded-full text-[10px] text-black/70 font-extrabold tracking-wider">
        HOVER OVER WORDS
      </div>

      {/* Menu Area Viewport */}
      <div className="flex-1 w-full flex items-center justify-center p-8 overflow-y-auto no-scrollbar pt-20">
        <nav className="menu w-full flex flex-col items-center justify-center relative py-6">
          
          {/* Custom style selectors */}
          <style dangerouslySetInnerHTML={{ __html: `
            .menu__item::before {
              content: "0" counter(menucounter);
              counter-increment: menucounter;
              position: absolute;
              left: -32px;
              top: 6px;
              font-size: 11px;
              font-weight: 800;
              color: rgba(0, 0, 0, 0.35);
              font-family: monospace;
            }
            .menu {
              counter-reset: menucounter;
            }
          ` }} />

          {MENU_ITEMS.map((item, idx) => (
            <MenuItem 
              key={idx}
              word={item.word}
              img={item.img}
              index={idx}
            />
          ))}

        </nav>
      </div>

      {/* Poem Footnote overlay matching original aesthetic */}
      <footer className="shrink-0 bg-black/[0.03] border-t border-black/5 p-4 text-[10px] uppercase tracking-wider text-black/40 text-center font-bold">
        Lijepa Emina • Hamam • Jasmini • S ibrikom u ruci
      </footer>

    </div>
  );
}
