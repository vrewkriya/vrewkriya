"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { serviceCategoryTitles } from "@/lib/data/services";

function ContactForm() {
  const searchParams = useSearchParams();
  const initialCompany = searchParams.get("company") || "";
  
  // URL may pass slugs instead of full titles, but let's see. 
  // ServicesCards passes slugs like "creative-production".
  // We need to map them to `serviceCategoryTitles` or just pre-fill.
  const servicesParam = searchParams.get("services");
  
  const initialServices = servicesParam 
    ? servicesParam.split(",").map(slug => {
        // Simple mapping: "creative-production" -> "Creative Production"
        return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      }).filter(title => serviceCategoryTitles.includes(title))
    : [];

  const [selectedServices, setSelectedServices] = useState<string[]>(initialServices);
  const [companyName, setCompanyName] = useState(initialCompany);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  useEffect(() => {
    // If the services param exists and the component mounted, gently scroll into view 
    // to guarantee we land on the contact form after the redirect from the deckbuilder
    if (servicesParam) {
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [servicesParam]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section id="contact">
      <div className="contact-left">
        <p className="section-label reveal">Get In Touch</p>
        <h2 className="section-title contact-title reveal reveal-delay-1">
          Ready to
          <br />
          <em>Shine?</em>
        </h2>
        <p className="contact-text reveal reveal-delay-2">
          Every great elevation begins with a conversation. Tell us about your
          brand and what you&apos;re building. We&apos;ll tell you how we can
          make it unforgettable.
        </p>
        <div className="contact-details reveal reveal-delay-3">
          <div className="contact-detail-item">
            <span className="detail-label">Email</span>
            <span className="detail-value">hello@vrewkriya.com</span>
          </div>
          <div className="contact-detail-item">
            <span className="detail-label">Studio</span>
            <span className="detail-value">Bengaluru, Karnataka — India</span>
          </div>
          <div className="contact-detail-item">
            <span className="detail-label">Hours</span>
            <span className="detail-value">Mon – Sat, 10am – 7pm IST</span>
          </div>
        </div>
      </div>

      <div className="contact-right">
        <div className="form-row">
          <div className="form-field reveal">
            <label htmlFor="first-name">First Name</label>
            <input id="first-name" type="text" placeholder="Your Name" />
          </div>
          <div className="form-field reveal reveal-delay-1">
            <label htmlFor="brand-company">Brand / Company</label>
            <input 
              id="brand-company" 
              type="text" 
              placeholder="Your Brand or Company" 
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-field reveal reveal-delay-1">
          <label htmlFor="email-address">Email Address</label>
          <input
            id="email-address"
            type="email"
            placeholder="hello@yourbrand.com"
          />
        </div>
        <div className="form-field reveal reveal-delay-2" ref={dropdownRef} style={{ position: "relative", zIndex: 100 }}>
          <label htmlFor="service-interested-display" id="service-int-label">Services You Need</label>
          <div className={`custom-select-wrapper ${isDropdownOpen ? 'open' : ''}`}>
            <button 
              type="button"
              className="custom-select-display" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              id="service-interested-display"
              aria-labelledby="service-int-label"
              aria-expanded={isDropdownOpen}
            >
              {selectedServices.length > 0 ? (
                <span className="custom-select-value">
                  {selectedServices.join(", ")}
                </span>
              ) : (
                <span className="custom-select-placeholder">Select one or more service categories</span>
              )}
            </button>
            
            {isDropdownOpen && (
              <div className="custom-select-dropdown">
                {serviceCategoryTitles.map((service) => {
                  const isSelected = selectedServices.includes(service);
                  return (
                    <button
                      type="button"
                      key={service}
                      className={`custom-select-option ${isSelected ? 'selected' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleService(service);
                      }}
                    >
                      <div className="checkbox"></div>
                      <span>{service}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          {/* Hidden input to pass selected services to form handler */}
          <input type="hidden" id="service-interested" name="service-interested" value={selectedServices.join(", ")} />
        </div>
        <div className="form-field reveal reveal-delay-3">
          <label htmlFor="brand-info">Tell Us About Your Brand</label>
          <textarea
            id="brand-info"
            placeholder="Share your vision, your collection, your goals…"
          ></textarea>
        </div>
        <button className="form-submit reveal reveal-delay-4">
          Book a Consultation
        </button>
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={
      <section id="contact">
        <div style={{ padding: "10rem", textAlign: "center", color: "#c9a84c" }}>
          Loading Form...
        </div>
      </section>
    }>
      <ContactForm />
    </Suspense>
  );
}
