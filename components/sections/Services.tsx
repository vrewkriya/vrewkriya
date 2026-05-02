"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { serviceCategories } from "@/lib/data/services";

/*  Top 6 priority services (by slug)  */
const prioritySlugs = [
  "creative-production",
  "content-and-brand-strategy",
  "new-store-launch-support",
  "google-business-profile-management",
  "end-to-end-campaign-execution",
  "social-media-management",
];

const featuredSlug = "creative-production"; // highlighted card

const priorityServices = prioritySlugs
  .map((slug) => serviceCategories.find((s) => s.slug === slug)!)
  .filter(Boolean);

/* Remaining services (not in the priority 6) */
const remainingServices = serviceCategories.filter(
  (s) => !prioritySlugs.includes(s.slug)
);

/*  Pictogram SVG icons (minimal, geometric, diamond-inspired)  */
const serviceIcons: Record<string, React.ReactNode> = {
  "creative-production": (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="8.5" x2="22" y2="8.5" />
      <line x1="2" y1="15.5" x2="22" y2="15.5" />
    </svg>
  ),
  "content-and-brand-strategy": (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  "new-store-launch-support": (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  "google-business-profile-management": (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  ),
  "end-to-end-campaign-execution": (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="10,8 16,12 10,16" />
    </svg>
  ),
  "social-media-management": (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 2h4v4" />
      <path d="M21 2l-7 7" />
      <path d="M14 9a5 5 0 11-4.5 7" />
      <path d="M7 22H3v-4" />
      <path d="M3 22l7-7" />
    </svg>
  ),
  "post-production-and-delivery": (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 8l3 3 4-4 3 3" />
    </svg>
  ),
  "performance-marketing": (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  "exhibition-and-outstation-promotion": (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  "consulting-and-growth-strategy": (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 20h20" />
      <path d="M5 20V10l4-6" />
      <path d="M9 20V4l5 4" />
      <path d="M14 20V8l5 6" />
      <path d="M19 20V14" />
    </svg>
  ),
};

/*  Render a single service card  */
function ServiceCard({
  service,
  index,
  isFeatured = false,
  animDelay = 0,
}: Readonly<{
  service: (typeof serviceCategories)[number];
  index: number;
  isFeatured?: boolean;
  animDelay?: number;
}>) {
  const delayClass =
    index === 0 ? "" : `reveal-delay-${Math.min(index, 4)}`;

  return (
    <Link
      href={`/services/${service.slug}`}
      key={service.slug}
      className={`svc-card reveal ${delayClass}${isFeatured ? " svc-card--featured" : ""}`}
      style={animDelay > 0 ? { transitionDelay: `${animDelay}ms` } : undefined}
    >
      {/* Text Content */}
      <div className="svc-card__body">
        {/* Icon */}
        <div className="svc-card__icon">
          {typeof serviceIcons[service.slug] === "object" &&
            serviceIcons[service.slug] !== null
            ? React.cloneElement(
              serviceIcons[service.slug] as React.ReactElement<
                React.SVGProps<SVGSVGElement>
              >,
              { width: 44, height: 44, strokeWidth: "1" },
            )
            : serviceIcons[service.slug]}
        </div>

        {/* Title */}
        <h3 className="svc-card__title">{service.title}</h3>

        {/* Description */}
        <p className="svc-card__desc">{service.shortDesc}</p>

        {/* Divider */}
        <div className="svc-card__divider" />

        {/* CTA */}
        <span className="svc-card__cta">
          <span className="svc-card__cta-line" />
          <span>View Service</span>
          <span className="svc-card__arrow">→</span>
        </span>
      </div>
    </Link>
  );
}

export default function Services() {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandRef = useRef<HTMLDivElement>(null);

  /* After expanding, trigger reveal animation on new cards */
  const triggerRevealOnExpanded = useCallback(() => {
    if (!expandRef.current) return;
    const cards = expandRef.current.querySelectorAll(".reveal");
    // Stagger the reveal animation
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add("visible", "in");
      }, 80 * (i + 1));
    });
  }, []);

  useEffect(() => {
    if (isExpanded) {
      // Small delay to let the DOM render the new cards first
      requestAnimationFrame(() => {
        triggerRevealOnExpanded();
      });
    }
  }, [isExpanded, triggerRevealOnExpanded]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isExpanded) {
      // Collapse: scroll back to the services section smoothly
      const section = document.getElementById("services");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setIsExpanded((prev) => !prev);
  };

  return (
    <section id="services" className="services-section">
      {/* Noise overlay */}
      <div className="services-noise" />

      {/*  Header  */}
      <div className="services-header-v2">
        <div className="services-header-left">
          <p className="section-label reveal">What We Offer</p>
          <h2 className="section-title services-title-v2 reveal reveal-delay-1" style={{ marginBottom: 0 }}>
            Crafting Visual <br />
            <em>Legacies</em>
          </h2>
        </div>
        <div className="services-header-right">
          <p className="services-subtitle reveal reveal-delay-2">
            Every jewel has a story. We give it a stage, through meticulously crafted imagery, campaigns, and digital experiences that command attention in a crowded world.
          </p>
        </div>
      </div>

      {/*  3×2 Priority Grid  */}
      <div className="services-grid-v2">
        {priorityServices.map((service, index) => (
          <ServiceCard
            key={service.slug}
            service={service}
            index={index}
            isFeatured={service.slug === featuredSlug}
          />
        ))}
      </div>

      {/* Expanded: Remaining Services*/}
      <div
        ref={expandRef}
        className={`services-expand ${isExpanded ? "services-expand--open" : ""}`}
      >
        {isExpanded && (
          <>
            {/* Subtle separator */}
            <div className="services-expand__separator reveal">
              <span className="services-expand__sep-line" />
              <span className="services-expand__sep-label">More Services</span>
              <span className="services-expand__sep-line" />
            </div>

            <div className="services-grid-v2 services-grid-expanded">
              {remainingServices.map((service, index) => (
                <ServiceCard
                  key={service.slug}
                  service={service}
                  index={index}
                  animDelay={80 * (index + 1)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* View All / Collapse CTA */}
      <div className="services-viewall reveal reveal-delay-3">
        <button
          type="button"
          onClick={handleToggle}
          className="services-viewall__link"
        >
          <span className="services-viewall__line" />
          <span>{isExpanded ? "Show Less" : "View All Services"}</span>
          <span
            className={`services-viewall__arrow ${isExpanded ? "services-viewall__arrow--up" : ""}`}
          >
            {isExpanded ? "↑" : "→"}
          </span>
        </button>
      </div>
    </section>
  );
}
