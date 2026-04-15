'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const clients = ['Aurelia', 'Rasa Fine', 'Nīlam Co.', 'Heirloom', 'Maison Veth']

export default function Clients() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const prefersReduced = globalThis.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<Element>('.reveal-client')
      items.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.3, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
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
      id="clients"
      ref={sectionRef}
      className="py-24 px-8 md:px-16"
      style={{ background: 'var(--bg-3)' }}
    >
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
        {clients.map((client) => (
          <button
            key={client}
            type="button"
            className="reveal-client font-display font-light uppercase transition-all duration-300 bg-transparent border-none cursor-pointer"
            style={{
              fontSize: '1.1rem',
              letterSpacing: '0.3em',
              color: 'var(--gold-dim)',
              opacity: 0.6,
              textDecoration: 'none',
              padding: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--gold)'
              e.currentTarget.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--gold-dim)'
              e.currentTarget.style.opacity = '0.6'
            }}
          >
            {client}
          </button>
        ))}
      </div>
    </section>
  )
}
