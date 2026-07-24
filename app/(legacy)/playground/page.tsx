import type { Metadata } from "next"
import { ArrowUpRightIcon } from "lucide-react"

import {
  Led,
  Module,
  ModuleHeader,
  Port,
  Rack,
  Readout,
  Screen,
  Section,
  StatusList,
  StatusListItem,
  Terminal,
} from "@/components/agentenna"
import { AntennaMark } from "@/components/lander/mark"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { CopyCommand } from "./copy-command"

export const metadata: Metadata = {
  title: "Agentenna — design playground",
  robots: { index: false },
}

/* ── page scaffolding ─────────────────────────────────────────────────── */

function Group({
  index,
  title,
  note,
  children,
}: {
  index: string
  title: string
  note?: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-12">
      <div className="mb-4 flex items-baseline gap-3 border-b border-[rgba(255,255,255,0.1)] pb-2">
        <span className="ag-label text-[var(--text-on-rack-muted)]">
          {index}
        </span>
        <h2 className="ag-label text-[var(--text-on-rack)]">{title}</h2>
        {note && (
          <span className="ml-auto hidden ag-label-sm text-[var(--text-on-rack-muted)] sm:block">
            {note}
          </span>
        )}
      </div>
      {children}
    </section>
  )
}

function Caption({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`mb-2 ag-label-sm text-[var(--ag-text-muted,var(--text-on-rack-muted))] ${className}`}
    >
      {children}
    </div>
  )
}

/* ── specimen modules (shared between groups 2, 3, and 5) ─────────────── */

function FeedsModule() {
  return (
    <Module tone="plate" fasteners>
      <ModuleHeader
        title="Bring your feeds"
        indicator={<Led status="online" />}
      />
      <Section>
        <StatusList>
          <StatusListItem indicator="signal">Logs</StatusListItem>
          <StatusListItem indicator="signal">Alerts</StatusListItem>
          <StatusListItem indicator="signal">Tickets</StatusListItem>
          <StatusListItem indicator="connected">Slack</StatusListItem>
          <StatusListItem indicator="connected">Webhooks</StatusListItem>
          <StatusListItem indicator="idle">+ more</StatusListItem>
        </StatusList>
      </Section>
    </Module>
  )
}

function AwarenessModule() {
  return (
    <Module tone="chassis" fasteners>
      <ModuleHeader
        title="Awareness feed"
        indicator={<Led status="online" pulse />}
        meta="STATION LOCAL"
      />
      <Section variant="screen" className="p-0">
        <div className="border-b border-[rgba(255,255,255,0.07)] px-3 py-1.5 ag-label-sm text-[var(--text-on-dark-muted)]">
          Events · new (1)
        </div>
        <div className="border-l-2 border-[var(--signal)] bg-[rgba(255,87,87,0.07)] px-3 py-2">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
            <span className="shrink-0 ag-label-sm text-[var(--signal)]">
              New
            </span>
            <span className="text-[var(--text-on-dark)]">
              Checkout 5xx rate jumped to 12%
            </span>
            <span className="ml-auto text-[var(--text-on-dark-muted)]">
              14:31:58
            </span>
          </div>
          <div className="text-[var(--text-on-dark-muted)]">
            prod.errors · checkout_api · high
          </div>
        </div>
        <div className="flex items-baseline gap-x-3 px-3 py-1.5 text-[var(--text-on-dark-muted)]">
          <span className="min-w-0 flex-1 truncate">
            Payment timeouts elevated
          </span>
          <span>14:25:11</span>
        </div>
        <div className="flex items-baseline gap-x-3 px-3 py-1.5 pb-2.5 text-[var(--text-on-dark-muted)]">
          <span className="min-w-0 flex-1 truncate">
            DB slow query rate high
          </span>
          <span>14:12:07</span>
        </div>
      </Section>
      <Terminal
        title="Terminal — Emitter"
        meta="00:24"
        lines={[
          {
            kind: "cmd",
            text: 'agentenna emit prod.errors "Checkout 5xx rate jumped to 12%" --severity high',
          },
          { kind: "ok", text: "delivered · 1 station · 3 readers" },
          {
            kind: "dim",
            text: "use inspect(id) for details · rewind for history",
          },
        ]}
        footer={
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Readout label="Last event" value="14:31:58" />
            <Readout label="Channels" value="12" />
            <Readout label="Mode" value="LIVE" />
          </div>
        }
      />
      <Section className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <Port state="live" pulse label="prod.errors" />
        <Port state="connected" label="deploys" />
        <Port state="idle" label="tickets" />
        <Readout label="SR" value="44.1" className="ml-auto" />
      </Section>
    </Module>
  )
}

function OneStationModule() {
  return (
    <Module tone="chassis">
      <ModuleHeader
        title="One station"
        indicator={<Led status="online" />}
        meta="V2"
      />
      <Section
        variant="screen"
        className="flex flex-wrap items-center gap-x-6 gap-y-3"
      >
        <Readout label="Station" value="LOCAL" />
        <Readout label="Uptime" value="99.98%" />
        <Readout label="Events · 24h" value="1 204" />
        <span className="ml-auto flex items-center gap-2">
          <span className="ag-label-sm text-[var(--text-on-dark-muted)]">
            Health
          </span>
          <span className="flex items-center gap-1.5">
            <Led status="online" size="sm" />
            <Led status="online" size="sm" />
            <Led status="online" size="sm" />
            <Led status="online" size="sm" />
            <Led status="online" size="sm" />
            <Led status="online" size="sm" />
            <Led status="warning" size="sm" />
            <Led status="online" size="sm" />
          </span>
        </span>
      </Section>
    </Module>
  )
}

function ManyChannelsModule() {
  return (
    <Module tone="plate">
      <ModuleHeader
        title="Many channels"
        indicator={<Led status="online" />}
        meta="12 ACTIVE"
      />
      <Section>
        <StatusList>
          <StatusListItem indicator="signal" meta="142/h">
            prod.errors
          </StatusListItem>
          <StatusListItem indicator="signal" meta="36/h">
            deploys
          </StatusListItem>
          <StatusListItem indicator="connected" meta="8/h">
            support.tickets
          </StatusListItem>
          <StatusListItem indicator="connected" meta="2/h">
            slack.ops
          </StatusListItem>
          <StatusListItem indicator="idle" meta="—">
            staging.errors
          </StatusListItem>
        </StatusList>
      </Section>
    </Module>
  )
}

function TerminalDemoModule() {
  return (
    <Module tone="chassis" fasteners>
      <ModuleHeader
        title="Terminal demo"
        indicator={<Led status="online" pulse />}
        meta="LIVE"
      />
      <Terminal
        title="Claude Code · with Agentenna"
        lines={[
          { kind: "cmd", text: "agentenna install claude-code" },
          { kind: "ok", text: "installed agentenna plugin for claude code" },
          { kind: "cmd", text: "claude" },
          { kind: "out", text: "> what's up with checkout?" },
          {
            kind: "out",
            text: "Checkout is seeing elevated 5xx errors — current rate 12%, started ~2 minutes ago. An incident is active.",
          },
          { kind: "dim", text: "it already knew." },
        ]}
      />
    </Module>
  )
}

function WakeRuleModule() {
  return (
    <Module tone="plate">
      <ModuleHeader
        title="Wake rule"
        indicator={<Led status="warning" />}
        meta="ARMED"
      />
      <Section className="flex items-center gap-3">
        <code className="min-w-0 truncate font-mono text-[12px] text-[var(--ag-text)]">
          on prod.errors severity&gt;=high → wake claude-code
        </code>
        <Switch
          defaultChecked
          aria-label="Wake rule armed"
          className="ml-auto"
        />
      </Section>
      <Section variant="screen" className="flex flex-wrap gap-x-6 gap-y-2">
        <Readout label="Last wake" value="14:31:58" />
        <Readout label="Triggers · 24h" value="7" />
        <Readout label="Reader" value="claude-code" />
      </Section>
    </Module>
  )
}

function StationReadoutsModule() {
  return (
    <Module tone="chassis">
      <ModuleHeader
        title="Station readouts"
        indicator={<Led status="online" />}
        meta="SR 44.1"
      />
      <Section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Readout label="Link" value="UP" />
        <Readout label="Clock" value="14:32:07" />
        <Readout label="Buffer" value="64%" />
        <Readout label="Readers" value="3" />
      </Section>
      <Section variant="flat" className="flex flex-wrap gap-x-6 gap-y-3">
        <Port state="live" pulse label="prod.errors" />
        <Port state="connected" label="slack.ops" />
        <Port state="idle" label="aux" />
      </Section>
    </Module>
  )
}

/* ── navbar — a 1U strip after the hardware reference: brand silkscreen,
   station + health panels, vent grille with jacks, link tray, live LCD ── */

/* A panel-mount connector: dark square housing, metal-ringed bore. */
function NavJack() {
  return (
    <span className="flex size-[18px] items-center justify-center rounded-[4px] bg-[var(--chassis)] shadow-[0_0_0_1px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.14),0_1px_1px_rgba(0,0,0,0.3)]">
      <span className="size-[10px] rounded-full bg-[var(--screen)] shadow-[0_0_0_1.5px_rgba(255,255,255,0.16),inset_0_1px_2px_rgba(0,0,0,0.8)]" />
    </span>
  )
}

function NavbarModule({ tone }: { tone: "plate" | "chassis" }) {
  return (
    <Module
      tone={tone}
      fasteners
      className="flex-row flex-wrap items-center gap-x-4 gap-y-2 py-2.5"
    >
      <span className="flex items-center gap-2.5 pr-1">
        <AntennaMark size={26} />
        <span className="font-[family-name:var(--font-display)] text-[21px] leading-none font-semibold tracking-[-0.01em] text-[var(--ag-text)]">
          agentenna
        </span>
      </span>

      <span
        aria-hidden
        className="hidden w-px self-stretch bg-[var(--ag-groove)] sm:block"
      />

      <Section className="flex items-end gap-4 px-3.5 py-2.5">
        <Readout label="Station" value="LOCAL" />
        <Led status="online" className="mb-px" />
      </Section>

      <Section className="hidden flex-col gap-2 px-3.5 py-2.5 sm:flex">
        <span className="ag-label-sm text-[var(--ag-text-muted)]">Health</span>
        <span className="flex items-center gap-2 pb-0.5">
          {Array.from({ length: 8 }, (_, i) => (
            <Led key={i} size="sm" status="online" />
          ))}
        </span>
      </Section>

      <span aria-hidden className="hidden items-center gap-2.5 xl:flex">
        <span className="h-9 w-14 [background-image:radial-gradient(circle,var(--screen)_0.8px,transparent_1.1px),radial-gradient(circle,var(--ag-surface-raised)_0.8px,transparent_1.1px)] [background-size:4px_4px] [background-position:0_0,0_1px]" />
        <span className="flex flex-col gap-1.5">
          <NavJack />
          <NavJack />
        </span>
      </span>

      <Section className="ml-auto flex flex-wrap items-center gap-x-7 gap-y-1 px-5 py-4">
        {["Docs", "Examples", "MCP", "Changelog"].map((label) => (
          <a key={label} href="#" className="ag-nav-link ag-label">
            {label}
          </a>
        ))}
      </Section>

      <Screen className="flex flex-col justify-center gap-1.5 px-3.5 py-2.5">
        <span className="flex items-center gap-2">
          <Led status="offline" size="sm" />
          <span className="ag-label leading-none text-[var(--text-on-dark)]">
            Live
          </span>
        </span>
        <span className="flex items-center gap-2">
          <Led status="online" size="sm" pulse />
          <span className="font-mono text-[12px] leading-none text-[var(--text-on-dark)]">
            14:32:07
          </span>
        </span>
      </Screen>
    </Module>
  )
}

/* ── state matrix rows (rendered once per tone) ───────────────────────── */

function MatrixRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-dashed border-[var(--ag-border)] py-2.5 last:border-b-0">
      <span className="w-16 shrink-0 ag-label-sm text-[var(--ag-text-muted)]">
        {label}
      </span>
      {children}
    </div>
  )
}

function StateMatrixRows() {
  return (
    <>
      <MatrixRow label="LED">
        <Led status="online" />
        <Led status="warning" />
        <Led status="critical" />
        <Led status="offline" />
        <Led status="online" pulse />
        <Led status="critical" size="sm" pulse />
      </MatrixRow>
      <MatrixRow label="Port">
        <Port state="live" label="live" />
        <Port state="connected" label="connected" />
        <Port state="idle" label="idle" />
      </MatrixRow>
      <MatrixRow label="Rows">
        <StatusList className="w-full">
          <StatusListItem indicator="signal" meta="live">
            Signal
          </StatusListItem>
          <StatusListItem indicator="connected" meta="quiet">
            Connected
          </StatusListItem>
          <StatusListItem indicator="idle" meta="—">
            Idle
          </StatusListItem>
        </StatusList>
      </MatrixRow>
      <MatrixRow label="Button">
        <Button size="sm">Default</Button>
        <Button size="sm" variant="secondary">
          Secondary
        </Button>
        <Button size="sm" variant="ghost">
          Ghost
        </Button>
        <Button size="sm" disabled>
          Disabled
        </Button>
      </MatrixRow>
      <MatrixRow label="Input">
        <Input
          className="w-28"
          placeholder="Default"
          aria-label="Default input"
        />
        <Input
          className="w-28"
          disabled
          placeholder="Disabled"
          aria-label="Disabled input"
        />
        <Input
          className="w-28"
          aria-invalid
          defaultValue="Invalid"
          aria-label="Invalid input"
        />
      </MatrixRow>
      <MatrixRow label="Switch">
        <Switch aria-label="Off" />
        <Switch defaultChecked aria-label="On" />
        <Switch disabled aria-label="Disabled" />
      </MatrixRow>
    </>
  )
}

/* ── page ─────────────────────────────────────────────────────────────── */

export default function PlaygroundPage() {
  return (
    <Rack>
      <header className="mb-12 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Led status="online" />
          <span className="ag-label text-[var(--text-on-rack)]">
            Agentenna · design system playground
          </span>
          <span className="ml-auto ag-label-sm text-[var(--text-on-rack-muted)]">
            Refined palette · not a marketing page
          </span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-on-rack)] sm:text-3xl">
          Rack provides the environment. Modules define ownership. Sections
          organize depth. Elements perform a specific job.
        </h1>
        <Screen className="w-fit px-4 py-2 text-[11px] leading-[1.8] whitespace-pre">
          {"Rack\n└─ Module\n   └─ Section\n      └─ Element"}
        </Screen>
      </header>

      <Group
        index="01"
        title="Foundation"
        note="Tones · section depths · fasteners"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Module tone="plate" fasteners>
            <ModuleHeader
              title="Plate module"
              indicator={<Led status="online" />}
              meta="CH 01"
            />
            <Section variant="flat">
              <Caption>
                Section · flat — elements mount straight on the plate
              </Caption>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <Port state="live" label="prod.errors" />
                <Port state="connected" label="deploys" />
                <Port state="idle" label="aux" />
              </div>
            </Section>
            <Section variant="recessed">
              <Caption>Section · recessed</Caption>
              <p className="text-sm">An inset tray, sunk into the faceplate.</p>
            </Section>
            <Section variant="raised">
              <Caption>Section · raised</Caption>
              <p className="text-sm">A sub-panel mounted above the module.</p>
            </Section>
            <Section variant="screen">
              <Caption>Section · screen</Caption>
              live data surface · mono only · 14:32:07
            </Section>
            <Section>
              <Caption>Section · default panel</Caption>
              <p className="text-sm">Tone decides: extrudes on plate.</p>
            </Section>
          </Module>

          <Module tone="chassis">
            <ModuleHeader
              title="Chassis module"
              indicator={<Led status="online" />}
              meta="CH 02"
            />
            <Section variant="flat">
              <Caption>
                Section · flat — elements mount straight on the chassis
              </Caption>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="flex items-center gap-2">
                  <Led status="online" />
                  <span className="ag-label-sm text-[var(--ag-text-muted)]">
                    Link
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <Led status="warning" />
                  <span className="ag-label-sm text-[var(--ag-text-muted)]">
                    Buffer
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <Led status="offline" />
                  <span className="ag-label-sm text-[var(--ag-text-muted)]">
                    Aux
                  </span>
                </span>
              </div>
            </Section>
            <Section variant="recessed">
              <Caption>Section · recessed</Caption>
              <p className="text-sm">
                A dark well, one step below the chassis.
              </p>
            </Section>
            <Section variant="raised">
              <Caption>Section · raised</Caption>
              <p className="text-sm">A raised dark sub-panel.</p>
            </Section>
            <Section variant="screen">
              <Caption>Section · screen</Caption>
              live data surface · mono only · 14:32:07
            </Section>
            <Section>
              <Caption>Section · default panel</Caption>
              <p className="text-sm">Tone decides: recesses on chassis.</p>
            </Section>
          </Module>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Module tone="plate" depth="flat">
            <ModuleHeader title="Depth flat" meta="M 01" />
            <Section>
              <Readout label="Extrusion" value="MINIMAL" />
            </Section>
          </Module>
          <Module tone="plate" depth="raised" fasteners>
            <ModuleHeader title="Depth raised" meta="M 02" />
            <Section>
              <Readout label="Extrusion" value="RAISED" />
            </Section>
          </Module>
          <Module tone="chassis" depth="flat">
            <ModuleHeader title="Depth flat" meta="M 03" />
            <Section>
              <Readout label="Edge" value="MACHINED" />
            </Section>
          </Module>
          <Module tone="chassis" depth="raised" fasteners>
            <ModuleHeader title="Depth raised" meta="M 04" />
            <Section>
              <Readout label="Mount" value="BOLTED" />
            </Section>
          </Module>
        </div>
      </Group>

      <Group index="02" title="Navbar" note="Slim 1U strip · both tones">
        <div className="flex flex-col gap-5">
          <NavbarModule tone="plate" />
          <NavbarModule tone="chassis" />
        </div>
      </Group>

      <Group
        index="03"
        title="Bring your feeds"
        note="Spec composition, verbatim"
      >
        <div className="max-w-sm">
          <FeedsModule />
        </div>
      </Group>

      <Group
        index="04"
        title="Chassis data module"
        note="Screen · terminal · readouts · live event"
      >
        <div className="max-w-2xl">
          <AwarenessModule />
        </div>
      </Group>

      <Group
        index="05"
        title="Controls"
        note="Stock shadcn, restyled via tone tokens"
      >
        <Module tone="plate" fasteners>
          <ModuleHeader
            title="Controls"
            indicator={<Led status="online" />}
            meta="SHADCN · TOKEN-MAPPED"
          />
          <Section variant="flat" className="flex flex-wrap items-center gap-3">
            <Button>Emit event</Button>
            <Button variant="secondary">Inspect</Button>
            <Button variant="ghost">Rewind</Button>
            <Button variant="outline" size="icon" aria-label="Open channel">
              <ArrowUpRightIcon />
            </Button>
          </Section>
          <Section className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="ag-label-sm text-[var(--ag-text-muted)]">
                Channel name
              </span>
              <Input placeholder="prod.errors" />
            </label>
            <div className="flex flex-col gap-2">
              <span className="ag-label-sm text-[var(--ag-text-muted)]">
                Severity
              </span>
              <Select defaultValue="high">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="ag-tone-plate">
                  <SelectItem value="low">low</SelectItem>
                  <SelectItem value="medium">medium</SelectItem>
                  <SelectItem value="high">high</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <label className="flex items-center gap-3">
              <Switch defaultChecked />
              <span className="ag-label text-[var(--ag-text)]">
                Wake on critical
              </span>
            </label>
            <Tabs defaultValue="events" className="sm:col-span-2">
              <TabsList>
                <TabsTrigger value="events" className="ag-label">
                  Events
                </TabsTrigger>
                <TabsTrigger value="states" className="ag-label">
                  States
                </TabsTrigger>
                <TabsTrigger value="history" className="ag-label">
                  History
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="events"
                className="text-[13px] text-[var(--ag-text-muted)]"
              >
                Live events, newest first, token-bounded.
              </TabsContent>
              <TabsContent
                value="states"
                className="text-[13px] text-[var(--ag-text-muted)]"
              >
                Current states: checkout.incident active, deploy.rollout ok.
              </TabsContent>
              <TabsContent
                value="history"
                className="text-[13px] text-[var(--ag-text-muted)]"
              >
                Rewind the feed to any earlier turn.
              </TabsContent>
            </Tabs>
            <CopyCommand
              command="pip install agentenna"
              className="sm:col-span-2"
            />
          </Section>
          <Section tone="chassis" className="flex flex-wrap items-center gap-3">
            <span className="w-full ag-label-sm text-[var(--ag-text-muted)]">
              Dark tone check — same controls on chassis
            </span>
            <Button>Emit event</Button>
            <Button variant="secondary">Inspect</Button>
            <Input
              className="w-36"
              placeholder="prod.errors"
              aria-label="Channel"
            />
            <Switch defaultChecked aria-label="Wake on critical" />
          </Section>
        </Module>
      </Group>

      <Group
        index="06"
        title="Mixed composition"
        note="Neither globally light nor dark"
      >
        <div className="grid items-start gap-5 lg:grid-cols-2">
          <FeedsModule />
          <OneStationModule />
          <ManyChannelsModule />
          <TerminalDemoModule />
          <WakeRuleModule />
          <StationReadoutsModule />
        </div>
      </Group>

      <Group index="07" title="State matrix" note="Every primitive, both tones">
        <div className="grid items-start gap-5 lg:grid-cols-2">
          <Module tone="plate">
            <ModuleHeader
              title="States — plate"
              indicator={<Led status="online" />}
            />
            <Section variant="flat">
              <StateMatrixRows />
            </Section>
          </Module>
          <Module tone="chassis">
            <ModuleHeader
              title="States — chassis"
              indicator={<Led status="online" />}
            />
            <Section variant="flat">
              <StateMatrixRows />
            </Section>
          </Module>
        </div>
        <p className="mt-4 ag-label-sm text-[var(--text-on-rack-muted)]">
          Hover, press, and tab through the controls above to verify hover,
          active, and focus-visible states.
        </p>
      </Group>

      <footer className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[rgba(255,255,255,0.1)] pt-4">
        <span className="ag-label-sm text-[var(--text-on-rack-muted)]">
          Rack → Module → Section → Element
        </span>
        <span className="ml-auto ag-label-sm text-[var(--text-on-rack-muted)]">
          Signal red is the only accent fill · green is for LEDs only
        </span>
      </footer>
    </Rack>
  )
}
