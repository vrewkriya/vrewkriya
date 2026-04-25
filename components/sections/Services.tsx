import Link from "next/link";
import { serviceCategories } from "@/lib/data/services";

/* ─── Top 6 priority services (by slug) ─── */
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

/* ─── Pictogram SVG icons (minimal, geometric, diamond-inspired) ─── */
const serviceIcons: Record<string, React.ReactNode> = {
  "creative-production": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="8.5" x2="22" y2="8.5" />
      <line x1="2" y1="15.5" x2="22" y2="15.5" />
    </svg>
  ),
  "content-and-brand-strategy": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  "new-store-launch-support": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  "google-business-profile-management": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  ),
  "end-to-end-campaign-execution": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10,8 16,12 10,16" />
    </svg>
  ),
  "social-media-management": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 2h4v4" />
      <path d="M21 2l-7 7" />
      <path d="M14 9a5 5 0 11-4.5 7" />
      <path d="M7 22H3v-4" />
      <path d="M3 22l7-7" />
    </svg>
  ),
};

export default function Services() {
  return (
    <section id="services" className="services-section">
      {/* Noise overlay */}
      <div className="services-noise" />

      {/* ─── Header ─── */}
      <div className="services-header-v2">
        <p className="section-label reveal">Services</p>
        <h2 className="section-title services-title-v2 reveal reveal-delay-1">
          What We <em>Do</em>
        </h2>
        <p className="services-subtitle reveal reveal-delay-2">
          Meticulously crafted campaigns and digital experiences
          that command attention for luxury jewellery brands.
        </p>
      </div>

      {/* ─── 3×2 Grid ─── */}
      <div className="services-grid-v2">
        {priorityServices.map((service, index) => {
          const isFeatured = service.slug === featuredSlug;
          const delayClass = index === 0 ? "" : `reveal-delay-${Math.min(index, 4)}`;

          return (
            <Link
              href={`/services/${service.slug}`}
              key={service.slug}
              className={`svc-card reveal ${delayClass}${isFeatured ? " svc-card--featured" : ""}`}
            >
              {/* Icon */}
              <div className="svc-card__icon">
                {serviceIcons[service.slug]}
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
            </Link>
          );
        })}
      </div>

      {/* ─── View All CTA ─── */}
      <div className="services-viewall reveal reveal-delay-3">
        <Link href="/services" className="services-viewall__link">
          <span className="services-viewall__line" />
          <span>View All Services</span>
          <span className="services-viewall__arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
