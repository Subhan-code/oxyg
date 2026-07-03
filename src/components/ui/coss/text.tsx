"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "../../../lib/utils"

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "shine" | "generate-effect" | "hover-enter"
  children: React.ReactNode
}

export const Text = React.forwardRef<HTMLDivElement, TextProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    if (variant === "shine") {
      return (
        <div
          ref={ref}
          className={cn(
            "text-foreground text-xl font-medium font-sans",
            className
          )}
          {...props}
        >
          {children}
        </div>
      )
    }

    if (variant === "generate-effect") {
      return (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.05 }}
          className={cn("text-xl font-medium text-foreground font-sans", className)}
          {...(props as any)}
        >
          {children}
        </motion.div>
      )
    }

    if (variant === "hover-enter") {
      return (
        <motion.div
          ref={ref}
          whileHover={{ letterSpacing: "0.2em" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn("text-xl font-medium text-foreground cursor-pointer transition-all font-sans", className)}
          {...(props as any)}
        >
          {children}
        </motion.div>
      )
    }

    return (
      <div ref={ref} className={cn("text-foreground font-sans", className)} {...props}>
        {children}
      </div>
    )
  }
)
Text.displayName = "Text"

