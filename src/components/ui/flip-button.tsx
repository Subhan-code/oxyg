"use client";

import React from "react";

interface FlipButtonProps {
  frontText?: string;
  backText?: string;
  onClick?: () => void;
  className?: string;
}

export function FlipButton({
  frontText = "Hover Me",
  backText = "Unlocked!",
  onClick,
  className = "",
}: FlipButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-full border border-neutral-200 bg-white px-8 py-3.5 font-extrabold text-neutral-800 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer text-sm ${className}`}
    >
      <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-10">
        {frontText}
      </span>
      <span className="absolute inset-0 flex items-center justify-center translate-y-10 transition-transform duration-500 ease-out group-hover:translate-y-0 text-indigo-600">
        {backText}
      </span>
    </button>
  );
}

export default FlipButton;
