import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* Port — a signal connection point: dark well, state dot, mono label.
   Red is reserved for live signal; quiet states stay neutral gray.
   No literal cable rendering. */

const portDotVariants = cva("absolute inset-1 rounded-full", {
  variants: {
    state: {
      live: "bg-[var(--signal)] shadow-[var(--glow-signal)]",
      connected: "bg-[var(--led-offline)]",
      idle: "bg-[color-mix(in_srgb,var(--screen)_88%,#fff)]",
    },
  },
  defaultVariants: {
    state: "idle",
  },
})

export interface PortProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof portDotVariants> {
  label?: React.ReactNode
  /** Mechanical blink on the live dot. */
  pulse?: boolean
}

const Port = React.forwardRef<HTMLSpanElement, PortProps>(
  ({ className, state = "idle", label, pulse = false, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("inline-flex min-w-0 items-center gap-2", className)}
      {...props}
    >
      <span
        aria-hidden
        className="relative size-4 shrink-0 rounded-full border border-[var(--ag-border,var(--border-dark))] bg-[var(--screen)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]"
      >
        <span
          className={cn(
            portDotVariants({ state }),
            state === "live" &&
              pulse &&
              "animate-[ag-led-pulse_1.4s_linear_infinite] motion-reduce:animate-none"
          )}
        />
      </span>
      {label != null && (
        <span className="truncate ag-label-sm text-[var(--ag-text-muted,var(--text-on-rack-muted))]">
          {label}
        </span>
      )}
    </span>
  )
)
Port.displayName = "Port"

export { Port, portDotVariants }
