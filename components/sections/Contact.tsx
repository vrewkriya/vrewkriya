"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { serviceCategoryTitles } from "@/lib/data/services";
import ReCAPTCHA from "react-google-recaptcha";

function ContactForm() {
  const searchParams = useSearchParams();
  const initialCompany = searchParams.get("company") || "";
  
  const servicesParam = searchParams.get("services");
  
  const initialServices = servicesParam 
    ? servicesParam.split(",").map(slug => {
        return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      }).filter(title => serviceCategoryTitles.includes(title))
    : [];

  const [selectedServices, setSelectedServices] = useState<string[]>(initialServices);
  const [companyName, setCompanyName] = useState(initialCompany);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  useEffect(() => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    if (selectedServices.length === 0) {
      setSubmitError("Please select at least one service.");
      setIsSubmitting(false);
      return;
    }

    if (!recaptchaToken && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      setSubmitError("Please complete the reCAPTCHA verification.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          brand: companyName,
          email,
          service: selectedServices.join(", "),
          message,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send inquiry");
      }

      setSubmitSuccess(true);
      setFirstName("");
      setCompanyName("");
      setEmail("");
      setSelectedServices([]);
      setMessage("");
    } catch (error: any) {
      setSubmitError(error?.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <span className="detail-value">Bengaluru, Karnataka &mdash; India</span>
          </div>
          <div className="contact-detail-item">
            <span className="detail-label">Hours</span>
            <span className="detail-value">Mon &ndash; Sat, 10am &ndash; 7pm IST</span>
          </div>
        </div>
      </div>

      <form className="contact-right" onSubmit={handleSubmit} suppressHydrationWarning>
        <div className="form-row">
          <div className="form-field reveal">
            <label htmlFor="first-name">First Name</label>
            <input 
              id="first-name" 
              type="text" 
              placeholder="Your Name" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              suppressHydrationWarning
            />
          </div>
          <div className="form-field reveal reveal-delay-1">
            <label htmlFor="brand-company">Brand / Company</label>
            <input 
              id="brand-company" 
              type="text" 
              placeholder="Your Brand or Company" 
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              suppressHydrationWarning
            />
          </div>
        </div>
        <div className="form-field reveal reveal-delay-1">
          <label htmlFor="email-address">Email Address</label>
          <input
            id="email-address"
            type="email"
            placeholder="hello@yourbrand.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            suppressHydrationWarning
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
              suppressHydrationWarning
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
          <input type="hidden" id="service-interested" name="service-interested" value={selectedServices.join(", ")} />
        </div>
        <div className="form-field reveal reveal-delay-3">
          <label htmlFor="brand-info">Tell Us About Your Brand</label>
          <textarea
            id="brand-info"
            placeholder="Share your vision, your collection, your goals."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        
        {submitError && <div style={{ color: "red", marginTop: "1rem" }}>{submitError}</div>}
        {submitSuccess && <div style={{ color: "green", marginTop: "1rem" }}>Thank you! Your message has been successfully sent.</div>}

        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <div style={{ marginTop: "1.5rem", marginBottom: "1rem" }} className="reveal reveal-delay-3">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={(token) => setRecaptchaToken(token)}
              theme="dark"
            />
          </div>
        )}

        <button type="submit" disabled={isSubmitting} className="form-submit reveal reveal-delay-4">
          {isSubmitting ? "Sending..." : "Book a Consultation"}
        </button>
      </form>
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