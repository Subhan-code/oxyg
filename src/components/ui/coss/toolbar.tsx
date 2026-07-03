"use client"
import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar"
import * as React from "react"
import { cn } from "../../../lib/utils"

export const Toolbar = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Root
    ref={ref}
    className={cn("flex items-center gap-2 rounded-md border bg-background p-1 shadow-sm", className)}
    {...props}
  />
))
Toolbar.displayName = "Toolbar"

export const ToolbarGroup = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Group>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Group
    ref={ref}
    className={cn("flex items-center gap-1", className)}
    {...props}
  />
))
ToolbarGroup.displayName = "ToolbarGroup"

export const ToolbarButton = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Button>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-sm px-2.5 py-1.5 text-sm transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
))
ToolbarButton.displayName = "ToolbarButton"

export const ToolbarSeparator = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Separator
    ref={ref}
    className={cn("mx-1 h-5 w-[1px] bg-border", className)}
    {...props}
  />
))
ToolbarSeparator.displayName = "ToolbarSeparator"

