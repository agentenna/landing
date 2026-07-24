import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { screenSurface } from "./screen"

/* Section — internal area inside a module. Variants create depth (recessed
   sinks, raised extrudes, screen sinks deepest); surfaces resolve from the
   nearest tone scope, so the same variant works on plate and chassis. An
   explicit tone re-stamps data-ag-tone for everything inside.
   The default "panel" variant is tone-aware: it extrudes on plate and
   recesses on chassis (via --ag-*-panel vars), matching how the hardware
   reference treats light vs dark surfaces. */

const sectionVariants = cva("relative min-w-0 rounded-[4px]", {
  variants: {
    variant: {
      panel:
        "border border-[var(--ag-border)] bg-[var(--ag-surface-panel)] p-3 shadow-[var(--ag-shadow-panel)]",
      flat: "",
      recessed:
        "border border-[var(--ag-border)] bg-[var(--ag-surface-recessed)] p-3 shadow-[var(--ag-shadow-recessed)]",
      raised:
        "border border-[var(--ag-border)] bg-[var(--ag-surface-raised)] p-3 shadow-[var(--ag-shadow-raised)]",
      screen: cn(screenSurface, "p-3"),
    },
    tone: {
      inherit: "",
      plate: "text-[var(--ag-text)]",
      chassis: "text-[var(--ag-text)]",
    },
  },
  defaultVariants: {
    variant: "panel",
    tone: "inherit",
  },
})

export interface SectionProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionVariants> {}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ className, variant = "panel", tone = "inherit", ...props }, ref) => {
    // Screens are always dark inside, whatever the module tone.
    const stampedTone =
      tone && tone !== "inherit"
        ? tone
        : variant === "screen"
          ? "chassis"
          : undefined
    return (
      <div
        ref={ref}
        data-ag-tone={stampedTone}
        className={cn(sectionVariants({ variant, tone }), className)}
        {...props}
      />
    )
  }
)
Section.displayName = "Section"

export { Section, sectionVariants }
