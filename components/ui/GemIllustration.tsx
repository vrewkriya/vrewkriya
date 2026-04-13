interface GemIllustrationProps {
  width?: number
  height?: number
  className?: string
}

export default function GemIllustration({
  width = 520,
  height = 520,
  className,
}: GemIllustrationProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 520 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer glow ring */}
      <ellipse
        cx="260"
        cy="260"
        rx="240"
        ry="240"
        stroke="#c9a96e"
        strokeWidth="0.5"
        opacity="0.1"
      />
      <ellipse
        cx="260"
        cy="260"
        rx="210"
        ry="210"
        stroke="#c9a96e"
        strokeWidth="0.3"
        opacity="0.06"
      />

      {/* Crown — upper facets */}
      <polygon
        points="260,100 310,180 210,180"
        fill="#2a1840"
        stroke="#c9a96e"
        strokeWidth="0.6"
        strokeOpacity="0.8"
      />
      <polygon
        points="260,100 310,180 360,160"
        fill="#1a1028"
        stroke="#c9a96e"
        strokeWidth="0.6"
        strokeOpacity="0.7"
      />
      <polygon
        points="260,100 210,180 160,160"
        fill="#0a0614"
        stroke="#c9a96e"
        strokeWidth="0.6"
        strokeOpacity="0.7"
      />

      {/* Star facets */}
      <polygon
        points="360,160 310,180 350,220"
        fill="#1a1028"
        stroke="#c9a96e"
        strokeWidth="0.6"
        strokeOpacity="0.6"
      />
      <polygon
        points="160,160 210,180 170,220"
        fill="#2a1840"
        stroke="#c9a96e"
        strokeWidth="0.6"
        strokeOpacity="0.6"
      />

      {/* Upper girdle facets */}
      <polygon
        points="310,180 350,220 300,230"
        fill="#0a0614"
        stroke="#c9a96e"
        strokeWidth="0.6"
        strokeOpacity="0.5"
      />
      <polygon
        points="210,180 170,220 220,230"
        fill="#1a1028"
        stroke="#c9a96e"
        strokeWidth="0.6"
        strokeOpacity="0.5"
      />
      <polygon
        points="310,180 210,180 260,230"
        fill="#2a1840"
        stroke="#c9a96e"
        strokeWidth="0.7"
        strokeOpacity="0.8"
      />
      <polygon
        points="310,180 300,230 260,230"
        fill="#1a1028"
        stroke="#c9a96e"
        strokeWidth="0.5"
        strokeOpacity="0.6"
      />
      <polygon
        points="210,180 220,230 260,230"
        fill="#0a0614"
        stroke="#c9a96e"
        strokeWidth="0.5"
        strokeOpacity="0.6"
      />

      {/* Girdle line */}
      <line
        x1="170"
        y1="230"
        x2="350"
        y2="230"
        stroke="#c9a96e"
        strokeWidth="0.8"
        strokeOpacity="0.4"
      />

      {/* Pavilion — lower facets */}
      <polygon
        points="170,230 220,230 260,400"
        fill="#0a0614"
        stroke="#c9a96e"
        strokeWidth="0.6"
        strokeOpacity="0.7"
      />
      <polygon
        points="220,230 260,230 260,400"
        fill="#2a1840"
        stroke="#c9a96e"
        strokeWidth="0.6"
        strokeOpacity="0.8"
      />
      <polygon
        points="260,230 300,230 260,400"
        fill="#1a1028"
        stroke="#c9a96e"
        strokeWidth="0.6"
        strokeOpacity="0.8"
      />
      <polygon
        points="300,230 350,230 260,400"
        fill="#0a0614"
        stroke="#c9a96e"
        strokeWidth="0.6"
        strokeOpacity="0.7"
      />

      {/* Sparkle cross-lines */}
      <g opacity="0.25" stroke="#c9a96e" strokeWidth="0.5">
        {/* Top sparkle */}
        <line x1="260" y1="60" x2="260" y2="80" />
        <line x1="250" y1="70" x2="270" y2="70" />
        {/* Right sparkle */}
        <line x1="390" y1="195" x2="410" y2="195" />
        <line x1="400" y1="185" x2="400" y2="205" />
        {/* Left sparkle */}
        <line x1="110" y1="195" x2="130" y2="195" />
        <line x1="120" y1="185" x2="120" y2="205" />
      </g>
    </svg>
  )
}
