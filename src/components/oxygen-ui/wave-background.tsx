"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useAnimationFrame } from "motion/react";
import { cn } from "@/lib/utils";

export interface WaveBackgroundProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Fill color of the SVG wave shape. @default "var(--foreground)" */
  fill?: string;
  /** Background color of the container behind the wave. @default "transparent" */
  background?: string;
  /** Whether the wave crest faces down or up. @default "down" */
  direction?: "down" | "up";
  /** "scroll" morphs the wave on scroll. "ambient" runs a continuous sine loop. @default "scroll" */
  variant?: "scroll" | "ambient";
  /** Height of the wave container in pixels. @default 120 */
  height?: number;
  /** Ambient mode only: speed multiplier for looping animation. @default 1 */
  speed?: number;
  /** Ambient mode only: peak-to-trough amplitude of the wave in pixels. @default 28 */
  amplitude?: number;
}

export function WaveBackground({
  fill = "var(--foreground)",
  background = "transparent",
  direction = "down",
  variant = "scroll",
  height = 120,
  speed = 1,
  amplitude = 28,
  className,
  style,
  ...props
}: WaveBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // IntersectionObserver for ambient mode performance
  useEffect(() => {
    if (variant !== "ambient" || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [variant]);

  // Find scroll container for scroll mode
  useEffect(() => {
    if (variant !== "scroll" || !ref.current) return;
    let parent = ref.current.parentElement;
    while (parent) {
      const overflow = window.getComputedStyle(parent).overflowY;
      if (overflow === "auto" || overflow === "scroll") {
        if (parent !== document.body && parent !== document.documentElement) {
          setScrollContainer(parent);
          break;
        }
      }
      parent = parent.parentElement;
    }
  }, [variant]);

  // Scroll mode logic
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainer ? { current: scrollContainer } : undefined,
    offset: ["start end", "end start"]
  });

  const smoothedProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28
  });

  // Flat and wavy paths for scroll variant
  const flatPath = direction === "down"
    ? `M 0 0 C 360 0, 720 0, 1080 0, 1440 0 V ${height} H 0 Z`
    : `M 0 ${height} C 360 ${height}, 720 ${height}, 1080 ${height}, 1440 ${height} V 0 H 0 Z`;

  const wavyPath = direction === "down"
    ? `M 0 35 C 360 85, 720 10, 1080 105, 1440 25 V ${height} H 0 Z`
    : `M 0 85 C 360 15, 720 100, 1080 20, 1440 90 V 0 H 0 Z`;

  const scrollPathTransform = useTransform(
    smoothedProgress,
    [0, 1],
    prefersReducedMotion ? [flatPath, flatPath] : [flatPath, wavyPath]
  );

  // Ambient mode logic
  const timeRef = useRef(0);
  useAnimationFrame((_, delta) => {
    if (variant !== "ambient" || prefersReducedMotion || !isInView || !pathRef.current) return;
    
    // speed multiplier: 1 = ~4s cycle
    timeRef.current += (delta / 1000) * speed * 1.5;
    const t = timeRef.current;
    
    const baseHeight = direction === "down" ? height / 3 : (2 * height) / 3;
    const fillHeight = direction === "down" ? height : 0;
    
    const y0 = baseHeight + Math.sin(t) * amplitude;
    const cp1 = baseHeight + Math.cos(t) * amplitude;
    const cp2 = baseHeight - Math.sin(t) * amplitude;
    const cp3 = baseHeight - Math.cos(t) * amplitude;
    const y4 = baseHeight + Math.sin(t) * amplitude;
    
    const pathStr = `M 0 ${y0} C 360 ${cp1}, 720 ${cp2}, 1080 ${cp3}, 1440 ${y4} V ${fillHeight} H 0 Z`;
    pathRef.current.setAttribute("d", pathStr);
  });

  const initialAmbientPath = prefersReducedMotion 
    ? (direction === "down" 
        ? `M 0 35 C 360 85, 720 10, 1080 105, 1440 25 V ${height} H 0 Z`
        : `M 0 85 C 360 15, 720 100, 1080 20, 1440 90 V 0 H 0 Z`
      )
    : (direction === "down"
        ? `M 0 ${height / 3} C 360 ${height / 3}, 720 ${height / 3}, 1080 ${height / 3}, 1440 ${height / 3} V ${height} H 0 Z`
        : `M 0 ${(2 * height) / 3} C 360 ${(2 * height) / 3}, 720 ${(2 * height) / 3}, 1080 ${(2 * height) / 3}, 1440 ${(2 * height) / 3} V 0 H 0 Z`
      );

  return (
    <div
      ref={ref}
      className={cn("w-full select-none overflow-hidden relative", className)}
      style={{
        height,
        backgroundColor: background,
        ...style
      }}
      {...props}
    >
      <svg
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="none"
        className="w-full h-full block"
      >
        {variant === "scroll" ? (
          <motion.path
            d={scrollPathTransform}
            fill={fill}
          />
        ) : (
          <path
            ref={pathRef}
            d={initialAmbientPath}
            fill={fill}
          />
        )}
      </svg>
    </div>
  );
}
