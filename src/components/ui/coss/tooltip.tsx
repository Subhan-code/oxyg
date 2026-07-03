"use client"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import * as React from "react"
import { cn } from "../../../lib/utils"

export const TooltipProvider = TooltipPrimitive.Provider
export const Tooltip = TooltipPrimitive.Root

export const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Trigger ref={ref as any} className={className} {...props} />
))
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipPortal = TooltipPrimitive.Portal as any

export const TooltipPopup = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Popup>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Popup>
>(({ className, ...props }, ref) => (
  <TooltipPortal>
    <TooltipPrimitive.Positioner sideOffset={4}>
      <TooltipPrimitive.Popup
        ref={ref}
        className={cn(
          "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      />
    </TooltipPrimitive.Positioner>
  </TooltipPortal>
))
TooltipPopup.displayName = "TooltipPopup"

