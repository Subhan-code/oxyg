"use client"
import { Field as FieldPrimitive } from "@base-ui/react/field"
import * as React from "react"
import { cn } from "../../../lib/utils"

export const Field = React.forwardRef<
  React.ElementRef<typeof FieldPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof FieldPrimitive.Root>
>(({ className, ...props }, ref) => (
  <FieldPrimitive.Root
    ref={ref}
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
))
Field.displayName = "Field"

export const FieldLabel = React.forwardRef<
  React.ElementRef<typeof FieldPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof FieldPrimitive.Label>
>(({ className, ...props }, ref) => (
  <FieldPrimitive.Label
    ref={ref}
    className={cn("text-sm font-medium leading-none", className)}
    {...props}
  />
))
FieldLabel.displayName = "FieldLabel"

