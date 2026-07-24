import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* Led — small glowing indicator. LED colors never become fills; the glow is
   the one place light blooms. */

export type LedStatus = "online" | "warning" | "critical" | "offline"

const ledVariants = cva("inline-block shrink-0 rounded-full", {
  variants: {
    status: {
      online:
        "bg-[var(--led-ok)] shadow-[0_0_0_1px_rgba(0,0,0,0.25),inset_0_-1px_1px_rgba(0,0,0,0.25),0_0_4px_rgba(181,250,21,0.5)]",
      warning:
        "bg-[var(--led-warning)] shadow-[0_0_0_1px_rgba(0,0,0,0.25),inset_0_-1px_1px_rgba(0,0,0,0.25),0_0_4px_rgba(234,242,18,0.5)]",
      critical:
        "bg-[var(--led-critical)] shadow-[0_0_0_1px_rgba(0,0,0,0.25),inset_0_-1px_1px_rgba(0,0,0,0.3),0_0_4px_rgba(251,44,30,0.55)]",
      offline:
        "bg-[var(--led-offline)] shadow-[0_0_0_1px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(0,0,0,0.4)]",
    },
    size: {
      sm: "size-1.5",
      md: "size-2",
    },
  },
  defaultVariants: {
    status: "online",
    size: "md",
  },
})

export interface LedProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof ledVariants> {
  pulse?: boolean
  /** Screen-reader text; without it the LED is decorative (aria-hidden). */
  label?: string
}

const Led = React.forwardRef<HTMLSpanElement, LedProps>(
  ({ className, status, size, pulse = false, label, ...props }, ref) => (
    <span
      ref={ref}
      role={label ? "status" : undefined}
      aria-hidden={label ? undefined : true}
      className={cn(
        ledVariants({ status, size }),
        pulse &&
          "animate-[ag-led-pulse_1.4s_linear_infinite] motion-reduce:animate-none",
        className
      )}
      {...props}
    >
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  )
)
Led.displayName = "Led"

export { Led, ledVariants }
