/* The antenna mark (assets/brand/mark.svg): red mast + tripod legs — an
   abstracted "A" — a green LED tip light, two red signal arcs. Never
   recolored; the dot is always LED green. */

export function AntennaMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 52"
      fill="none"
      width={size}
      height={(size / 48) * 52}
      aria-hidden
    >
      <path
        d="M15.64 6.04a13 13 0 0 1 16.72 0"
        stroke="#DF3A2C"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M18.86 9.87a8 8 0 0 1 10.28 0"
        stroke="#DF3A2C"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="24" cy="16" r="3.2" fill="#B5FA15" />
      <path
        d="M24 21v25"
        stroke="#DF3A2C"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M24 30 12.5 46M24 30 35.5 46"
        stroke="#DF3A2C"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
