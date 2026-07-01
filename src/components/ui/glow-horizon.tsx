import { motion } from "motion/react";

interface GlowHorizonProps {
  variant?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export default function GlowHorizonFM({ variant = "top", className = "" }: GlowHorizonProps) {
  // Define positions based on the variant
  const positionClasses = {
    top: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]",
    bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[400px]",
    left: "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[400px] h-[800px]",
    right: "right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[400px] h-[800px]",
  };

  // Animated breathing radial gradient effect
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Primary Radial Glow */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.7, 0.85, 0.7],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute rounded-full blur-[100px] md:blur-[140px] pointer-events-none -z-10 ${positionClasses[variant]}`}
        style={{
          background: "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.22) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 80%)"
        }}
      />

      {/* Secondary Accent Glow */}
      <motion.div
        animate={{
          scale: [1.08, 0.95, 1.08],
          opacity: [0.4, 0.55, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className={`absolute rounded-full blur-[120px] md:blur-[160px] pointer-events-none -z-10 ${
          variant === "top" ? "top-0 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[600px] h-[300px]" :
          variant === "bottom" ? "bottom-0 left-1/2 -translate-x-1/2 translate-y-[40%] w-[600px] h-[300px]" :
          variant === "left" ? "left-0 top-1/2 -translate-y-1/2 -translate-x-[40%] w-[300px] h-[600px]" :
          "right-0 top-1/2 -translate-y-1/2 translate-x-[40%] w-[300px] h-[600px]"
        }`}
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, rgba(99, 102, 241, 0.02) 60%, transparent 80%)"
        }}
      />
    </div>
  );
}
