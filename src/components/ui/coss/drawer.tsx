"use client"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"
import * as React from "react"
import { cn } from "../../../lib/utils"

export const Drawer = DrawerPrimitive.Root

export const DrawerTrigger = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Trigger ref={ref as any} className={className} {...props} />
))
DrawerTrigger.displayName = "DrawerTrigger"

export const DrawerClose = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Close>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Close ref={ref as any} className={className} {...props} />
))
DrawerClose.displayName = "DrawerClose"

export const DrawerPopup = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Popup>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Popup> & { showBar?: boolean }
>(({ className, showBar, children, ...props }, ref) => (
  <DrawerPrimitive.Portal>
    <DrawerPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/60 data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[starting-style]:animate-in data-[starting-style]:fade-in-0" />
    <DrawerPrimitive.Popup
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-xl border bg-background data-[ending-style]:animate-out data-[ending-style]:slide-out-to-bottom data-[starting-style]:animate-in data-[starting-style]:slide-in-from-bottom flex-1 py-4",
        className
      )}
      {...props}
    >
      <div className="absolute left-1/2 top-0 mt-3 h-1.5 w-12 -translate-x-1/2 rounded-full bg-muted data-[visible=false]:hidden" data-visible={showBar ? "" : "false"} />
      {showBar && <div className="mt-6" />}
      {children}
    </DrawerPrimitive.Popup>
  </DrawerPrimitive.Portal>
))
DrawerPopup.displayName = "DrawerPopup"

export const DrawerContent = DrawerPopup /* backward compatibility */

export const DrawerHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
))
DrawerHeader.displayName = "DrawerHeader"

export const DrawerFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "bare" }
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-auto flex flex-col gap-2 p-4",
      variant === "bare" && "p-4 sm:flex-row sm:justify-start gap-2",
      className
    )}
    {...props}
  />
))
DrawerFooter.displayName = "DrawerFooter"

export const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
DrawerTitle.displayName = "DrawerTitle"

export const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = "DrawerDescription"

