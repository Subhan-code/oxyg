import * as React from "react"
import { cn } from "../../lib/utils"

export function BlossomCarousel({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("grid! auto-cols-[200px] snap-x snap-mandatory grid-flow-col gap-4 overflow-x-auto p-4 max-w-full", className)}>
      {children}
    </div>
  )
}

export function BlossomCarouselSlide({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("slide w-full snap-center aspect-[3/4] bg-muted/20 border rounded-2xl flex items-center justify-center relative overflow-hidden", className)} {...props}>
      {children}
    </div>
  )
}


