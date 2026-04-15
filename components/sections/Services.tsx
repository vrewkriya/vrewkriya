"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    name: "Campaign Shoots",
    body: "Art-directed photo and video productions for seasonal launches, brand campaigns, and editorial placements. Every frame calibrated to make gems feel alive.",
  },
  {
    number: "02",
    name: "Brand Identity",
    body: "Visual identity systems, packaging design, and brand guidelines for jewelry houses seeking a presence that matches their craft. From mood to mark.",
  },
  {
    number: "03",
    name: "Digital Presence",
    body: "E-commerce creative, social content strategy, and website design that converts admiration into acquisition. Luxury, optimised.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = globalThis.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<Element>(".reveal");
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-36 px-8 md:px-16"
      style={{ background: "var(--bg-2)" }}
    >
      {/* Header — 2 column */}
      <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
        {/* Left */}
        <div>
          <SectionLabel>What We Do</SectionLabel>
          <h2 className="font-display font-light text-cream text-4xl md:text-5xl mt-5 leading-tight">
            Services Built for{" "}
            <span className="italic text-gold">Brilliance</span>
          </h2>
        </div>

        {/* Right */}
        <div className="max-w-md">
          <p
            className="font-sans font-extralight text-cream-dim leading-relaxed mb-5"
            style={{ fontSize: "0.78rem" }}
          >
            We don&apos;t just photograph jewelry — we translate its soul into
            visuals that command attention and convert desire into devotion.
          </p>
          <a
            href="#contact"
            className="font-sans font-extralight text-gold-dim uppercase tracking-widest2 underline underline-offset-4 decoration-gold-dim/40 transition-colors hover:text-gold"
            style={{ fontSize: "0.6rem" }}
          >
            Start a Project
          </a>
        </div>
      </div>

      {/* Divider */}
      <hr className="gold-hr reveal mb-0" />

      {/* 3-column service cards */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {services.map((service, i) => (
          <article
            key={service.number}
            className="reveal group relative px-8 py-14 md:px-11 md:py-14 transition-colors"
            style={{
              borderRight:
                i < services.length - 1 ? "1px solid var(--line)" : "none",
            }}
          >
            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(201,169,110,0.04) 0%, transparent 100%)",
              }}
            />

            <span
              className="relative font-sans font-light text-cream-dim tracking-widest2 mb-5 block"
              style={{ fontSize: "0.7rem" }}
            >
              {service.number}
            </span>

            <span
              className="relative block w-9 h-px mb-6"
              style={{ background: "var(--gold-dim)" }}
            />

            <h3 className="relative font-display font-light text-cream text-2xl md:text-[26px] mb-4 leading-snug">
              {service.name}
            </h3>

            <p
              className="relative font-sans font-extralight text-cream-dim leading-relaxed"
              style={{ fontSize: "0.78rem" }}
            >
              {service.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
