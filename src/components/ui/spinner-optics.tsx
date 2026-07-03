import * as React from "react";
import { cn } from "@/lib/utils";

export interface SpinnerOpticsProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: string;
  className?: string;
}

export function SpinnerOptics({ size = "size-6", className, ...props }: SpinnerOpticsProps) {
  const bars = Array(12).fill(0);
  return (
    <div className={cn(size, className)} {...props}>
      <div className={cn("relative top-1/2 left-1/2 h-[inherit] w-[inherit]")}>
        {bars.map((_, i) => (
          <div
            key={`spinner-bar-${String(i)}`}
            aria-label={`spinner-bar-${i + 1}`}
            className={cn(
              "-left-[10%] -top-[3.9%] absolute h-[8%] w-[24%] animate-spinner rounded-md bg-primary",
              `bar:nth-child(${i + 1})`
            )}
            style={{
              animationDelay: `-${1.3 - i * 0.1}s`,
              transform: `rotate(${30 * i}deg) translate(146%)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
SpinnerOptics.displayName = "SpinnerOptics";
