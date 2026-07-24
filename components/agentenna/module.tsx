import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* Module — a frame bolted into the rack. Owns border, depth, tone, and
   optional rack ears. Descendants (sections, elements, shadcn controls)
   read the tone through the data-ag-tone contract in globals.css.
   `fasteners` renders left/right mounting ears — vertical strips darkened
   toward the rack with machined screws top and bottom, like a 1U unit —
   and widens the horizontal padding so content clears them.
   The bare faceplate carries no prose — only silkscreen labels
   (ModuleHeader) and mounted elements; prose belongs inside Sections. */

const moduleVariants = cva(
  "relative flex min-w-0 flex-col gap-3 rounded-[5px] border p-[var(--ag-module-pad)] [--ag-ear-w:26px] [--ag-module-pad:12px] sm:[--ag-module-pad:14px]",
  {
    variants: {
      tone: {
        plate:
          "border-[var(--border-plate)] bg-[image:var(--ag-grain),linear-gradient(180deg,color-mix(in_srgb,var(--plate)_94%,#fff)_0%,var(--plate)_50%,color-mix(in_srgb,var(--plate)_96%,#000)_100%)] text-[var(--text-on-plate)]",
        chassis:
          "border-[var(--border-strong)] bg-[linear-gradient(180deg,var(--chassis-raised)_0%,var(--chassis)_60%)] text-[var(--text-on-dark)]",
      },
      depth: {
        flat: "",
        raised: "",
      },
    },
    compoundVariants: [
      {
        tone: "plate",
        depth: "flat",
        class: "shadow-[var(--shadow-module-plate)]",
      },
      {
        tone: "plate",
        depth: "raised",
        class: "shadow-[var(--shadow-module-plate-raised)]",
      },
      {
        tone: "chassis",
        depth: "flat",
        class: "shadow-[var(--shadow-module-chassis)]",
      },
      {
        tone: "chassis",
        depth: "raised",
        class: "shadow-[var(--shadow-module-chassis-raised)]",
      },
    ],
    defaultVariants: {
      tone: "plate",
      depth: "flat",
    },
  }
)

/* A machined screw: drilled counterbore recess with a domed metal head
   inside — light catches top-left, shadow falls below. */
function Screw({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute flex size-3 items-center justify-center rounded-full bg-[var(--ag-bore)] shadow-[var(--ag-bore-shadow)]",
        className
      )}
    >
      <span className="size-[7px] rounded-full shadow-[var(--ag-screw-shadow)] [background:var(--ag-screw-face)]" />
    </span>
  )
}

function RackEar({ side }: { side: "left" | "right" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-y-0 w-[var(--ag-ear-w)] [background:var(--ag-ear-face)]",
        side === "left"
          ? "left-0 rounded-l-[4px] shadow-[var(--ag-ear-seam-l)]"
          : "right-0 rounded-r-[4px] shadow-[var(--ag-ear-seam-r)]"
      )}
    >
      <Screw className="top-2.5 left-1/2 -translate-x-1/2" />
      <Screw className="bottom-2.5 left-1/2 -translate-x-1/2" />
    </span>
  )
}

export interface ModuleProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof moduleVariants> {
  /** Rack ears with mounting screws — top-level mounted modules only. */
  fasteners?: boolean
}

const Module = React.forwardRef<HTMLElement, ModuleProps>(
  (
    { className, tone = "plate", depth, fasteners = false, children, ...props },
    ref
  ) => (
    <section
      ref={ref}
      data-ag-tone={tone ?? "plate"}
      className={cn(
        moduleVariants({ tone, depth }),
        fasteners && "px-[calc(var(--ag-ear-w)+10px)]",
        className
      )}
      {...props}
    >
      {children}
      {fasteners && (
        <>
          <RackEar side="left" />
          <RackEar side="right" />
        </>
      )}
    </section>
  )
)
Module.displayName = "Module"

export { Module, moduleVariants }
