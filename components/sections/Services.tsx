import Image from "next/image";
import Link from "next/link";
import { serviceCategories } from "@/lib/data/services";

export default function Services() {
  return (
    <section id="services">
      <div className="services-header">
        <div>
          <p className="section-label reveal">What We Do</p>
          <h2 className="section-title services-title reveal reveal-delay-1">
            Crafting Visual
            <br />
            <em>Legacies</em>
          </h2>
        </div>
        <div>
          <p className="services-intro reveal reveal-delay-2">
            Every jewel has a story. We give it a stage, through meticulously
            crafted imagery, campaigns, and digital experiences that command
            attention in a crowded world.
          </p>
          <Link href="#contact" className="btn-ghost reveal reveal-delay-3">
            Start a Project
          </Link>
        </div>
      </div>

      <div className="services-grid">
        {serviceCategories.map((service, index) => {
          const delayClass = index === 0 ? "" : `reveal-delay-${Math.min(index, 4)}`;

          return (
            <Link
              href={`/services/${service.slug}`}
              key={service.title}
              className={`service-card-wrapper reveal ${delayClass}`}
              style={{ display: "block", textDecoration: "none" }}
            >
              <div
                className="service-card service-card-closed"
                style={{
                  transition: "border-color 0.4s",
                  cursor: "pointer",
                }}
              >
                <div className="service-accordion-trigger">
                  <div className="service-title-wrap">
                    <Image src="/diamond.png" width={58} height={58} alt="Diamond" className="service-diamond" />
                    <h3 className="service-name">{service.title}</h3>
                  </div>
                  <div className="service-trigger-right" style={{ alignItems: "center" }}>
                    <span className="service-short-desc">{service.shortDesc}</span>
                    <div 
                      className="service-view-btn" 
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "8px", 
                        fontSize: "0.75rem", 
                        letterSpacing: "0.15em", 
                        textTransform: "uppercase", 
                        color: "var(--gold)", 
                        whiteSpace: "nowrap",
                        marginLeft: "16px"
                      }}
                    >
                      View Service <span className="service-arrow" style={{ fontSize: "1.1rem" }}>→</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
