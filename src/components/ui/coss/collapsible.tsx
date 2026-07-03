"use client"
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"
import * as React from "react"
import { cn } from "../../../lib/utils"

export const Collapsible = CollapsiblePrimitive.Root

export const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger
    ref={ref}
    className={cn(
      "flex items-center justify-between w-full font-medium transition-all [&[data-panel-open]>svg]:rotate-180",
      className
    )}
    {...props}
  />
))
CollapsibleTrigger.displayName = "CollapsibleTrigger"

export const CollapsiblePanel = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Panel>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Panel>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Panel
    ref={ref}
    className={cn(
      "overflow-hidden text-sm data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:slide-out-to-top-1 data-[starting-style]:animate-in data-[starting-style]:fade-in-0 data-[starting-style]:slide-in-from-top-1",
      className
    )}
    {...props}
  />
))
CollapsiblePanel.displayName = "CollapsiblePanel"

