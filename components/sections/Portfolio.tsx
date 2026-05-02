"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

export interface PortfolioItem {
  _id: string;
  title: string;
  category: string;
  year?: string;
  image?: any;
  order?: number;
}

export default function Portfolio({
  portfolioData,
}: {
  readonly portfolioData: readonly PortfolioItem[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;

    let isDown = false,
      startX = 0,
      scrollLeft = 0;

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
        {(portfolioData || [])
          .filter(
            (item) =>
              activeFilter === "All" || item.category === activeFilter
          )
          .map((item, index) => {
            const hasImage = !!item.image;
            const bgClass = `port-bg-${(index % 4) + 1}`;

            return (
              <div className="portfolio-item" key={item._id || index}>
                <div
                  className={`portfolio-img ${bgClass} ${
                    hasImage ? "" : "port-gem-placeholder"
                  }`}
                  style={{ position: 'relative' }}
                >
                  {hasImage ? (
                    <Image
                      src={urlForImage(item.image)?.url() || ""}
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <svg aria-hidden="true" width="120" height="120" viewBox="0 0 120 120" fill="none">
                      <polygon points="60,15 95,40 90,38 60,25 30,38 25,40" fill="#c9a96e" opacity="0.15" stroke="#c9a96e" strokeWidth="0.6" />
                      <polygon points="60,25 90,38 60,62 30,38" fill="#1a2240" stroke="#c9a96e" strokeWidth="0.5" opacity="0.8" />
                      <polygon points="25,40 30,38 60,62 30,78" fill="#0d1830" stroke="#c9a96e" strokeWidth="0.5" />
                      <polygon points="95,40 90,38 60,62 90,78" fill="#1a2844" stroke="#c9a96e" strokeWidth="0.5" />
                      <polygon points="30,78 60,62 90,78 60,105" fill="#0a1020" stroke="#c9a96e" strokeWidth="0.5" />
                      <circle cx="52" cy="34" r="2" fill="#c9a96e" opacity="0.7" />
                    </svg>
                  )}
                </div>
                <div className="portfolio-overlay">
                  <div className="portfolio-meta">
                    <h4>{item.title}</h4>
                    <p>
                      {item.category} {item.year ? `· ${item.year}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
