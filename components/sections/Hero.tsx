"use client";

import { useEffect } from "react";

import Link from "next/link";

export default function Hero() {
  useEffect(() => {
    // Parallax on hero gem
    const heroGem = document.querySelector(".hero-gem") as HTMLElement;
    const scrollHandler = () => {
      const sy = window.scrollY;
      if (heroGem) {
        heroGem.style.transform = `translate(-50%, calc(-50% + ${sy * 0.25}px))`;
        heroGem.style.opacity = Math.max(0, 1 - sy / 600).toString();
      }
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <section id="hero" style={{ position: "relative" }}>
      <div className="hero-bg"></div>

      {/* Floating Gem */}
      <div className="hero-gem" style={{ pointerEvents: "none" }}>
        <svg
          aria-hidden="true"
          viewBox="0 0 520 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4a2c6e" />
              <stop offset="50%" stopColor="#1a1228" />
              <stop offset="100%" stopColor="#2a1840" />
            </linearGradient>
            <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8a6e42" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="g3" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6a3fa0" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#2a1840" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="g4" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#1a0e28" />
              <stop offset="100%" stopColor="#3a2060" />
            </linearGradient>
            <linearGradient id="g5" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.5" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="12" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer glow ring */}
          <ellipse
            cx="260"
            cy="260"
            rx="200"
            ry="200"
            fill="none"
            stroke="#c9a96e"
            strokeWidth="0.5"
            strokeOpacity="0.15"
            filter="url(#glow)"
          />
          <ellipse
            cx="260"
            cy="260"
            rx="220"
            ry="220"
            fill="none"
            stroke="#c9a96e"
            strokeWidth="0.3"
            strokeOpacity="0.08"
          />

          {/* Main gem body - brilliant cut diamond shape */}
          <polygon
            points="260,100 340,160 320,155 260,115 200,155 180,160"
            fill="url(#g5)"
            stroke="url(#g2)"
            strokeWidth="0.8"
          />
          <polygon
            points="260,115 320,155 260,195 200,155"
            fill="url(#g1)"
            stroke="url(#g2)"
            strokeWidth="0.6"
            opacity="0.9"
          />
          <polygon
            points="260,115 340,160 320,155"
            fill="#c9a96e"
            opacity="0.12"
            stroke="#c9a96e"
            strokeWidth="0.4"
          />
          <polygon
            points="260,115 200,155 180,160"
            fill="#c9a96e"
            opacity="0.08"
            stroke="#c9a96e"
            strokeWidth="0.4"
          />

          {/* Bezel facets left */}
          <polygon
            points="180,160 200,155 260,195 200,255"
            fill="url(#g4)"
            stroke="url(#g2)"
            strokeWidth="0.6"
            opacity="0.85"
          />
          {/* Bezel facets right */}
          <polygon
            points="340,160 320,155 260,195 320,255"
            fill="url(#g3)"
            stroke="url(#g2)"
            strokeWidth="0.6"
            opacity="0.75"
          />

          {/* Girdle */}
          <polygon
            points="200,255 260,195 320,255 260,280"
            fill="url(#g1)"
            stroke="url(#g2)"
            strokeWidth="0.5"
            opacity="0.9"
          />

          {/* Pavilion left */}
          <polygon
            points="180,160 200,255 260,350"
            fill="url(#g4)"
            stroke="url(#g2)"
            strokeWidth="0.5"
            opacity="0.7"
          />
          <polygon
            points="200,255 260,280 260,350"
            fill="#1a1228"
            stroke="#c9a96e"
            strokeWidth="0.4"
            opacity="0.8"
          />

          {/* Pavilion right */}
          <polygon
            points="340,160 320,255 260,350"
            fill="url(#g3)"
            stroke="url(#g2)"
            strokeWidth="0.5"
            opacity="0.6"
          />
          <polygon
            points="320,255 260,280 260,350"
            fill="#2a1840"
            stroke="#c9a96e"
            strokeWidth="0.4"
            opacity="0.7"
          />

          {/* Culet (bottom point) */}
          <line
            x1="260"
            y1="350"
            x2="260"
            y2="360"
            stroke="#c9a96e"
            strokeWidth="1"
            strokeOpacity="0.6"
            filter="url(#softGlow)"
          />

          {/* Light reflections / sparkles */}
          <circle
            cx="240"
            cy="148"
            r="3"
            fill="#c9a96e"
            opacity="0.8"
            filter="url(#softGlow)"
          />
          <circle
            cx="300"
            cy="168"
            r="2"
            fill="#ffffff"
            opacity="0.6"
            filter="url(#softGlow)"
          />
          <circle cx="220" cy="190" r="1.5" fill="#c9a96e" opacity="0.5" />

          {/* Small sparkles floating */}
          <g filter="url(#softGlow)" opacity="0.7">
            <line
              x1="150"
              y1="140"
              x2="158"
              y2="140"
              stroke="#c9a96e"
              strokeWidth="0.8"
            />
            <line
              x1="154"
              y1="136"
              x2="154"
              y2="144"
              stroke="#c9a96e"
              strokeWidth="0.8"
            />
          </g>
          <g filter="url(#softGlow)" opacity="0.5">
            <line
              x1="370"
              y1="190"
              x2="376"
              y2="190"
              stroke="#c9a96e"
              strokeWidth="0.6"
            />
            <line
              x1="373"
              y1="187"
              x2="373"
              y2="193"
              stroke="#c9a96e"
              strokeWidth="0.6"
            />
          </g>
          <g filter="url(#softGlow)" opacity="0.4">
            <line
              x1="200"
              y1="310"
              x2="205"
              y2="310"
              stroke="#c9a96e"
              strokeWidth="0.5"
            />
            <line
              x1="202.5"
              y1="307.5"
              x2="202.5"
              y2="312.5"
              stroke="#c9a96e"
              strokeWidth="0.5"
            />
          </g>

          {/* Top line accent */}
          <line
            x1="180"
            y1="160"
            x2="340"
            y2="160"
            stroke="url(#g2)"
            strokeWidth="0.5"
            opacity="0.6"
          />
        </svg>
      </div>

      <div className="hero-content" style={{ zIndex: 10, pointerEvents: "auto" }}>
        <p className="hero-eyebrow">Est. 2025&nbsp;·&nbsp; Bengaluru</p>
        <h1 className="hero-title">
          Where Jewellery
          <br />
          <em>Meets</em> Light
        </h1>
        <p className="hero-sub">
          A luxury visual studio crafting campaigns, shoots, and digital
          presence for jewellery brands that deserve to be felt.
        </p>
        <div className="hero-btns" style={{ pointerEvents: "auto" }}>
          <Link href="/#portfolio" className="btn-primary">
            Explore Work
          </Link>
          <Link href="/#services" className="btn-ghost">
            Our Services
          </Link>
        </div>
      </div>

      <div className="scroll-hint">
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
