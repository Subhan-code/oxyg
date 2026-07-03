"use client";

import React, { useRef, useState, useEffect } from 'react';
import {
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame
} from 'motion/react';
import { cn } from '../../lib/utils';

export interface ScrollVelocityMarqueeProps {
  text: string;
  baseSpeed?: number; // base scrolling speed (pixels per frame or multiplier)
  className?: string;
  textClassName?: string;
}

export function ScrollVelocityMarquee({
  text,
  baseSpeed = 1.5,
  className,
  textClassName
}: ScrollVelocityMarqueeProps) {
  const baseX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let parent = containerRef.current.parentElement;
    while (parent) {
      const overflow = window.getComputedStyle(parent).overflowY;
      if (overflow === 'auto' || overflow === 'scroll') {
        if (parent !== document.body && parent !== document.documentElement) {
          setScrollContainer(parent);
          break;
        }
      }
      parent = parent.parentElement;
    }
  }, []);

  const { scrollY } = useScroll({
    container: scrollContainer ? { current: scrollContainer } : undefined
  });
  const scrollVelocity = useVelocity(scrollY);
  
  // Smooth the scroll velocity using a spring - heavier damping and lower stiffness creates a buttery flywheel feel
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 100,
    mass: 1.2
  });

  // Map the smooth velocity to a speed multiplier and clamp it to prevent overspeeding
  const velocityFactor = useTransform(smoothVelocity, [ -800, 0, 800 ], [ -3.5, 1, 3.5 ], {
    clamp: true
  });

  // Simple wrap function: keeps a value between a range (e.g. -50% and 0%)
  const wrapRange = (v: number) => {
    const range = 50;
    const absoluteVal = Math.abs(v);
    const mod = absoluteVal % range;
    return -mod;
  };

  const textRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((time, delta) => {
    if (!textRef.current) return;

    // Constrain delta to prevent spikes on page load/tab focus
    const safeDelta = Math.min(delta, 32);

    // Determine direction and speed based on velocityFactor
    let moveBy = baseSpeed * (safeDelta / 16);

    // If velocityFactor is active, apply it
    const factor = velocityFactor.get();
    moveBy += factor * baseSpeed * (safeDelta / 16) * 0.12; // smooth scaling factor

    baseX.current -= moveBy;
    
    // Wrap baseX value so it cycles seamlessly
    const wrappedX = wrapRange(baseX.current);
    
    textRef.current.style.transform = `translateX(${wrappedX}%)`;
  });

  // Create a repeated row of text so it spans more than screen width
  const repeatedText = Array(8).fill(text).join(" • ");

  return (
    <div ref={containerRef} className={cn("w-full overflow-hidden whitespace-nowrap flex select-none py-2", className)}>
      <div 
        ref={textRef} 
        className={cn(
          "flex whitespace-nowrap text-2xl md:text-4xl font-extrabold uppercase tracking-tight will-change-transform",
          textClassName
        )}
      >
        <span className="pr-4">{repeatedText} •&nbsp;</span>
        <span className="pr-4">{repeatedText} •&nbsp;</span>
      </div>
    </div>
  );
}


