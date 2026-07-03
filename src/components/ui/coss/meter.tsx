"use client"
import { Meter as MeterPrimitive } from "@base-ui/react/meter"
import * as React from "react"
import { cn } from "../../../lib/utils"

export const Meter = React.forwardRef<
  React.ElementRef<typeof MeterPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MeterPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MeterPrimitive.Root
    ref={ref}
    className={cn("flex flex-col gap-2 w-full", className)}
    {...props}
  />
))
Meter.displayName = "Meter"

export const MeterLabel = React.forwardRef<
  React.ElementRef<typeof MeterPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MeterPrimitive.Label>
>(({ className, ...props }, ref) => (
  <MeterPrimitive.Label
    ref={ref}
    className={cn("text-sm font-medium", className)}
    {...props}
  />
))
MeterLabel.displayName = "MeterLabel"

export const MeterValue = React.forwardRef<
  React.ElementRef<typeof MeterPrimitive.Value>,
  React.ComponentPropsWithoutRef<typeof MeterPrimitive.Value>
>(({ className, ...props }, ref) => (
  <MeterPrimitive.Value
    ref={ref}
    className={cn("text-sm font-medium text-muted-foreground", className)}
    {...props}
  />
))
MeterValue.displayName = "MeterValue"

export const MeterTrack = React.forwardRef<
  React.ElementRef<typeof MeterPrimitive.Track>,
  React.ComponentPropsWithoutRef<typeof MeterPrimitive.Track>
>(({ className, ...props }, ref) => (
  <MeterPrimitive.Track
    ref={ref}
    className={cn("h-2 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  />
))
MeterTrack.displayName = "MeterTrack"

export const MeterIndicator = React.forwardRef<
  React.ElementRef<typeof MeterPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof MeterPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <MeterPrimitive.Indicator
    ref={ref}
    className={cn("h-full bg-primary transition-all rounded-full", className)}
    {...props}
  />
))
MeterIndicator.displayName = "MeterIndicator"

