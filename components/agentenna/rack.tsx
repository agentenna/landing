import * as React from "react"

import { cn } from "@/lib/utils"

/* Rack — the page-level backplane. Structural background, never a card:
   continuous perforated steel, cool compressed grays. The refined palette
   and texture live on .ag-rack in globals.css so every descendant primitive
   resolves the same tokens. */

const Rack = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("ag-rack min-h-dvh w-full", className)}
    {...props}
  >
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      {children}
    </div>
  </div>
))
Rack.displayName = "Rack"

export { Rack }
