"use client";

import { memo } from "react";
import { motion, Variants, HTMLMotionProps } from "motion/react";
import { cn } from "../../lib/utils";

export interface OrbitalSpinnerProps extends HTMLMotionProps<"div"> {
  /** Size of the spinner */
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: {
    container: "size-12",
    core: "size-2.5",
    satellite: "size-1.5",
    pathWidth: "border-[0.5px]",
  },
  md: {
    container: "size-20",
    core: "size-4",
    satellite: "size-2.5",
    pathWidth: "border-[1px]",
  },
  lg: {
    container: "size-32",
    core: "size-6",
    satellite: "size-4",
    pathWidth: "border-[1.5px]",
  },
} as const;

const containerVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const OrbitalSpinner = memo(({ size = "sm", className, ...props }: OrbitalSpinnerProps) => {
  const config = sizeConfig[size];

  return (
    <motion.div
      animate="animate"
      initial="initial"
      variants={containerVariants}
      className={cn("relative flex items-center justify-center", config.container, className)}
      {...props}
    >
      {/* Central Core */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className={cn("rounded-full bg-foreground z-10", config.core)}
      />

      {/* Orbital Path */}
      <div
        className={cn(
          "absolute rounded-full border-foreground/10 size-full",
          config.pathWidth
        )}
      />

      {/* Rotating Satellite */}
      <motion.div
        animate={{ rotate: 360 }}
        className="absolute inset-0"
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      >
        <div
          className={cn(
            "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground",
            config.satellite
          )}
        />
      </motion.div>
    </motion.div>
  );
});

OrbitalSpinner.displayName = "OrbitalSpinner";
export default OrbitalSpinner;


