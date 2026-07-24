"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Screen } from "@/components/agentenna"
import { Button } from "@/components/ui/button"

export function CopyCommand({
  command,
  className,
}: {
  command: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<number | undefined>(undefined)

  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard unavailable (permissions, insecure context) — stay quiet
    }
  }

  return (
    <Screen
      className={`flex items-center gap-3 py-1.5 pr-1.5 pl-3 ${className ?? ""}`}
    >
      <code className="truncate text-[12px]">
        <span className="text-[var(--text-on-dark-muted)] select-none">
          {"$ "}
        </span>
        {command}
      </code>
      <Button
        variant="outline"
        size="sm"
        onClick={copy}
        className="ml-auto shrink-0 font-mono text-[11px] tracking-[0.08em] uppercase"
      >
        {copied ? <CheckIcon className="text-[var(--led-ok)]" /> : <CopyIcon />}
        {copied ? "Copied" : "Copy"}
      </Button>
    </Screen>
  )
}
