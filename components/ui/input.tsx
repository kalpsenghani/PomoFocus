import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          // Smooth transitions
          "transition-colors transition-shadow duration-200",
          // Hover/focus glow effect (cyan + purple brand)
          "hover:bg-white/5 hover:shadow-[0_0_18px_rgba(0,255,255,0.15)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FFFF]/40 focus-visible:ring-offset-2 focus:bg-white/5 focus:shadow-[0_0_28px_rgba(0,255,255,0.25)]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
