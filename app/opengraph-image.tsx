import { ImageResponse } from "next/og"

export const alt =
  "Agentenna — the awareness layer for AI agents. Your agent already knows."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const HEADLINE = "Your agent already knows."
const EYEBROW = "— THE AWARENESS LAYER FOR AI AGENTS"
const BLOCK_HEAD = '<agentenna-awareness slot="agentenna:awareness">'
const BLOCK_NEW = "Checkout 5xx rate jumped to 12%"
const BLOCK_TIME = "-2m"
const BLOCK_ROW_1 = "deploy.prod rolled_back"
const BLOCK_TIME_1 = "-2m"
const TRUST =
  "agentenna.com · pip install agentenna · Apache 2.0 · self-hostable · MCP-native"

async function loadGoogleFont(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(text)}`
  const css = await (await fetch(url)).text()
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)
  if (!match) throw new Error(`failed to load font ${family}`)
  const res = await fetch(match[1])
  return res.arrayBuffer()
}

function Mark({ size: s }: { size: number }) {
  return (
    <svg
      viewBox="0 0 48 56"
      fill="none"
      width={(s / 56) * 48}
      height={s}
      style={{ display: "flex" }}
    >
      <path
        d="M24 4 9 52M24 4l15 48"
        stroke="#E9E8E1"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 20h10"
        stroke="#E9E8E1"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M14.3 35h19.4"
        stroke="#E9E8E1"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M14.3 35 39 52M33.7 35 9 52"
        stroke="#E9E8E1"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="24" cy="27.5" r="3.4" fill="#B7EB32" />
    </svg>
  )
}

export default async function Image() {
  const monoText = [
    EYEBROW,
    BLOCK_HEAD,
    BLOCK_NEW,
    BLOCK_TIME,
    BLOCK_ROW_1,
    BLOCK_TIME_1,
    TRUST,
  ].join("")
  const [display, mono] = await Promise.all([
    loadGoogleFont("Chakra Petch", 400, HEADLINE),
    loadGoogleFont("IBM Plex Mono", 500, monoText),
  ])

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        backgroundColor: "#0D1012",
        backgroundImage:
          "radial-gradient(140% 110% at 50% 0%, #161A1C 0%, #0D1012 52%, #080A0B 100%)",
        fontFamily: "IBM Plex Mono",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <Mark size={44} />
        <div
          style={{ fontSize: 22, letterSpacing: "0.1em", color: "#F04452" }}
        >
          {EYEBROW}
        </div>
      </div>
      <div
        style={{
          fontFamily: "Chakra Petch",
          fontSize: 92,
          lineHeight: 1.02,
          letterSpacing: "-0.01em",
          color: "#E9E8E1",
          display: "flex",
        }}
      >
        {HEADLINE}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#080A0B",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 6,
          fontSize: 24,
          color: "#E9E8E1",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "16px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            color: "#7B7E81",
          }}
        >
          {BLOCK_HEAD}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "14px 24px 14px 20px",
            borderLeft: "4px solid #F04452",
            backgroundColor: "rgba(240,68,82,0.07)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#E9E8E1",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 12,
                backgroundColor: "#F04452",
              }}
            />
            {BLOCK_NEW}
          </div>
          <div style={{ display: "flex", color: "#7B7E81" }}>{BLOCK_TIME}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 24px 18px 20px",
            color: "#A9AEA3",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 12,
                backgroundColor: "#B7EB32",
              }}
            />
            {BLOCK_ROW_1}
          </div>
          <div style={{ display: "flex", color: "#7B7E81" }}>
            {BLOCK_TIME_1}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 21, color: "#A9AEA3" }}>
        {TRUST}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Chakra Petch", data: display, style: "normal", weight: 400 },
        { name: "IBM Plex Mono", data: mono, style: "normal", weight: 500 },
      ],
    },
  )
}
