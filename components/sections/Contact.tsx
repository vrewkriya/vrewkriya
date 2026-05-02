"use client";

import React, { useState, useRef, useEffect } from "react";
import { serviceCategories } from "@/lib/data/services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const countryCodeOptions = [
  { label: "India (+91)", value: "+91" },
  { label: "United States (+1)", value: "+1" },
  { label: "United Kingdom (+44)", value: "+44" },
  { label: "United Arab Emirates (+971)", value: "+971" },
  { label: "Singapore (+65)", value: "+65" },
  { label: "Canada (+1)", value: "+1" },
  { label: "Australia (+61)", value: "+61" },
  { label: "Saudi Arabia (+966)", value: "+966" },
  { label: "Qatar (+974)", value: "+974" },
  { label: "Malaysia (+60)", value: "+60" },
  { label: "Sri Lanka (+94)", value: "+94" },
  { label: "Bangladesh (+880)", value: "+880" },
  { label: "Pakistan (+92)", value: "+92" },
  { label: "Nepal (+977)", value: "+977" },
  { label: "South Africa (+27)", value: "+27" },
  { label: "Kenya (+254)", value: "+254" },
  { label: "Germany (+49)", value: "+49" },
  { label: "France (+33)", value: "+33" },
  { label: "Italy (+39)", value: "+39" },
  { label: "UAE (+971)", value: "+971" },
];

const contactSchema = z.object({
  firstName: z.string().min(1, "First Name is required").max(50, "First Name must be at most 50 characters"),
  brandCompany: z.string().min(1, "Brand / Company is required").max(100, "Brand / Company must be at most 100 characters"),
  email: z.string().min(1, "Email is required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  countryCode: z.string().min(1, "Select a country code"),
  mobileNumber: z.string()
    .min(7, "Enter a valid mobile number")
    .max(20, "Mobile number is too long")
    .regex(/^\d+$/, "Mobile number must contain only digits"),
  services: z.array(z.string()).min(1, "Select at least one service"),
  brandInfo: z.string().min(1, "Tell us about your brand").refine((val) => {
    return val.trim().split(/\s+/).length <= 500;
  }, {
    message: "Message must be at most 500 words",
  }),
}).superRefine((data, ctx) => {
  if (data.countryCode === "+91" && data.mobileNumber.length !== 10) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Indian mobile numbers must be exactly 10 digits",
      path: ["mobileNumber"],
    });
  }
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
      countryCode: "+91",
      mobileNumber: "",
      services: [],
      brandInfo: "",
    },
  });

  const selectedServices = watch("services");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
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

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.firstName,
          brand: data.brandCompany,
          email: data.email,
          countryCode: data.countryCode,
          mobileNumber: data.mobileNumber,
          service: data.services.join(', '),
          message: data.brandInfo,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setSubmitStatus({ type: 'error', message: result.error || 'Failed to submit form' });
        return;
      }

      setSubmitStatus({ type: 'success', message: 'Thank you! We will get in touch shortly.' });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'An error occurred. Please try again.' });
      console.error('Form submission error:', error);
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
          <div className="form-field reveal reveal-delay-1">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <div className="phone-input-row">
              <select
                id="countryCode"
                className={`country-code-select ${errors.countryCode ? "input-error" : ""}`}
                {...register("countryCode")}
              >
                {countryCodeOptions.map((option) => (
                  <option key={option.value + option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <input
                id="mobileNumber"
                type="tel"
                inputMode="numeric"
                placeholder="Enter mobile number"
                className={errors.mobileNumber ? "input-error" : ""}
                {...(() => {
                  const { onChange, ...rest } = register("mobileNumber");
                  return {
                    ...rest,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      // Remove any non-digit characters
                      e.target.value = e.target.value.replace(/\D/g, "");
                      // Restrict to 10 digits if country code is India (+91)
                      if (watch("countryCode") === "+91" && e.target.value.length > 10) {
                        e.target.value = e.target.value.slice(0, 10);
                      }
                      onChange(e);
                    }
                  };
                })()}
              />
            </div>
            {(errors.countryCode || errors.mobileNumber) && (
              <span className="form-error">
                {errors.countryCode?.message || errors.mobileNumber?.message}
              </span>
            )}
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

          {submitStatus.type === 'error' && (
            <div className="form-error" style={{ marginTop: '1rem' }}>
              {submitStatus.message}
            </div>
          )}

          {submitStatus.type === 'success' && (
            <div style={{ color: 'green', marginTop: '1rem' }}>
              {submitStatus.message}
            </div>
          )}

          <button type="submit" className="form-submit reveal reveal-delay-4" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Book a Consultation'}
          </button>
        </form>
      </div>
    </section>
  );
}
