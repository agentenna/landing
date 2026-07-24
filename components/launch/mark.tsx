/* The Agentenna mark: a letter "A" read as an antenna tower — apex, two
   legs, cross-bracing, and a central lime signal node (design system §5).
   The tower inherits currentColor; the node stays lime unless mono. */

export function AntennaMark({
  size = 24,
  mono = false,
}: {
  size?: number
  mono?: boolean
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 56"
      fill="none"
      width={(size / 56) * 48}
      height={size}
      aria-hidden
    >
      {/* legs */}
      <path
        d="M24 4 9 52M24 4l15 48"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* apex crossbar — closes the A triangle */}
      <path
        d="M19 20h10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* mid crossbar */}
      <path
        d="M14.3 35h19.4"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* cross-bracing */}
      <path
        d="M14.3 35 39 52M33.7 35 9 52"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* central signal node */}
      <circle
        cx="24"
        cy="27.5"
        r="3.4"
        fill={mono ? "currentColor" : "var(--color-lime, #B7EB32)"}
      />
    </svg>
  )
}
