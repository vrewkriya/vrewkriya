import { notFound } from "next/navigation";
import Link from "next/link";
import { serviceCategories } from "@/lib/data/services";
import Footer from "@/components/layout/Footer";
import ScrollUpOnMount from "@/components/ui/ScrollUpOnMount";
import "./service-detail.css"; // Import the specific css styles
import LazyVideo from "./LazyVideo";

export async function generateStaticParams() {
  return serviceCategories.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const serviceIndex = serviceCategories.findIndex(
    (s) => s.slug === resolvedParams.slug
  );

  if (serviceIndex === -1) {
    notFound();
  }

  const service = serviceCategories[serviceIndex];

  const bgMapping: Record<string, string> = {
    "creative-production": "linear-gradient(135deg,#1a2240 0%,#0a0a0d 100%)",
    "content-and-brand-strategy": "linear-gradient(135deg,#2a0e14 0%,#0a0a0d 100%)",
    "post-production-and-delivery": "linear-gradient(135deg,#0f2318 0%,#0a0a0d 100%)",
    "performance-marketing": "linear-gradient(135deg,#1e1030 0%,#0a0a0d 100%)",
    "social-media-management": "linear-gradient(135deg,#1e1208 0%,#0a0a0d 100%)"
  };

  const bgStyle = bgMapping[service.slug] || "linear-gradient(135deg,#1a2240 0%,#0a0a0d 100%)";

  // Extracting first word and rest for styling purposes
  const firstSpaceIndex = service.title.indexOf(' ');
  const titleFirst = firstSpaceIndex === -1 ? service.title : service.title.substring(0, firstSpaceIndex);
  const titleRest = firstSpaceIndex === -1 ? "" : service.title.substring(firstSpaceIndex + 1);

  return (
    <>
      <ScrollUpOnMount />
      <div id="page-detail">
        <div className="detail-hero" id="detailHero" style={{ position: "relative", overflow: "hidden" }}>
          {service.slug === "creative-production" ? (
            <>
              <LazyVideo src="/backdrops/creative-production.mp4" />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.60)", zIndex: 1 }} />
            </>
          ) : (
            <div
              className="detail-hero-bg"
              id="detailHeroBg"
              style={{ background: bgStyle }}
            />
          )}
          <div className="detail-hero-content" style={{ position: "relative", zIndex: 2 }}>
            <div className="detail-breadcrumb">
              <Link href="/#services" className="breadcrumb-back">
                ← Services
              </Link>
              <span>/</span>
              <span id="detailBreadcrumb">{service.title}</span>
            </div>
            <h1 className="detail-title" id="detailTitle">
              {titleFirst} {titleRest && <em>{titleRest}</em>}
            </h1>
          </div>
        </div>

        <div className="detail-body">
          <div className="detail-main">
            <p className="detail-lead" id="detailLead">
              {service.shortDesc}
            </p>

            <div className="detail-section-title">What&apos;s Included</div>
            <ul className="deliverables" id="detailDeliverables">
              {service.points.map((point) => (
                <li key={point}>
                  {point}
                </li>
              ))}
            </ul>

            {/* Keeping it true to design but substituting process blocks if not found */}
            <div className="detail-section-title" style={{ marginTop: "56px" }}>
              Our Approach
            </div>
            <div className="process-steps" id="detailProcess">
              <div className="process-step">
                <div className="step-num">01</div>
                <div className="step-content">
                  <h4>Discovery & Alignment</h4>
                  <p>We deep-dive into your brand world, target audience, and campaign objectives before proceeding.</p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-num">02</div>
                <div className="step-content">
                  <h4>Concept & Execution</h4>
                  <p>Meticulous planning and execution tailored exclusively for jewelry to ensure perfection.</p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-num">03</div>
                <div className="step-content">
                  <h4>Review & Delivery</h4>
                  <p>Curated selections and high-quality finishing, delivering platform-optimised assets.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-sidebar">
            <div className="sidebar-block">
              <div className="sidebar-label">Ideal For</div>
              <div className="sidebar-value" id="detailIdealFor">
                Jewelry brands aiming for exceptional digital presentation and growth.
              </div>
            </div>
            <div className="sidebar-block">
              <div className="sidebar-label">Turnaround</div>
              <div className="sidebar-value" id="detailTurnaround">
                Project dependent
              </div>
            </div>
            <div className="sidebar-block">
              <div className="sidebar-label">Focus Areas</div>
              <div className="sidebar-tags" id="detailSidebarTags">
                <span className="sidebar-tag">Strategy</span>
                <span className="sidebar-tag">Production</span>
                <span className="sidebar-tag">Quality</span>
              </div>
            </div>
            <div className="sidebar-block">
              <Link href={`/?service=${service.slug}#contact`} className="sidebar-cta">
                Request a Proposal
              </Link>
            </div>
            <div className="sidebar-block">
              <div className="sidebar-label">Other Services</div>
              <div className="sidebar-related" id="detailRelated">
                {serviceCategories
                  .filter((s) => s.slug !== resolvedParams.slug)
                  .slice(0, 3)
                  .map((rs) => (
                    <Link
                      key={rs.slug}
                      href={`/services/${rs.slug}`}
                      className="related-link"
                    >
                      <span className="related-link-name">{rs.title}</span>
                      <span className="related-arrow">→</span>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
