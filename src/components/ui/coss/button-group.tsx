import * as React from "react"
import { cn } from "../../../lib/utils"

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center justify-center [&>button]:rounded-none [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md [&>button:not(:first-child)]:-ml-px",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
ButtonGroup.displayName = "ButtonGroup"

