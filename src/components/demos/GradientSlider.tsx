"use client";

import React, { useEffect, useRef, useState } from "react";
import { Info, Move } from "lucide-react";

// Visual constants
const IMAGES = [
  "/slider/img01.webp",
  "/slider/img02.webp",
  "/slider/img03.webp",
  "/slider/img04.webp",
  "/slider/img05.webp",
  "/slider/img06.webp",
  "/slider/img07.webp",
  "/slider/img08.webp",
  "/slider/img09.webp",
  "/slider/img10.webp",
];

// Predefined palette corresponding to the 10 slider images
const PALETTE = [
  { c1: [142, 68, 173], c2: [41, 128, 185] },     // img01: Purple/Blue
  { c1: [231, 76, 60], c2: [241, 196, 15] },      // img02: Red/Yellow
  { c1: [26, 188, 156], c2: [46, 204, 113] },     // img03: Turquoise/Green
  { c1: [230, 126, 34], c2: [211, 84, 0] },       // img04: Orange/DarkOrange
  { c1: [155, 89, 182], c2: [52, 152, 219] },     // img05: Amethyst/PeterRiver
  { c1: [52, 73, 94], c2: [127, 140, 141] },      // img06: Charcoal/Silver
  { c1: [22, 160, 133], c2: [243, 156, 18] },     // img07: GreenSea/Orange
  { c1: [192, 57, 43], c2: [142, 68, 173] },      // img08: Red/Wisteria
  { c1: [241, 196, 15], c2: [26, 188, 156] },     // img09: Sunflower/Teal
  { c1: [211, 84, 0], c2: [44, 62, 80] },         // img10: Pumpkin/Navy
];

// Physics constants
const FRICTION = 0.9;
const WHEEL_SENS = 0.6;
const DRAG_SENS = 0.95;

const MAX_ROTATION = 28;
const MAX_DEPTH = 140;
const MIN_SCALE = 0.92;
const SCALE_RANGE = 0.1;
const GAP = 28;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function GradientSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardsRootRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  // Keep slider values in refs to bypass React state re-render lags
  const stateRef = useRef({
    scrollX: 0,
    vX: 0,
    cardW: 240,
    cardH: 320,
    step: 240 + GAP,
    track: (240 + GAP) * IMAGES.length,
    vwHalf: 400,
    dragging: false,
    lastX: 0,
    lastT: 0,
    lastDelta: 0,
    gradCurrent: {
      r1: 240, g1: 240, b1: 240,
      r2: 235, g2: 235, b2: 235,
    },
    gradTarget: {
      r1: 240, g1: 240, b1: 240,
      r2: 235, g2: 235, b2: 235,
    },
    activeIndex: 0,
  });

  // Handle pointer drag triggers
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Only left click
    const state = stateRef.current;
    state.dragging = true;
    state.lastX = e.clientX;
    state.lastT = performance.now();
    state.lastDelta = 0;
    
    const container = containerRef.current;
    if (container) {
      container.setPointerCapture(e.pointerId);
      container.classList.add("dragging");
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    if (!state.dragging) return;

    const now = performance.now();
    const dx = e.clientX - state.lastX;
    const dt = Math.max(1, now - state.lastT) / 1000;

    state.scrollX = mod(state.scrollX - dx * DRAG_SENS, state.track);
    state.lastDelta = dx / dt;
    state.lastX = e.clientX;
    state.lastT = now;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    if (!state.dragging) return;
    state.dragging = false;
    
    const container = containerRef.current;
    if (container) {
      container.releasePointerCapture(e.pointerId);
      container.classList.remove("dragging");
    }

    state.vX = -state.lastDelta * DRAG_SENS;
  };

  // Mouse wheel scroll trigger
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    state.vX += delta * WHEEL_SENS * 18;
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const cardsRoot = cardsRootRef.current;
    if (!container || !canvas || !cardsRoot) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const state = stateRef.current;

    // Set initial layout bounds
    const measure = () => {
      const parentWidth = container.clientWidth;
      state.vwHalf = parentWidth / 2;
      
      // Determine responsive card sizes
      const isMobile = parentWidth < 640;
      state.cardW = isMobile ? 180 : 240;
      state.cardH = isMobile ? 260 : 320;
      state.step = state.cardW + GAP;
      state.track = IMAGES.length * state.step;
    };
    measure();

    // Trigger canvas resizing
    const resizeCanvas = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const w = container.clientWidth;
      const h = container.clientHeight;
      const tw = Math.floor(w * dpr);
      const th = Math.floor(h * dpr);

      if (canvas.width !== tw || canvas.height !== th) {
        canvas.width = tw;
        canvas.height = th;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };
    resizeCanvas();

    window.addEventListener("resize", () => {
      measure();
      resizeCanvas();
    });

    let rafId: number;
    let lastTime = performance.now();

    // Set initial colors
    state.gradCurrent = {
      r1: PALETTE[0].c1[0], g1: PALETTE[0].c1[1], b1: PALETTE[0].c1[2],
      r2: PALETTE[0].c2[0], g2: PALETTE[0].c2[1], b2: PALETTE[0].c2[2],
    };
    state.gradTarget = { ...state.gradCurrent };

    // Primary Animation Frame Loop
    const tick = (t: number) => {
      const dt = (t - lastTime) / 1000;
      lastTime = t;

      // 1. Process physics scrolling
      if (!state.dragging) {
        state.scrollX = mod(state.scrollX + state.vX * dt, state.track);
        const decay = Math.pow(FRICTION, dt * 60);
        state.vX *= decay;
        if (Math.abs(state.vX) < 0.1) state.vX = 0;
      }

      // 2. Compute transforms & render cards
      const half = state.track / 2;
      const cardEls = cardsRoot.children;
      let closestIdx = 0;
      let closestDist = Infinity;

      for (let i = 0; i < cardEls.length; i++) {
        const cardEl = cardEls[i] as HTMLElement;
        const initialX = i * state.step;
        let pos = initialX - state.scrollX;

        // Wrap coords around infinite timeline
        if (pos < -half) pos += state.track;
        if (pos > half) pos -= state.track;

        const dist = Math.abs(pos);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }

        // Apply visual transformation math
        const norm = Math.max(-1, Math.min(1, pos / state.vwHalf));
        const absNorm = Math.abs(norm);
        const invNorm = 1 - absNorm;

        const ry = -norm * MAX_ROTATION;
        const tz = invNorm * MAX_DEPTH;
        const scale = MIN_SCALE + invNorm * SCALE_RANGE;

        cardEl.style.transform = `translate3d(${pos}px, -50%, ${tz}px) rotateY(${ry}deg) scale(${scale})`;
        cardEl.style.zIndex = String(1000 + Math.round(tz));

        // Blur cards further away
        const isCore = dist < state.step * 1.5;
        const blur = isCore ? 0 : 2.5 * Math.pow(absNorm, 1.2);
        cardEl.style.filter = `blur(${blur.toFixed(2)}px)`;
      }

      // 3. Update Target Colors when centered item shifts
      if (closestIdx !== state.activeIndex) {
        state.activeIndex = closestIdx;
        setActiveIndex(closestIdx);

        const targetColors = PALETTE[closestIdx];
        state.gradTarget = {
          r1: targetColors.c1[0], g1: targetColors.c1[1], b1: targetColors.c1[2],
          r2: targetColors.c2[0], g2: targetColors.c2[1], b2: targetColors.c2[2],
        };
      }

      // 4. Interpolate current canvas colors to target palette
      const lerpSpeed = 0.08;
      state.gradCurrent.r1 += (state.gradTarget.r1 - state.gradCurrent.r1) * lerpSpeed;
      state.gradCurrent.g1 += (state.gradTarget.g1 - state.gradCurrent.g1) * lerpSpeed;
      state.gradCurrent.b1 += (state.gradTarget.b1 - state.gradCurrent.b1) * lerpSpeed;
      state.gradCurrent.r2 += (state.gradTarget.r2 - state.gradCurrent.r2) * lerpSpeed;
      state.gradCurrent.g2 += (state.gradTarget.g2 - state.gradCurrent.g2) * lerpSpeed;
      state.gradCurrent.b2 += (state.gradTarget.b2 - state.gradCurrent.b2) * lerpSpeed;

      // 5. Draw Canvas Gradients
      const w = container.clientWidth;
      const h = container.clientHeight;

      ctx.fillStyle = "#121213";
      ctx.fillRect(0, 0, w, h);

      // Float gradient coordinates using trig cycles
      const timeSec = t * 0.00035;
      const cx = w * 0.5;
      const cy = h * 0.5;
      const amp1 = Math.min(w, h) * 0.35;
      const amp2 = Math.min(w, h) * 0.28;

      const x1 = cx + Math.cos(timeSec) * amp1;
      const y1 = cy + Math.sin(timeSec * 0.8) * amp1 * 0.45;
      const x2 = cx + Math.cos(-timeSec * 0.9 + 1.25) * amp2;
      const y2 = cy + Math.sin(-timeSec * 0.7 + 0.75) * amp2 * 0.55;

      const radius1 = Math.max(w, h) * 0.72;
      const radius2 = Math.max(w, h) * 0.65;

      // Draw first radial glow
      const g1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, radius1);
      g1.addColorStop(0, `rgba(${Math.round(state.gradCurrent.r1)}, ${Math.round(state.gradCurrent.g1)}, ${Math.round(state.gradCurrent.b1)}, 0.48)`);
      g1.addColorStop(1, "rgba(18, 18, 19, 0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // Draw second radial glow
      const g2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, radius2);
      g2.addColorStop(0, `rgba(${Math.round(state.gradCurrent.r2)}, ${Math.round(state.gradCurrent.g2)}, ${Math.round(state.gradCurrent.b2)}, 0.35)`);
      g2.addColorStop(1, "rgba(18, 18, 19, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
      className="relative w-full h-[580px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none border border-white/10 shadow-2xl bg-[#121213]"
      style={{ touchAction: "none" }}
    >
      
      {/* Dynamic Liquid Canvas Gradient Background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Grid Overlay Text Frame */}
      <header className="absolute top-6 left-6 z-30 pointer-events-none flex flex-col gap-1">
        <h3 className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-white/50">
          Infinite 3D Slider
        </h3>
        <h4 className="text-xl font-black uppercase text-white tracking-tight leading-none">
          GRADIENT CAROUSEL
        </h4>
      </header>

      {/* Drag Hint Overlay */}
      <div className="absolute top-6 right-6 z-30 pointer-events-none flex items-center gap-2 bg-black/40 border border-white/15 px-3 py-1.5 rounded-full backdrop-blur-md text-[10px] text-white/70 font-extrabold tracking-wider">
        <Move className="w-3.5 h-3.5" />
        <span>DRAG TO SCROLL</span>
      </div>

      {/* Active Color Info Overlay */}
      <div className="absolute bottom-6 left-6 z-30 pointer-events-none bg-black/45 border border-white/10 p-3.5 rounded-xl backdrop-blur-md flex flex-col gap-1 select-none max-w-[220px]">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-white/80 shrink-0" />
          <span className="text-[10px] font-black uppercase tracking-wider text-white">
            Palette Info
          </span>
        </div>
        <p className="text-[11px] text-neutral-400 mt-1 leading-normal font-semibold">
          Active colors matching card {activeIndex + 1} are blending dynamically across the canvas background.
        </p>
      </div>

      {/* 3D Stage Viewport */}
      <div 
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
        style={{ perspective: "1000px" }}
      >
        
        {/* Track holding all card blocks */}
        <div 
          ref={cardsRootRef}
          className="relative w-full h-full transform-style-3d pointer-events-none"
        >
          {IMAGES.map((src, idx) => (
            <article
              key={idx}
              className="absolute top-1/2 left-1/2 rounded-xl overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl transition-shadow duration-300 select-none pointer-events-auto cursor-pointer flex flex-col"
              style={{
                width: "var(--card-w, 240px)",
                height: "var(--card-h, 320px)",
                transform: "translate3d(0, -50%, 0)",
                willChange: "transform, filter",
                "--card-w": `${stateRef.current.cardW}px`,
                "--card-h": `${stateRef.current.cardH}px`,
              } as React.CSSProperties}
            >
              {/* Card Image */}
              <img
                src={src}
                alt={`Slide ${idx + 1}`}
                draggable={false}
                className="w-full h-full object-cover select-none pointer-events-none"
              />

              {/* Minimal Card Number Overlay */}
              <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-white font-black text-xs px-2.5 py-1 rounded-lg backdrop-blur">
                {(idx + 1).toString().padStart(2, "0")}
              </div>
            </article>
          ))}
        </div>

      </div>

    </div>
  );
}
