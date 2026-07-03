"use client"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import * as React from "react"
import { cn } from "../../../lib/utils"

export const Select = SelectPrimitive.Root

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm hover:bg-accent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
))
SelectTrigger.displayName = "SelectTrigger"

export const SelectValue = SelectPrimitive.Value

export const SelectPopup = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Popup>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Popup>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Positioner className="z-50 w-[var(--anchor-width)]">
      <SelectPrimitive.Popup
        ref={ref}
        className={cn(
          "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:zoom-out-95 data-[starting-style]:animate-in data-[starting-style]:fade-in-0 data-[starting-style]:zoom-in-95",
          className
        )}
        {...props}
      >
        <div className="p-1">{children}</div>
      </SelectPrimitive.Popup>
    </SelectPrimitive.Positioner>
  </SelectPrimitive.Portal>
))
SelectPopup.displayName = "SelectPopup"

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <div className="h-2 w-2 rounded-full bg-current" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = "SelectItem"

