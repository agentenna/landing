import * as React from "react"

import { cn } from "@/lib/utils"

/* ModuleHeader — silkscreen label row across the top of a module, like the
   printed model designation on a rack unit. Sits inside the frame's mounting
   margin (never under the fasteners) with an engraved groove below: a dark
   hairline plus a light rim beneath it. */

export interface ModuleHeaderProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "title"
> {
  title: React.ReactNode
  /** Usually a <Led/>. */
  indicator?: React.ReactNode
  /** Right-side metadata (channel number, mode, count). */
  meta?: React.ReactNode
}

const ModuleHeader = React.forwardRef<HTMLElement, ModuleHeaderProps>(
  ({ className, title, indicator, meta, children, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-x-2.5 gap-y-1 border-b border-[var(--ag-groove)] pb-2 shadow-[var(--ag-header-edge)]",
        className
      )}
      {...props}
    >
      {indicator}
      <span className="ag-label text-[var(--ag-text)]">{title}</span>
      {children}
      {meta != null && (
        <span className="ml-auto pl-2 ag-label-sm text-[var(--ag-text-muted)]">
          {meta}
        </span>
      )}
    </header>
  )
)
ModuleHeader.displayName = "ModuleHeader"

export { ModuleHeader }
