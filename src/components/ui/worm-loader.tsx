"use client";

import { motion } from "motion/react";

export function WormLoader() {
  const dots = [0, 1, 2, 3, 4];
  const blueColors = [
    "#1e3a8a", // Deep Indigo Blue
    "#1d4ed8", // Classic Blue
    "#2563eb", // Royal Blue
    "#3b82f6", // Vibrant Sky Blue
    "#60a5fa", // Soft Light Blue
  ];

  return (
    <div className="flex items-center justify-center gap-2.5 py-6">
      {dots.map((index) => (
        <motion.div
          key={index}
          className="w-3.5 h-3.5 rounded-full"
          style={{ backgroundColor: blueColors[index] }}
          animate={{
            y: [-8, 8, -8],
          }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.14,
          }}
        />
      ))}
    </div>
  );
}

export default WormLoader;
