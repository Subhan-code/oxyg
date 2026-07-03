import * as React from "react"
import { cn } from "../../../lib/utils"
import { Loader2Icon } from "lucide-react"

export interface SpinnerProps extends React.ComponentProps<"svg"> {}

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <Loader2Icon
      className={cn("animate-spin", className)}
      {...props}
    />
  )
}

