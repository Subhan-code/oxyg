"use client";

import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'motion/react';
import { cn } from '@/lib/utils';

export interface SimpleMarqueeProps {
  children: React.ReactNode;
  className?: string;
  baseVelocity?: number;
  repeat?: number;
  draggable?: boolean;
  scrollSpringConfig?: { damping: number; stiffness: number };
  slowDownFactor?: number;
  slowdownOnHover?: boolean;
  slowDownSpringConfig?: { damping: number; stiffness: number };
  scrollAwareDirection?: boolean;
  scrollContainer?: React.RefObject<HTMLElement | null>;
  useScrollVelocity?: boolean;
  direction?: 'left' | 'right';
}

export function SimpleMarquee({
  children,
  className,
  baseVelocity = 5,
  repeat = 4,
  draggable = false,
  scrollSpringConfig = { damping: 50, stiffness: 400 },
  slowDownFactor = 0.3,
  slowdownOnHover = true,
  slowDownSpringConfig = { damping: 60, stiffness: 300 },
  scrollAwareDirection = true,
  scrollContainer,
  useScrollVelocity = true,
  direction = 'left'
}: SimpleMarqueeProps) {
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [detectedContainer, setDetectedContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (scrollContainer) return;
    if (!containerRef.current) return;
    let parent = containerRef.current.parentElement;
    while (parent) {
      const overflow = window.getComputedStyle(parent).overflowY;
      if (overflow === 'auto' || overflow === 'scroll') {
        if (parent !== document.body && parent !== document.documentElement) {
          setDetectedContainer(parent);
          break;
        }
      }
      parent = parent.parentElement;
    }
  }, [scrollContainer]);
  
  // Track scroll container or window scroll
  const { scrollY } = useScroll({
    container: scrollContainer || (detectedContainer ? { current: detectedContainer } : undefined)
  });
  
  const scrollVelocity = useVelocity(scrollY);
  
  // Smooth scroll velocity using a spring
  const smoothVelocity = useSpring(scrollVelocity, scrollSpringConfig);
  
  // Map smooth velocity to a multiplier
  const velocityFactor = useTransform(smoothVelocity, [ -1000, 0, 1000 ], [ -5, 1, 5 ], {
    clamp: false
  });

  // Track hover speed factor
  const hoverFactor = useMotionValue(1);
  const smoothHoverFactor = useSpring(hoverFactor, slowDownSpringConfig);

  const directionFactor = useRef<number>(direction === 'right' ? 1 : -1);

  useAnimationFrame((time, delta) => {
    // Determine base delta change
    const safeDelta = Math.min(delta, 32);
    
    // Normal constant velocity
    let moveBy = directionFactor.current * baseVelocity * (safeDelta / 16);

    // Apply scroll velocity factor if enabled
    if (useScrollVelocity) {
      const scrollFactor = velocityFactor.get();
      if (scrollAwareDirection) {
        if (scrollFactor < 0) {
          directionFactor.current = 1; // reverse direction on upward scroll
        } else if (scrollFactor > 0) {
          directionFactor.current = -1; // default forward direction
        }
      }
      moveBy += directionFactor.current * Math.abs(scrollFactor) * baseVelocity * (safeDelta / 16) * 0.15;
    }

    // Apply hover slowdown if hovered
    const hFactor = smoothHoverFactor.get();
    moveBy *= hFactor;

    baseX.set(baseX.get() + moveBy);
  });

  // Custom wrap function to cycle baseX between 0 and -100/repeat
  const wrapLimit = 100 / repeat;
  const x = useTransform(baseX, (v) => {
    const wrapped = ((((v + wrapLimit) % wrapLimit) + wrapLimit) % wrapLimit) - wrapLimit;
    return `${wrapped}%`;
  });

  const handleMouseEnter = () => {
    if (slowdownOnHover) {
      hoverFactor.set(slowDownFactor);
    }
  };

  const handleMouseLeave = () => {
    hoverFactor.set(1);
  };

  return (
    <div 
      ref={containerRef}
      className={cn("overflow-hidden w-full relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        className="flex whitespace-nowrap"
        style={{ x }}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <div key={i} className="flex shrink-0">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default SimpleMarquee;
