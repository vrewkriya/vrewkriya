'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GemIllustration from '@/components/ui/GemIllustration'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const prefersReduced = globalThis.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Staggered entrance animation
      gsap.fromTo(
        '.hero-animate',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.15,
        }
      )

      // Gem parallax on scroll
      gsap.to('.hero-gem', {
        yPercent: 25,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href)
    target?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 70% at 50% 55%, #1a1228 0%, var(--bg) 70%)',
      }}
    >
      {/* Gem — positioned behind text */}
      <div className="hero-gem absolute inset-0 flex items-center justify-center pointer-events-none">
        <GemIllustration
          width={520}
          height={520}
          className="animate-float opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Eyebrow */}
        <div className="hero-animate flex items-center gap-3 mb-8">
          <span
            className="block w-8 h-px opacity-50"
            style={{ background: 'var(--gold-dim)' }}
          />
          <span
            className="font-sans font-light text-gold-dim uppercase tracking-widest3"
            style={{ fontSize: '0.6rem' }}
          >
            Est. 2024 · Mumbai
          </span>
          <span
            className="block w-8 h-px opacity-50"
            style={{ background: 'var(--gold-dim)' }}
          />
        </div>

        {/* Headline */}
        <h1 className="hero-animate font-display font-light leading-none mb-6">
          <span className="block text-cream text-6xl md:text-8xl lg:text-[108px]">
            Where Jewelry
          </span>
          <span className="block text-gold italic text-6xl md:text-8xl lg:text-[108px]">
            Meets Light
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="hero-animate font-sans font-extralight text-cream-dim max-w-sm mb-10 leading-relaxed"
          style={{ fontSize: '0.78rem' }}
        >
          A luxury visual studio crafting campaigns, shoots, and digital
          presence for jewelry brands that deserve to be felt.
        </p>

        {/* Buttons */}
        <div className="hero-animate flex items-center gap-6">
          <button
            onClick={() => scrollToSection('#contact')}
            className="bg-gold text-bg font-sans font-normal uppercase tracking-widest2 px-7 py-3 transition-all hover:bg-gold-dim"
            style={{ fontSize: '0.6rem' }}
          >
            Book a Consultation
          </button>
          <button
            onClick={() => scrollToSection('#portfolio')}
            className="font-sans font-extralight text-cream-dim uppercase tracking-widest2 underline underline-offset-4 decoration-gold-dim/40 transition-colors hover:text-cream"
            style={{ fontSize: '0.6rem' }}
          >
            View Our Work
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-animate absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="block w-px h-10" style={{ background: 'var(--gold-dim)', opacity: 0.4 }} />
        <span
          className="font-sans font-extralight text-gold-dim uppercase tracking-widest3"
          style={{ fontSize: '0.5rem' }}
        >
          Scroll
        </span>
      </div>
    </section>
  )
}
