"use client";

import React, { useState, useRef, useEffect } from "react";
import { serviceCategories } from "@/lib/data/services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().min(1, "First Name is required").max(50, "First Name must be at most 50 characters"),
  brandCompany: z.string().min(1, "Brand / Company is required").max(100, "Brand / Company must be at most 100 characters"),
  email: z.string().min(1, "Email is required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  services: z.array(z.string()).min(1, "Select at least one service"),
  brandInfo: z.string().min(1, "Tell us about your brand").refine((val) => {
    return val.trim().split(/\s+/).length <= 500;
  }, {
    message: "Message must be at most 500 words",
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    mode: "onChange",
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      brandCompany: "",
      email: "",
      services: [],
      brandInfo: "",
    },
  });

  const selectedServices = watch("services");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleService = (service: string) => {
    const prev = selectedServices || [];
    const newServices = prev.includes(service)
      ? prev.filter((s) => s !== service)
      : [...prev, service];
    setValue("services", newServices, { shouldValidate: true });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle URL param for auto-selecting service
  useEffect(() => {
    if (globalThis.window !== undefined) {
      const urlParams = new URLSearchParams(globalThis.window.location.search);
      const serviceSlug = urlParams.get("service");
      if (serviceSlug) {
        const matchingService = serviceCategories.find((s) => s.slug === serviceSlug);
        if (matchingService) {
          // Read current services synchronously or just set it
          // We can use a functional update with react-hook-form using watch
          const currentServices = watch("services");
          if (!currentServices.includes(matchingService.title)) {
            setValue("services", [...currentServices, matchingService.title], { shouldValidate: true });
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: ContactFormData) => {
    // Implement standard submission logic here
    console.log("Form submitted successfully:", data);
    alert("Thank you! We will get in touch shortly.");
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
            <span className="detail-value">Bengaluru, Karnataka — India</span>
          </div>
          <div className="contact-detail-item">
            <span className="detail-label">Hours</span>
            <span className="detail-value">Mon – Sat, 10am – 7pm IST</span>
          </div>
        </div>
      </div>

      <div className="contact-right">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-field reveal">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                placeholder="Your Name"
                maxLength={50}
                className={errors.firstName ? "input-error" : ""}
                {...register("firstName")}
              />
              {errors.firstName && <span className="form-error">{errors.firstName.message}</span>}
            </div>
            <div className="form-field reveal reveal-delay-1">
              <label htmlFor="brandCompany">Brand / Company</label>
              <input
                id="brandCompany"
                type="text"
                placeholder="Your Brand or Company"
                maxLength={100}
                className={errors.brandCompany ? "input-error" : ""}
                {...register("brandCompany")}
              />
              {errors.brandCompany && <span className="form-error">{errors.brandCompany.message}</span>}
            </div>
          </div>
          <div className="form-field reveal reveal-delay-1">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="hello@yourbrand.com"
              className={errors.email ? "input-error" : ""}
              {...register("email")}
            />
            {errors.email && <span className="form-error">{errors.email.message}</span>}
          </div>
          <div className="form-field reveal reveal-delay-2" ref={dropdownRef} style={{ position: "relative", zIndex: 100 }}>
            <label htmlFor="service-interested-display" id="service-int-label">Services You Need</label>
            <div className={`custom-select-wrapper ${isDropdownOpen ? 'open' : ''}`}>
              <button
                type="button"
                className={`custom-select-display ${errors.services ? "input-error" : ""}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                id="service-interested-display"
                aria-labelledby="service-int-label"
                aria-expanded={isDropdownOpen}
              >
                {selectedServices && selectedServices.length > 0 ? (
                  <span className="custom-select-value">
                    {selectedServices.join(", ")}
                  </span>
                ) : (
                  <span className="custom-select-placeholder">Select one or more service categories</span>
                )}
              </button>

              {isDropdownOpen && (
                <div className="custom-select-dropdown">
                  {serviceCategories.map((service) => {
                    const isSelected = selectedServices?.includes(service.title);
                    return (
                      <button
                        type="button"
                        key={service.title}
                        className={`custom-select-option ${isSelected ? 'selected' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleService(service.title);
                        }}
                      >
                        <div className="checkbox"></div>
                        <span>{service.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            {errors.services && <span className="form-error">{errors.services.message}</span>}
          </div>
          <div className="form-field reveal reveal-delay-3">
            <label htmlFor="brandInfo">Tell Us About Your Brand</label>
            <textarea
              id="brandInfo"
              placeholder="Share your vision, your collection, your goals…"
              className={errors.brandInfo ? "input-error" : ""}
              {...(() => {
                const { onChange, ...rest } = register("brandInfo");
                return {
                  ...rest,
                  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    const text = e.target.value;
                    const words = text.trim().split(/\s+/).filter(Boolean);
                    if (words.length > 500) {
                      const match = /^\s*(?:\S+\s+){499}\S+/.exec(text);
                      if (match) {
                        e.target.value = match[0];
                      }
                    }
                    onChange(e);
                  }
                };
              })()}
            ></textarea>
            {errors.brandInfo && <span className="form-error">{errors.brandInfo.message}</span>}
          </div>
          <button type="submit" className="form-submit reveal reveal-delay-4">
            Book a Consultation
          </button>
        </form>
      </div>
    </section>
  );
}
