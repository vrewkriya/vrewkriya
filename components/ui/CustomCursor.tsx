'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function CustomCursor() {
  const pathname = usePathname()

  useEffect(() => {
    const isStudio = pathname?.startsWith('/studio')

    // Skip on touch devices or if we're in the studio
    if (isStudio || globalThis.matchMedia('(pointer: coarse)').matches) {
      document.body.style.cursor = 'auto'
      return () => {
        // Only reset if we were in the studio and are leaving
        if (isStudio) document.body.style.cursor = ''
      }
    }

    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursorRing')
    if (!cursor || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      cursor.style.left = mx + 'px'
      cursor.style.top = my + 'px'
    }

    const animateRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      rafId = requestAnimationFrame(animateRing)
    }
    rafId = requestAnimationFrame(animateRing)

    document.addEventListener('mousemove', onMouseMove)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element
      const interactiveEl = target.closest('a, button, .portfolio-item, .service-card, .client-logo, input, textarea, select')
      if (interactiveEl) {
        ring.classList.add('hovered')
        cursor.classList.add('hovered')
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as Element
      const interactiveEl = target.closest('a, button, .portfolio-item, .service-card, .client-logo, input, textarea, select')
      if (interactiveEl) {
        ring.classList.remove('hovered')
        cursor.classList.remove('hovered')
      }
    }

    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [pathname])

  if (pathname?.startsWith('/studio')) return null

  return (
    <>
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />
    </>
  )
}
