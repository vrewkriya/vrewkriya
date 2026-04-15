'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '@/components/ui/SectionLabel'
import GemIllustration from '@/components/ui/GemIllustration'

gsap.registerPlugin(ScrollTrigger)

const portfolioData = [
  {
    id: 1,
    title: 'Aurelia Campaign',
    category: 'Campaigns',
    width: 440,
    height: 560,
    offsetY: 0,
    gradient: 'linear-gradient(135deg, #1a2240 0%, #0a1420 100%)',
  },
  {
    id: 2,
    title: 'Rasa Fine Shoot',
    category: 'Shoots',
    width: 280,
    height: 480,
    offsetY: 60,
    gradient: 'linear-gradient(135deg, #2a0e14 0%, #1a0809 100%)',
  },
  {
    id: 3,
    title: 'Digital Presence',
    category: 'Digital',
    width: 360,
    height: 440,
    offsetY: -40,
    gradient: 'linear-gradient(135deg, #0f2318 0%, #071410 100%)',
  },
  {
    id: 4,
    title: 'Heirloom Editorial',
    category: 'Shoots',
    width: 320,
    height: 540,
    offsetY: 80,
    gradient: 'linear-gradient(135deg, #1a1540 0%, #0d0825 100%)',
  },
  {
    id: 5,
    title: 'Maison Veth Brand',
    category: 'Campaigns',
    width: 260,
    height: 420,
    offsetY: 20,
    gradient: 'linear-gradient(135deg, #2a1a0a 0%, #1a0f05 100%)',
  },
]

const filterOptions = ['All', 'Shoots', 'Campaigns', 'Digital']

export default function Portfolio() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    const prefersReduced = globalThis.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<Element>('.reveal-port')
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
    })

    return () => ctx.revert()
  }, [])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 1.2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <section
      id="portfolio"
      className="py-36 px-8 md:px-16"
      style={{ background: 'var(--bg)' }}
    >
      {/* Header */}
      <div className="reveal-port flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
        {/* Left — Label + Title */}
        <div>
          <SectionLabel>Our Portfolio</SectionLabel>
          <h2 className="font-display font-light text-cream text-4xl md:text-5xl mt-5 leading-tight">
            Works that <span className="italic text-gold">Inspire</span>
          </h2>
        </div>

        {/* Right — Filter tabs */}
        <div className="flex items-center gap-4">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              className="font-sans font-extralight text-cream-dim uppercase tracking-widest2 transition-colors hover:text-cream pb-2"
              style={{
                fontSize: '0.6rem',
                borderBottom:
                  filter === 'All'
                    ? '1px solid var(--gold-dim)'
                    : '1px solid transparent',
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal scroll strip — drag to scroll interaction */}
      <section aria-label="Portfolio carousel - scroll to view projects" className="relative">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="scroll-strip flex gap-6 overflow-x-auto pb-6 cursor-grab active:cursor-grabbing"
        >
        {portfolioData.map((project) => (
          <div
            key={project.id}
            className="reveal-port group relative shrink-0 overflow-hidden"
            style={{
              width: project.width,
              height: project.height,
              marginTop: project.offsetY,
            }}
          >
            {/* Card background */}
            <div
              className="absolute inset-0"
              style={{ background: project.gradient }}
            />

            {/* Gem illustration centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <GemIllustration
                width={Math.min(project.width * 0.4, 120)}
                height={Math.min(project.height * 0.4, 120)}
              />
            </div>

            {/* Hover overlay — slides up from bottom */}
            <div
              className="absolute inset-0 bg-black/60 flex flex-col items-center justify-end p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
              style={{ backdropFilter: 'blur(4px)' }}
            >
              <h3 className="font-display font-light text-cream text-lg text-center leading-tight">
                {project.title}
              </h3>
              <p
                className="font-sans font-extralight text-gold-dim uppercase tracking-widest2 mt-2"
                style={{ fontSize: '0.5rem' }}
              >
                {project.category}
              </p>
            </div>
          </div>
        ))}
        </div>
      </section>
    </section>
  )
}
