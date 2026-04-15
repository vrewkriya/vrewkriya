'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    id: 1,
    quote:
      'Vrew Kriya transformed how we present our jewels. Every frame tells a story. Every light makes our pieces feel precious.',
    author: 'Priya Mehta',
    role: 'Founder, Aurelia',
    avatarColor: 'var(--gold)',
    initial: 'P',
  },
  {
    id: 2,
    quote:
      'They understand luxury at a deep level. Not just beautiful images — strategic visuals that convert admirers into collectors.',
    author: 'James Chen',
    role: 'Creative Director, Rasa Fine',
    avatarColor: '#8fa8c8',
    initial: 'J',
  },
  {
    id: 3,
    quote:
      'Working with this team elevated our brand perception. They don\'t just document jewels—they make them unforgettable.',
    author: 'Sofia Rossi',
    role: 'CMO, Heirloom',
    avatarColor: '#a87c85',
    initial: 'S',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const prefersReduced = globalThis.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<Element>('.reveal-testi')
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-36 px-8 md:px-16"
      style={{ background: 'var(--bg-2)' }}
    >
      {/* Header */}
      <div className="reveal-testi mb-12">
        <SectionLabel>Social Proof</SectionLabel>
        <h2 className="font-display font-light text-cream text-4xl md:text-5xl mt-5 leading-tight max-w-xl">
          Trusted by <span className="italic text-gold">Luxury Brands</span>
        </h2>
      </div>

      {/* 3-col testimonial grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-gold-dim/10">
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.id}
            className="reveal-testi relative bg-bg-3 p-10 md:p-12 flex flex-col justify-between"
          >
            {/* Decorative quote mark */}
            <span
              className="font-display text-gold-dim leading-none absolute top-6 right-6"
              style={{
                fontSize: '5.625rem',
                opacity: 0.08,
              }}
            >
              "
            </span>

            {/* Quote text */}
            <blockquote className="relative z-10 mb-10">
              <p
                className="font-display font-light italic text-cream leading-relaxed"
                style={{ fontSize: '1.15rem' }}
              >
                {testimonial.quote}
              </p>
            </blockquote>

            {/* Author row */}
            <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-gold-dim/20">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: testimonial.avatarColor }}
              >
                <span
                  className="font-display font-light text-bg text-sm"
                  style={{ fontSize: '0.85rem' }}
                >
                  {testimonial.initial}
                </span>
              </div>
              <div>
                <p className="font-sans font-normal text-cream text-sm leading-tight">
                  {testimonial.author}
                </p>
                <p
                  className="font-sans font-extralight text-cream-dim text-xs leading-tight"
                  style={{ fontSize: '0.65rem' }}
                >
                  {testimonial.role}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
