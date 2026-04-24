import Link from "next/link";

export default function About() {
  return (
    <section id="about">
      <div className="about-visual">
        <div className="about-img-bg"></div>
        <div className="about-gem-visual">
          <svg aria-hidden="true" width="280" height="340" viewBox="0 0 280 340" fill="none">
            <defs>
              <linearGradient id="ag1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4a2c6e" />
                <stop offset="100%" stopColor="#1a0e28" />
              </linearGradient>
              <radialGradient id="ag2" cx="40%" cy="35%">
                <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.3" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <filter id="ag-glow">
                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <ellipse
              cx="140"
              cy="160"
              rx="110"
              ry="110"
              fill="none"
              stroke="#c9a96e"
              strokeWidth="0.5"
              strokeOpacity="0.2"
              filter="url(#ag-glow)"
            />
            <ellipse
              cx="140"
              cy="160"
              rx="90"
              ry="90"
              fill="none"
              stroke="#c9a96e"
              strokeWidth="0.3"
              strokeOpacity="0.1"
            />

            <polygon
              points="140,50 195,90 185,87 140,65 95,87 85,90"
              fill="url(#ag2)"
              stroke="#c9a96e"
              strokeWidth="0.7"
            />
            <polygon
              points="140,65 185,87 140,125 95,87"
              fill="url(#ag1)"
              stroke="#c9a96e"
              strokeWidth="0.6"
              opacity="0.9"
            />
            <polygon
              points="85,90 95,87 140,125 95,145"
              fill="#1a0e28"
              stroke="#c9a96e"
              strokeWidth="0.5"
            />
            <polygon
              points="195,90 185,87 140,125 185,145"
              fill="#2a1840"
              stroke="#c9a96e"
              strokeWidth="0.5"
              opacity="0.8"
            />
            <polygon
              points="95,145 140,125 185,145 140,195"
              fill="#120a20"
              stroke="#c9a96e"
              strokeWidth="0.5"
            />
            <polygon
              points="85,90 95,145 140,210"
              fill="#0e0818"
              stroke="#c9a96e"
              strokeWidth="0.4"
              opacity="0.7"
            />
            <polygon
              points="195,90 185,145 140,210"
              fill="#1a1030"
              stroke="#c9a96e"
              strokeWidth="0.4"
              opacity="0.6"
            />
            <line
              x1="140"
              y1="210"
              x2="140"
              y2="218"
              stroke="#c9a96e"
              strokeWidth="1"
              strokeOpacity="0.5"
              filter="url(#ag-glow)"
            />

            <g filter="url(#ag-glow)" opacity="0.8">
              <line
                x1="70"
                y1="76"
                x2="78"
                y2="76"
                stroke="#c9a96e"
                strokeWidth="0.8"
              />
              <line
                x1="74"
                y1="72"
                x2="74"
                y2="80"
                stroke="#c9a96e"
                strokeWidth="0.8"
              />
            </g>
            <circle
              cx="120"
              cy="72"
              r="2"
              fill="#c9a96e"
              opacity="0.6"
              filter="url(#ag-glow)"
            />
            <circle cx="172" cy="96" r="1.5" fill="#ffffff" opacity="0.5" />

            <text
              x="140"
              y="265"
              fontFamily="Cormorant Garamond, serif"
              fontSize="10"
              fontWeight="300"
              fill="#c9a96e"
              opacity="0.5"
              textAnchor="middle"
              letterSpacing="5"
            >
              VREW KRIYA
            </text>
            <line
              x1="80"
              y1="270"
              x2="115"
              y2="270"
              stroke="#c9a96e"
              strokeWidth="0.4"
              strokeOpacity="0.3"
            />
            <line
              x1="165"
              y1="270"
              x2="200"
              y2="270"
              stroke="#c9a96e"
              strokeWidth="0.4"
              strokeOpacity="0.3"
            />
          </svg>
        </div>
      </div>

      <div className="about-content">
        <p className="section-label reveal">The Studio</p>
        <h2 className="section-title about-title reveal reveal-delay-1">
          We Tell Stories
          <br />
          in <em>Light & Shadow</em>
        </h2>
        <p className="about-text reveal reveal-delay-2">
          VrewKriya was born from a singular conviction  that jewellery is not
          just adornment, it is memory, lineage, and identity. Brands that carry
          this weight deserve a visual partner who understands it.
        </p>
        <p className="about-text reveal reveal-delay-3">
          We are a boutique studio working at the intersection of craft and
          commerce. Our approach blends the restraint of old-world luxury
          aesthetics with the precision of modern digital storytelling.
        </p>
        <Link href="#contact" className="btn-ghost reveal reveal-delay-3">
          Work With Us
        </Link>

        <div className="about-stats">
          <div className="reveal reveal-delay-1">
            <div className="stat-num">48+</div>
            <div className="stat-label">Brands Served</div>
          </div>
          <div className="reveal reveal-delay-2">
            <div className="stat-num">6</div>
            <div className="stat-label">Years of Craft</div>
          </div>
          <div className="reveal reveal-delay-3">
            <div className="stat-num">∞</div>
            <div className="stat-label">Stories Left to Tell</div>
          </div>
        </div>
      </div>
    </section>
  );
}
