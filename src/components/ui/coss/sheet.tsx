"use client"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import * as React from "react"
import { cn } from "../../../lib/utils"

export const Sheet = DialogPrimitive.Root

export const SheetTrigger = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Trigger ref={ref as any} className={className} {...props} />
))
SheetTrigger.displayName = "SheetTrigger"

export const SheetClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Close ref={ref as any} className={className} {...props} />
))
SheetClose.displayName = "SheetClose"

export const SheetPopup = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Popup>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Popup>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/60 data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[starting-style]:animate-in data-[starting-style]:fade-in-0" />
    <DialogPrimitive.Popup
      ref={ref}
      className={cn(
        "fixed inset-y-0 right-0 z-50 w-full max-w-sm flex flex-col border-l bg-background shadow-lg data-[ending-style]:animate-out data-[ending-style]:slide-out-to-right data-[starting-style]:animate-in data-[starting-style]:slide-in-from-right py-4",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Popup>
  </DialogPrimitive.Portal>
))
SheetPopup.displayName = "SheetPopup"

export const SheetHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5 p-4 sm:text-left", className)}
    {...props}
  />
))
SheetHeader.displayName = "SheetHeader"

export const SheetFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-auto flex flex-col gap-2 p-4 sm:flex-row sm:justify-end sm:gap-2", className)}
    {...props}
  />
))
SheetFooter.displayName = "SheetFooter"

export const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground tracking-tight leading-none", className)}
    {...props}
  />
))
SheetTitle.displayName = "SheetTitle"

export const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = "SheetDescription"

export const SheetPanel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4", className)}
    {...props}
  />
))
SheetPanel.displayName = "SheetPanel"

