"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import GemIllustration from "@/components/ui/GemIllustration";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = globalThis.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<Element>(".reveal-about");
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
      id="about"
      ref={sectionRef}
      className="grid grid-cols-1 md:grid-cols-2 min-h-screen"
      style={{ background: "var(--bg)" }}
    >
      {/* Left panel — visual */}
      <div
        className="reveal-about relative flex flex-col items-center justify-center p-8 md:p-16"
        style={{
          background: "linear-gradient(135deg, #1e1020, #0a0a0d)",
        }}
      >
        <GemIllustration width={280} height={280} className="mb-8" />
        <h3
          className="font-display font-light text-gold-dim uppercase tracking-widest3"
          style={{ fontSize: "0.9rem" }}
        >
          Vrew Kriya
        </h3>
      </div>

      {/* Right panel — content */}
      <div className="reveal-about flex flex-col justify-center p-8 md:p-16 md:pl-12">
        <SectionLabel>About Us</SectionLabel>

        <h2 className="font-display font-light text-cream text-4xl md:text-5xl mt-6 mb-8 leading-tight">
          We Tell Stories in{" "}
          <span className="italic text-gold">Light & Shadow</span>
        </h2>

        <p
          className="font-sans font-extralight text-cream-dim leading-relaxed mb-5"
          style={{ fontSize: "0.85rem" }}
        >
          Since 2024, we've been obsessed with one singular truth: jewelry
          doesn't just sparkle — it resonates. Every campaign we craft, every
          frame we compose, every light we bend is calibrated to make that
          resonance felt. We work with brands that refuse mediocrity.
        </p>

        <p
          className="font-sans font-extralight text-cream-dim leading-relaxed mb-8"
          style={{ fontSize: "0.85rem" }}
        >
          From initial concept to final delivery, we treat your vision as a
          visual language. Our process is rigorous. Our aesthetic is
          unmistakable. Our results speak.
        </p>

        <a
          href="#contact"
          className="font-sans font-extralight text-gold-dim uppercase tracking-widest2 underline underline-offset-4 decoration-gold-dim/40 transition-colors hover:text-gold mb-12 inline-block"
          style={{ fontSize: "0.6rem" }}
        >
          Work With Us
        </a>

        {/* Stats divider */}
        <hr className="gold-hr mb-8" />

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p
              className="font-display font-light text-gold leading-none mb-2"
              style={{ fontSize: "3.25rem" }}
            >
              48+
            </p>
            <p
              className="font-sans font-extralight text-cream-dim uppercase tracking-widest2"
              style={{ fontSize: "0.6rem" }}
            >
              Projects
            </p>
          </div>
          <div>
            <p
              className="font-display font-light text-gold leading-none mb-2"
              style={{ fontSize: "3.25rem" }}
            >
              6
            </p>
            <p
              className="font-sans font-extralight text-cream-dim uppercase tracking-widest2"
              style={{ fontSize: "0.6rem" }}
            >
              Countries
            </p>
          </div>
          <div>
            <p
              className="font-display font-light text-gold leading-none mb-2"
              style={{ fontSize: "3.25rem" }}
            >
              ∞
            </p>
            <p
              className="font-sans font-extralight text-cream-dim uppercase tracking-widest2"
              style={{ fontSize: "0.6rem" }}
            >
              Luxury Brands
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
