"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { cn } from "../../lib/utils";

export interface SpinningTextProps {
  /** The text string to render around the circle */
  text: string;
  /** Circle radius in px */
  radius?: number;
  /** Character font size in px */
  fontSize?: number;
  /** Seconds for one full revolution (hover halves this) */
  speed?: number;
  /** Spin direction */
  direction?: "normal" | "reverse";
  className?: string;
  /** Center content — defaults to a star icon */
  children?: React.ReactNode;
}

export function SpinningText({
  text,
  radius = 50,
  fontSize = 12,
  speed = 10,
  direction = "normal",
  className,
  children,
}: SpinningTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const characters = text.split("");
  const angleStep = 360 / characters.length;

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ rotate: direction === "normal" ? 360 : -360 }}
        transition={{
          duration: isHovered ? speed / 2 : speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative flex items-center justify-center"
        style={{ width: radius * 2, height: radius * 2 }}
      >
        {characters.map((char, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-0 font-medium uppercase tracking-tighter"
            style={{
              height: radius,
              transform: `translateX(-50%) rotate(${i * angleStep}deg)`,
              fontSize,
              transformOrigin: `center ${radius}px`,
            }}
          >
            {char}
          </span>
        ))}
      </motion.div>
      <div className="absolute flex items-center justify-center">
        {children || <Star className="text-primary fill-primary" size={radius / 2} />}
      </div>
    </div>
  );
}

export default SpinningText;


