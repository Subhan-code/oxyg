"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { cn } from '../../lib/utils';

export interface InlineRevealImageProps {
  src: string;
  alt?: string;
  className?: string;
  containerProgress: any; // MotionValue<number>
  scrollRange: [number, number]; // [startScroll, endScroll] e.g. [0.2, 0.5]
  maxWidth?: number; // max width when fully expanded (default 140)
  heightClassName?: string; // custom height class, e.g. "h-7 sm:h-9 md:h-12"
}

export function InlineRevealImage({
  src,
  alt = "",
  className,
  containerProgress,
  scrollRange,
  maxWidth = 150,
  heightClassName = "h-6 sm:h-8 md:h-10 lg:h-12"
}: InlineRevealImageProps) {
  // Map container scroll progress to width of wrapper div
  const widthTransform = useTransform(containerProgress, scrollRange, [0, maxWidth]);
  // Snappy, fast spring to eliminate drag delay
  const width = useSpring(widthTransform, { stiffness: 380, damping: 32, mass: 0.4 });

  // Map progress to scale of the image itself (from 1.3 zoom to 1.0)
  const scale = useTransform(containerProgress, scrollRange, [1.3, 1.0]);

  // Map progress to opacity of the image
  const opacity = useTransform(containerProgress, scrollRange, [0, 1]);

  // Map progress to rotation of the wrapper div (subtle wiggle rotation)
  const rotateTransform = useTransform(containerProgress, scrollRange, [-4, 0]);
  const rotate = useSpring(rotateTransform, { stiffness: 350, damping: 28 });

  return (
    <motion.div
      style={{ width, rotate, opacity }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      className={cn(
        "inline-block overflow-hidden align-middle mx-1.5 rounded-lg border border-border bg-zinc-900 cursor-pointer relative shadow-sm hover:border-primary/50 hover:shadow-md transition-[border-color,box-shadow] duration-200 will-change-[width,transform]",
        heightClassName,
        className
      )}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ scale }}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </motion.div>
  );
}

export interface ScrollImageTextRevealProps {
  className?: string;
  children: (progress: any) => React.ReactNode;
}

export function ScrollImageTextReveal({
  className,
  children
}: ScrollImageTextRevealProps) {
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
  
  // Track scroll position of this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer ? { current: scrollContainer } : undefined,
    offset: ["start 90%", "end 10%"] // starts when top is 90% down, ends when bottom is 10% down to make reveal snappy and fast
  });

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
    >
      {children(scrollYProgress)}
    </div>
  );
}


