"use client";
import { useEffect, useRef, useState } from "react";

export default function Portfolio() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    // Smooth horizontal scroll on portfolio with mouse drag
    const scroll = scrollRef.current;
    if (!scroll) return;

    let isDown = false,
      startX: number,
      scrollLeft: number;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - scroll.offsetLeft;
      scrollLeft = scroll.scrollLeft;
      scroll.style.cursor = "grabbing";
    };
    const onMouseLeave = () => {
      isDown = false;
      scroll.style.cursor = "none";
    };
    const onMouseUp = () => {
      isDown = false;
      scroll.style.cursor = "none";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scroll.offsetLeft;
      scroll.scrollLeft = scrollLeft - (x - startX) * 1.4;
    };

    scroll.addEventListener("mousedown", onMouseDown);
    scroll.addEventListener("mouseleave", onMouseLeave);
    scroll.addEventListener("mouseup", onMouseUp);
    scroll.addEventListener("mousemove", onMouseMove);

    return () => {
      scroll.removeEventListener("mousedown", onMouseDown);
      scroll.removeEventListener("mouseleave", onMouseLeave);
      scroll.removeEventListener("mouseup", onMouseUp);
      scroll.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section id="portfolio">
      <div className="portfolio-header">
        <div>
          <p className="section-label reveal">Selected Work</p>
          <h2 className="section-title portfolio-title reveal reveal-delay-1">
            The Portfolio
          </h2>
        </div>
        <ul className="portfolio-filter reveal reveal-delay-2">
          {["All", "Shoots", "Campaigns", "Digital"].map((filter) => (
            <li
              key={filter}
              className={activeFilter === filter ? "active" : ""}
            >
              <button
                type="button"
                onClick={() => setActiveFilter(filter)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  font: "inherit",
                  color: "inherit",
                  cursor: "pointer",
                  display: "block",
                  width: "100%",
                  height: "100%",
                }}
              >
                {filter}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="portfolio-scroll" ref={scrollRef}>
        <div className="portfolio-item">
          <div className="portfolio-img port-bg-1 port-gem-placeholder">
            <svg aria-hidden="true" width="120" height="120" viewBox="0 0 120 120" fill="none">
              <polygon
                points="60,15 95,40 90,38 60,25 30,38 25,40"
                fill="#c9a96e"
                opacity="0.15"
                stroke="#c9a96e"
                strokeWidth="0.6"
              />
              <polygon
                points="60,25 90,38 60,62 30,38"
                fill="#1a2240"
                stroke="#c9a96e"
                strokeWidth="0.5"
                opacity="0.8"
              />
              <polygon
                points="25,40 30,38 60,62 30,78"
                fill="#0d1830"
                stroke="#c9a96e"
                strokeWidth="0.5"
              />
              <polygon
                points="95,40 90,38 60,62 90,78"
                fill="#1a2844"
                stroke="#c9a96e"
                strokeWidth="0.5"
              />
              <polygon
                points="30,78 60,62 90,78 60,105"
                fill="#0a1020"
                stroke="#c9a96e"
                strokeWidth="0.5"
              />
              <circle cx="52" cy="34" r="2" fill="#c9a96e" opacity="0.7" />
            </svg>
          </div>
          <div className="portfolio-overlay">
            <div className="portfolio-meta">
              <h4>Azura Collection</h4>
              <p>Campaign · 2024</p>
            </div>
          </div>
        </div>
        <div className="portfolio-item">
          <div className="portfolio-img port-bg-2 port-gem-placeholder">
            <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
              <ellipse
                cx="40"
                cy="32"
                rx="22"
                ry="28"
                fill="#2a0e14"
                stroke="#c9a96e"
                strokeWidth="0.6"
                opacity="0.9"
              />
              <ellipse
                cx="40"
                cy="30"
                rx="14"
                ry="18"
                fill="#c9a96e"
                opacity="0.07"
              />
              <line
                x1="40"
                y1="60"
                x2="40"
                y2="90"
                stroke="#c9a96e"
                strokeWidth="0.5"
                opacity="0.4"
              />
              <ellipse
                cx="40"
                cy="32"
                rx="6"
                ry="8"
                fill="#c9a96e"
                opacity="0.2"
              />
              <circle cx="33" cy="24" r="2" fill="#c9a96e" opacity="0.5" />
            </svg>
          </div>
          <div className="portfolio-overlay">
            <div className="portfolio-meta">
              <h4>Rouge Eternel</h4>
              <p>Editorial · 2024</p>
            </div>
          </div>
        </div>
        <div className="portfolio-item">
          <div className="portfolio-img port-bg-3 port-gem-placeholder">
            <svg aria-hidden="true" width="80" height="100" viewBox="0 0 80 100" fill="none">
              <polygon
                points="50,8 85,30 85,70 50,92 15,70 15,30"
                fill="#0f2318"
                stroke="#c9a96e"
                strokeWidth="0.6"
              />
              <polygon
                points="50,8 85,30 50,50 15,30"
                fill="#1a3820"
                stroke="#c9a96e"
                strokeWidth="0.4"
                opacity="0.8"
              />
              <polygon
                points="15,30 50,50 15,70"
                fill="#0c1e10"
                stroke="#c9a96e"
                strokeWidth="0.4"
              />
              <polygon
                points="85,30 50,50 85,70"
                fill="#162c18"
                stroke="#c9a96e"
                strokeWidth="0.4"
              />
              <polygon
                points="15,70 50,50 85,70 50,92"
                fill="#081208"
                stroke="#c9a96e"
                strokeWidth="0.4"
              />
              <circle cx="44" cy="22" r="2" fill="#c9a96e" opacity="0.6" />
            </svg>
          </div>
          <div className="portfolio-overlay">
            <div className="portfolio-meta">
              <h4>Forest Reverie</h4>
              <p>Shoot · 2023</p>
            </div>
          </div>
        </div>
        <div className="portfolio-item">
          <div className="portfolio-img port-bg-4 port-gem-placeholder">
            <svg aria-hidden="true" width="100" height="100" viewBox="0 0 100 100" fill="none">
              <polygon
                points="50,5 80,25 70,22 50,12 30,22 20,25"
                fill="#c9a96e"
                opacity="0.12"
                stroke="#c9a96e"
                strokeWidth="0.5"
              />
              <polygon
                points="50,12 70,22 50,42 30,22"
                fill="#1e1530"
                stroke="#c9a96e"
                strokeWidth="0.5"
              />
              <polygon
                points="20,25 30,22 50,42 30,55"
                fill="#140c20"
                stroke="#c9a96e"
                strokeWidth="0.4"
              />
              <polygon
                points="80,25 70,22 50,42 70,55"
                fill="#1e1535"
                stroke="#c9a96e"
                strokeWidth="0.4"
              />
              <polygon
                points="30,55 50,42 70,55 50,75"
                fill="#0e0a18"
                stroke="#c9a96e"
                strokeWidth="0.4"
              />
              <circle cx="44" cy="16" r="1.5" fill="#c9a96e" opacity="0.7" />
            </svg>
          </div>
          <div className="portfolio-overlay">
            <div className="portfolio-meta">
              <h4>Lumière Noire</h4>
              <p>Campaign · 2023</p>
            </div>
          </div>
        </div>
        <div className="portfolio-item">
          <div className="portfolio-img port-bg-5 port-gem-placeholder">
            <svg aria-hidden="true" width="100" height="80" viewBox="0 0 100 80" fill="none">
              <polygon
                points="40,5 70,22 70,58 40,75 10,58 10,22"
                fill="#241810"
                stroke="#c9a96e"
                strokeWidth="0.6"
                opacity="0.9"
              />
              <polygon
                points="40,5 70,22 40,40 10,22"
                fill="#2e1e10"
                stroke="#c9a96e"
                strokeWidth="0.4"
              />
              <polygon
                points="10,22 40,40 10,58"
                fill="#1a1008"
                stroke="#c9a96e"
                strokeWidth="0.4"
              />
              <polygon
                points="70,22 40,40 70,58"
                fill="#221408"
                stroke="#c9a96e"
                strokeWidth="0.4"
              />
              <polygon
                points="10,58 40,40 70,58 40,75"
                fill="#100c04"
                stroke="#c9a96e"
                strokeWidth="0.4"
              />
              <circle cx="35" cy="16" r="1.5" fill="#c9a96e" opacity="0.6" />
            </svg>
          </div>
          <div className="portfolio-overlay">
            <div className="portfolio-meta">
              <h4>Amber Dusk</h4>
              <p>Digital · 2023</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
