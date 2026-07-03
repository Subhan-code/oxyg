"use client";

import React, {
  RefObject,
  useEffect,
  useId,
  useState,
  useCallback,
} from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  repeat?: number;
  repeatDelay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 5,
  delay = 0,
  repeat = Infinity,
  repeatDelay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  // Gradient coordinates
  const [coords, setCoords] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });

  const updatePath = useCallback(() => {
    if (!containerRef.current || !fromRef.current || !toRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const fromRect = fromRef.current.getBoundingClientRect();
    const toRect = toRef.current.getBoundingClientRect();

    const width = containerRect.width;
    const height = containerRect.height;

    setSvgDimensions({ width, height });

    const startX =
      fromRect.left - containerRect.left + fromRect.width / 2 + startXOffset;
    const startY =
      fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;
    const endX =
      toRect.left - containerRect.left + toRect.width / 2 + endXOffset;
    const endY =
      toRect.top - containerRect.top + toRect.height / 2 + endYOffset;

    setCoords({ x1: startX, y1: startY, x2: endX, y2: endY });

    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    let controlX = midX;
    let controlY = midY;

    // Determine direction to apply curvature naturally
    if (Math.abs(startX - endX) > Math.abs(startY - endY)) {
      // Horizontal path -> offset vertically
      controlY += curvature;
    } else {
      // Vertical path -> offset horizontally
      controlX += curvature;
    }

    const path = `M ${startX} ${startY} Q ${controlX} ${controlY}, ${endX} ${endY}`;
    setPathD(path);
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  useEffect(() => {
    const container = containerRef.current;
    const fromEl = fromRef.current;
    const toEl = toRef.current;

    if (!container || !fromEl || !toEl) return;

    const observer = new ResizeObserver(() => {
      updatePath();
    });

    observer.observe(container);
    observer.observe(fromEl);
    observer.observe(toEl);

    // Initial path calculation
    updatePath();

    window.addEventListener("resize", updatePath);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePath);
    };
  }, [containerRef, fromRef, toRef, updatePath]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
      className={cn(
        "pointer-events-none absolute left-0 top-0 select-none z-10",
        className
      )}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <motion.path
        d={pathD}
        stroke={`url(#${id})`}
        strokeWidth={pathWidth}
        strokeOpacity="1"
        strokeLinecap="round"
        initial={{
          pathLength: 0.2,
          pathOffset: reverse ? 1.0 : -0.2,
        }}
        animate={{
          pathOffset: reverse ? -0.2 : 1.0,
        }}
        transition={{
          repeat: repeat,
          repeatDelay: repeatDelay,
          duration: duration,
          delay: delay,
          ease: "linear",
        }}
      />
      <defs>
        <linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          x1={coords.x1}
          y1={coords.y1}
          x2={coords.x2}
          y2={coords.y2}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="30%" stopColor={gradientStartColor} stopOpacity="1" />
          <stop offset="70%" stopColor={gradientStopColor} stopOpacity="1" />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default AnimatedBeam;


