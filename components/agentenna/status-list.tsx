import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* StatusList — composable status rows, made to sit inside a recessed
   Section. Signal rows carry live sources; connected rows are quiet;
   idle rows are placeholders. */

const StatusList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("flex min-w-0 flex-col", className)} {...props} />
))
StatusList.displayName = "StatusList"

const statusIndicatorVariants = cva("size-2 shrink-0 rounded-full", {
  variants: {
    indicator: {
      signal: "bg-[var(--signal)] shadow-[var(--glow-signal)]",
      connected: "bg-[var(--led-offline)]",
      idle: "border border-[var(--ag-text-muted)] bg-transparent",
    },
  },
  defaultVariants: {
    indicator: "connected",
  },
})

export interface StatusListItemProps
  extends
    React.LiHTMLAttributes<HTMLLIElement>,
    VariantProps<typeof statusIndicatorVariants> {
  /** Right-side metadata (count, channel id). */
  meta?: React.ReactNode
}

const StatusListItem = React.forwardRef<HTMLLIElement, StatusListItemProps>(
  ({ className, indicator = "connected", meta, children, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(
        "flex min-w-0 items-center gap-2.5 border-b border-dashed border-[var(--ag-border)] py-1.5 last:border-b-0",
        className
      )}
      {...props}
    >
      <span aria-hidden className={statusIndicatorVariants({ indicator })} />
      <span
        className={cn(
          "truncate ag-label",
          indicator === "idle"
            ? "text-[var(--ag-text-muted)]"
            : "text-[var(--ag-text)]"
        )}
      >
        {children}
      </span>
      {meta != null && (
        <span className="ml-auto shrink-0 pl-2 ag-label-sm text-[var(--ag-text-muted)]">
          {meta}
        </span>
      )}
    </li>
  )
)
StatusListItem.displayName = "StatusListItem"

export { StatusList, StatusListItem, statusIndicatorVariants }
