'use client'

import { useState } from 'react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    target?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50"
      style={{
        background:
          'linear-gradient(to bottom, rgba(10,10,13,0.95), transparent)',
      }}
    >
      <div className="flex items-center justify-between px-8 py-5 md:px-16">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => scrollTo(e, '#hero')}
          className="font-display font-light text-cream tracking-widest3 text-sm"
        >
          VREW KRIYA
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="font-sans font-extralight text-cream-dim uppercase tracking-widest2 transition-colors hover:text-cream"
              style={{ fontSize: '0.7rem' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => scrollTo(e, '#contact')}
          className="hidden md:inline-block border border-gold-dim text-gold font-sans font-normal uppercase tracking-widest2 px-5 py-2 transition-all hover:bg-gold hover:text-bg"
          style={{ fontSize: '0.6rem' }}
        >
          Book a Shoot
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 items-end"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className="block h-px bg-cream transition-all duration-300"
            style={{
              width: 24,
              transform: mobileOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
            }}
          />
          <span
            className="block h-px bg-cream transition-all duration-300"
            style={{
              width: 16,
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-px bg-cream transition-all duration-300"
            style={{
              width: mobileOpen ? 24 : 20,
              transform: mobileOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden flex flex-col items-center gap-8 py-12"
          style={{ background: 'rgba(10,10,13,0.98)' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="font-sans font-extralight text-cream-dim uppercase tracking-widest2 text-sm transition-colors hover:text-cream"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, '#contact')}
            className="border border-gold-dim text-gold font-sans uppercase tracking-widest2 px-6 py-2.5 text-xs transition-all hover:bg-gold hover:text-bg"
          >
            Book a Shoot
          </a>
        </div>
      )}
    </nav>
  )
}
