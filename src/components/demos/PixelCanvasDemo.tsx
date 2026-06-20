"use client";

import React, { useEffect, useRef } from "react";

// Pixel particle class mapping exact canvas coordinate rendering and shimmer speeds
class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size
    );
  }

  appear() {
    this.isIdle = false;

    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }

    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }

    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }

    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;

    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }

    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }

    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

// React component wrapping the canvas rendering loop
interface PixelCanvasProps {
  colors?: string[];
  gap?: number;
  speed?: number;
  noFocus?: boolean;
}

export function PixelCanvas({
  colors = ["#f8fafc", "#f1f5f9", "#cbd5e1"],
  gap = 5,
  speed = 35,
  noFocus = false,
}: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const timeInterval = 1000 / 60;
    let animationId: number | null = null;
    let timePrevious = performance.now();
    const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const getDistanceToCanvasCenter = (x: number, y: number) => {
      const dx = x - canvas.width / 2;
      const dy = y - canvas.height / 2;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const createPixels = () => {
      const pixels: Pixel[] = [];
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const parsedGap = Math.max(4, Math.min(50, gap));
      const throttle = 0.001;
      const parsedSpeed = speed <= 0 || reducedMotion ? 0 : speed * throttle;

      for (let x = 0; x < canvas.width; x += parsedGap) {
        for (let y = 0; y < canvas.height; y += parsedGap) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          const delay = reducedMotion ? 0 : getDistanceToCanvasCenter(x, y);
          pixels.push(new Pixel(canvas, ctx, x, y, color, parsedSpeed, delay));
        }
      }
      pixelsRef.current = pixels;
    };

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      createPixels();
    };

    const resizeObserver = new ResizeObserver(() => init());
    resizeObserver.observe(canvas);

    const animate = (fnName: "appear" | "disappear") => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const loop = () => {
        animationId = requestAnimationFrame(loop);

        const timeNow = performance.now();
        const timePassed = timeNow - timePrevious;

        if (timePassed < timeInterval) return;

        timePrevious = timeNow - (timePassed % timeInterval);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const pixels = pixelsRef.current;
        for (let i = 0; i < pixels.length; i++) {
          pixels[i][fnName]();
        }

        if (pixels.every((pixel) => pixel.isIdle)) {
          if (animationId) cancelAnimationFrame(animationId);
        }
      };

      animationId = requestAnimationFrame(loop);
    };

    const handleAnimation = (name: "appear" | "disappear") => {
      if (animationId) cancelAnimationFrame(animationId);
      animate(name);
    };

    const onMouseEnter = () => handleAnimation("appear");
    const onMouseLeave = () => handleAnimation("disappear");
    const onFocusIn = (e: FocusEvent) => {
      if (parent.contains(e.relatedTarget as Node)) return;
      handleAnimation("appear");
    };
    const onFocusOut = (e: FocusEvent) => {
      if (parent.contains(e.relatedTarget as Node)) return;
      handleAnimation("disappear");
    };

    // Attach listeners directly to parent node
    parent.addEventListener("mouseenter", onMouseEnter);
    parent.addEventListener("mouseleave", onMouseLeave);

    if (!noFocus) {
      parent.addEventListener("focusin", onFocusIn as EventListener);
      parent.addEventListener("focusout", onFocusOut as EventListener);
    }

    // Initial load sizing
    init();

    return () => {
      resizeObserver.disconnect();
      if (animationId) cancelAnimationFrame(animationId);
      parent.removeEventListener("mouseenter", onMouseEnter);
      parent.removeEventListener("mouseleave", onMouseLeave);
      if (!noFocus) {
        parent.removeEventListener("focusin", onFocusIn as EventListener);
        parent.removeEventListener("focusout", onFocusOut as EventListener);
      }
    };
  }, [colors, gap, speed, noFocus]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function PixelCanvasDemo() {
  return (
    <div className="pixel-canvas-wrapper w-full h-[400px] md:h-[480px] rounded-2xl overflow-hidden relative select-none">
      
      {/* Scoped CSS styles matching raw design layout */}
      <style dangerouslySetInnerHTML={{ __html: `
        .pixel-canvas-wrapper {
          --space: 1rem;
          --bg: #09090b;
          --fg: #e3e3e3;
          --surface-1: #101012;
          --surface-2: #27272a;
          --surface-3: #52525b;
          --ease-out: cubic-bezier(0.5, 1, 0.89, 1);
          --ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);
          background-color: var(--bg);
          color: var(--fg);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: var(--space);
        }
        .pixel-canvas-wrapper main {
          display: grid;
          grid-template-columns: repeat(var(--count, 1), 1fr);
          gap: var(--space);
          margin: auto;
          inline-size: min(var(--max, 15rem), 100%);
        }
        @media (min-width: 25rem) {
          .pixel-canvas-wrapper main {
            --count: 2;
            --max: 30rem;
          }
        }
        @media (min-width: 45rem) {
          .pixel-canvas-wrapper main {
            --count: 4;
            --max: 60rem;
          }
        }
        .pixel-canvas-wrapper .card {
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-areas: "card";
          place-items: center;
          aspect-ratio: 4/5;
          border: 1px solid var(--surface-2);
          isolation: isolate;
          transition: border-color 200ms var(--ease-out);
          user-select: none;
          background: var(--bg);
          border-radius: 12px;
          cursor: pointer;
        }
        .pixel-canvas-wrapper .card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at bottom left,
            transparent 55%,
            var(--surface-1)
          );
          pointer-events: none;
          box-shadow: var(--bg) -0.5cqi 0.5cqi 2.5cqi inset;
          transition: opacity 900ms var(--ease-out);
          border-radius: 12px;
        }
        .pixel-canvas-wrapper .card::after {
          content: "";
          position: absolute;
          inset: 0;
          margin: auto;
          aspect-ratio: 1;
          background: radial-gradient(circle, var(--bg), transparent 65%);
          opacity: 0;
          transition: opacity 800ms var(--ease-out);
          border-radius: 12px;
        }
        .pixel-canvas-wrapper .card > * {
          grid-area: card;
        }
        .pixel-canvas-wrapper .card svg {
          position: relative;
          z-index: 1;
          width: 30%;
          height: auto;
          color: var(--surface-3);
          transition: 300ms var(--ease-out);
          transition-property: color, scale;
        }
        .pixel-canvas-wrapper .card button {
          opacity: 0;
        }
        .pixel-canvas-wrapper .card:focus-within {
          outline: 5px auto Highlight;
          outline: 5px auto -webkit-focus-ring-color;
        }
        .pixel-canvas-wrapper .card:where(:hover, :focus-within) {
          border-color: var(--active-color, var(--fg));
          transition: border-color 800ms var(--ease-in-out);
        }
        .pixel-canvas-wrapper .card:where(:hover, :focus-within) svg {
          color: var(--active-color, var(--fg));
          scale: 1.1;
          transition: 300ms var(--ease-in-out);
        }
        .pixel-canvas-wrapper .card:where(:hover, :focus-within)::before {
          opacity: 0;
        }
        .pixel-canvas-wrapper .card:where(:hover, :focus-within)::after {
          opacity: 1;
        }
      `}} />

      {/* Frame cards main list layout */}
      <main className="w-full">
        
        {/* Card 1 */}
        <div className="card">
          <PixelCanvas />
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
            <path d="M216,42H40A14,14,0,0,0,26,56V200a14,14,0,0,0,14,14H216a14,14,0,0,0,14-14V56A14,14,0,0,0,216,42ZM40,54H216a2,2,0,0,1,2,2V98H38V56A2,2,0,0,1,40,54ZM38,200V110H98v92H40A2,2,0,0,1,38,200Zm178,2H110V110H218v90A2,2,0,0,1,216,202Z" />
          </svg>
          <button>Layout</button>
        </div>

        {/* Card 2 */}
        <div className="card" style={{ "--active-color": "#e0f2fe" } as React.CSSProperties}>
          <PixelCanvas gap={10} speed={25} colors={["#e0f2fe", "#7dd3fc", "#0ea5e9"]} />
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
            <path d="M67.84,92.61,25.37,128l42.47,35.39a6,6,0,1,1-7.68,9.22l-48-40a6,6,0,0,1,0-9.22l48-40a6,6,0,0,1,7.68,9.22Zm176,30.78-48-40a6,6,0,1,0-7.68,9.22L230.63,128l-42.47,35.39a6,6,0,1,0,7.68,9.22l48-40a6,6,0,0,0,0-9.22Zm-81.79-89A6,6,0,0,0,154.36,38l-64,176A6,6,0,0,0,94,221.64a6.15,6.15,0,0,0,2,.36,6,6,0,0,0,5.64-3.95l64-176A6,6,0,0,0,162.05,34.36Z" />
          </svg>
          <button>Code</button>
        </div>

        {/* Card 3 */}
        <div className="card" style={{ "--active-color": "#fef08a" } as React.CSSProperties}>
          <PixelCanvas gap={3} speed={20} colors={["#fef08a", "#fde047", "#eab308"]} />
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
            <path d="M180,146H158V110h22a34,34,0,1,0-34-34V98H110V76a34,34,0,1,0-34,34H98v36H76a34,34,0,1,0,34,34V158h36v22a34,34,0,1,0,34-34ZM158,76a22,22,0,1,1,22,22H158ZM54,76a22,22,0,0,1,44,0V98H76A22,22,0,0,1,54,76ZM98,180a22,22,0,1,1-22-22H98Zm12-70h36v36H110Zm70,92a22,22,0,0,1-22-22V158h22a22,22,0,0,1,0,44Z" />
          </svg>
          <button>Command</button>
        </div>

        {/* Card 4 */}
        <div className="card" style={{ "--active-color": "#fecdd3" } as React.CSSProperties}>
          <PixelCanvas gap={6} speed={80} colors={["#fecdd3", "#fda4af", "#e11d48"]} noFocus />
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
            <path d="M222,67.34a33.81,33.81,0,0,0-10.64-24.25C198.12,30.56,176.68,31,163.54,44.18L142.82,65l-.63-.63a22,22,0,0,0-31.11,0l-9,9a14,14,0,0,0,0,19.81l3.47,3.47L53.14,149.1a37.81,37.81,0,0,0-9.84,36.73l-8.31,19a11.68,11.68,0,0,0,2.46,13A13.91,13.91,0,0,0,47.32,222,14.15,14.15,0,0,0,53,220.82L71,212.92a37.92,37.92,0,0,0,35.84-10.07l52.44-52.46,3.47,3.48a14,14,0,0,0,19.8,0l9-9a22.06,22.06,0,0,0,0-31.13l-.66-.65L212,91.85A33.76,33.76,0,0,0,222,67.34Zm-123.61,127a26,26,0,0,1-26,6.47,6,6,0,0,0-4.17.24l-20,8.75a2,2,0,0,1-2.09-.31l9.12-20.9a5.94,5.94,0,0,0,.19-4.31A25.91,25.91,0,0,1,56,166h70.78ZM138.78,154H65.24l48.83-48.84,36.76,36.78Zm64.77-70.59L178.17,108.9a6,6,0,0,0,0,8.47l4.88,4.89a10,10,0,0,1,0,14.15l-9,9a2,2,0,0,1-2.82,0l-60.69-60.7a2,2,0,0,1,0-2.83l9-9a10,10,0,0,1,14.14,0l4.89,4.89a6,6,0,0,0,4.24,1.75h0a6,6,0,0,0,4.25-1.77L172,52.66c8.57-8.58,22.51-9,31.07-.85a22,22,0,0,1,.44,31.57Z" />
          </svg>
          <button>Dropper</button>
        </div>

      </main>

    </div>
  );
}
