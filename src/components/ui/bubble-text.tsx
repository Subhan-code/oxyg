"use client";

import React from "react";

interface BubbleTextProps {
  text?: string;
  className?: string;
}

export function BubbleText({ text = "BUBBLE TEXT", className = "" }: BubbleTextProps) {
  return (
    <h2 className={`text-center text-4xl md:text-5xl font-black text-neutral-800 tracking-wide select-none ${className}`}>
      {text.split("").map((char, idx) => (
        <span
          key={idx}
          className="inline-block transition-all duration-200 hover:text-indigo-500 hover:-translate-y-3 hover:scale-125"
          style={{ 
            transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)" 
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h2>
  );
}

export default BubbleText;
