"use client"
import { cn } from "../../lib/utils"

export type ProgressiveBlurPosition = "top" | "bottom" | "left" | "right" | "both" | "horizontal"

export interface ProgressiveBlurProps {
  /** Additional classes for the blur container. */
  className?: string
  /** Height of the blur zone (vertical positions). */
  height?: string
  /** Width of the blur zone (horizontal positions). */
  width?: string
  /** Which edge(s) to apply the blur. "both" = top+bottom, "horizontal" = left+right. */
  position?: ProgressiveBlurPosition
  /** Blur values (px) from least to most intense. */
  blurLevels?: number[]
  /** Optional content rendered inside the blur zone. */
  children?: React.ReactNode
}

/**
 * ProgressiveBlur
 *
 * Layers multiple `backdrop-filter: blur()` slices with CSS mask gradients
 * to produce a smooth, progressive blur at any edge of any container.
 *
 * Usage (vertical):
 *   <div className="relative overflow-hidden h-[400px]">
 *     <YourScrollableContent />
 *     <ProgressiveBlur position="bottom" height="40%" />
 *   </div>
 *
 * Usage (horizontal marquee):
 *   <div className="relative overflow-hidden">
 *     <MarqueeContent />
 *     <ProgressiveBlur position="horizontal" width="120px" />
 *   </div>
 */
export function ProgressiveBlur({
  className,
  height = "30%",
  width = "120px",
  position = "bottom",
  blurLevels = [0.5, 1, 2, 4, 8, 16, 32, 64],
  children,
}: ProgressiveBlurProps) {
  const n = blurLevels.length

  const renderEdge = (pos: "top" | "bottom" | "left" | "right") => {
    const isVertical = pos === "top" || pos === "bottom"

    const containerStyle: React.CSSProperties = {
      [pos]: 0,
      ...(isVertical
        ? { height, left: 0, right: 0 }
        : { width, top: 0, bottom: 0 }),
    }

    return (
      <div
        aria-hidden
        className={cn("pointer-events-none absolute z-10", className)}
        style={containerStyle}
      >
        {blurLevels.map((blur, i) => {
          const startPct = (i / n) * 100
          const endPct = ((i + 1) / n) * 100

          // Build a mask that covers only this layer's slice
          let mask: string
          if (pos === "bottom") {
            mask = `linear-gradient(to bottom, transparent ${startPct.toFixed(1)}%, black ${startPct.toFixed(1)}%, black ${endPct.toFixed(1)}%, transparent ${endPct.toFixed(1)}%)`
          } else if (pos === "top") {
            mask = `linear-gradient(to top, transparent ${startPct.toFixed(1)}%, black ${startPct.toFixed(1)}%, black ${endPct.toFixed(1)}%, transparent ${endPct.toFixed(1)}%)`
          } else if (pos === "right") {
            mask = `linear-gradient(to right, transparent ${startPct.toFixed(1)}%, black ${startPct.toFixed(1)}%, black ${endPct.toFixed(1)}%, transparent ${endPct.toFixed(1)}%)`
          } else {
            // left
            mask = `linear-gradient(to left, transparent ${startPct.toFixed(1)}%, black ${startPct.toFixed(1)}%, black ${endPct.toFixed(1)}%, transparent ${endPct.toFixed(1)}%)`
          }

          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                maskImage: mask,
                WebkitMaskImage: mask,
              }}
            />
          )
        })}
        {children && pos === "bottom" && (
          <div className="absolute inset-0 flex items-end justify-center pb-4">
            {children}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {(position === "top" || position === "both") && renderEdge("top")}
      {(position === "bottom" || position === "both") && renderEdge("bottom")}
      {(position === "left" || position === "horizontal") && renderEdge("left")}
      {(position === "right" || position === "horizontal") && renderEdge("right")}
    </>
  )
}

export default ProgressiveBlur


