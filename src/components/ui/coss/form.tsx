"use client"
import * as React from "react"
import { cn } from "../../../lib/utils"

export const Form = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => (
  <form
    ref={ref}
    className={cn("contents", className)}
    {...props}
  />
))
Form.displayName = "Form"

