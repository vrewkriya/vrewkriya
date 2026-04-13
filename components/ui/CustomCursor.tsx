'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const visible = useRef(false)
  const expanded = useRef(false)

  useEffect(() => {
    // Skip on touch devices
    if (globalThis.matchMedia('(pointer: coarse)').matches) return

    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      if (!visible.current) {
        visible.current = true
        cursor.style.opacity = '1'
        ring.style.opacity = '1'
      }
    }

    const onMouseDown = () => {
      cursor.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px) scale(0.8)`
    }

    const onMouseUp = () => {
      cursor.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px) scale(1)`
    }

    const onMouseEnterInteractive = () => {
      expanded.current = true
    }

    const onMouseLeaveInteractive = () => {
      expanded.current = false
    }

    // Animate ring with lag
    let rafId: number
    const animateRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15
      const size = expanded.current ? 56 : 36
      const offset = size / 2
      ring.style.width = `${size}px`
      ring.style.height = `${size}px`
      ring.style.transform = `translate(${ringPos.current.x - offset}px, ${ringPos.current.y - offset}px)`
      rafId = requestAnimationFrame(animateRing)
    }
    rafId = requestAnimationFrame(animateRing)

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    // Add hover listeners for interactive elements
    const interactiveSelectors = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
    const interactives = document.querySelectorAll(interactiveSelectors)
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive)
      el.addEventListener('mouseleave', onMouseLeaveInteractive)
    })

    // MutationObserver to handle dynamically added interactive elements
    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll(interactiveSelectors)
      els.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive)
        el.removeEventListener('mouseleave', onMouseLeaveInteractive)
        el.addEventListener('mouseenter', onMouseEnterInteractive)
        el.addEventListener('mouseleave', onMouseLeaveInteractive)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive)
        el.removeEventListener('mouseleave', onMouseLeaveInteractive)
      })
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-9999 rounded-full opacity-0"
        style={{
          width: 8,
          height: 8,
          backgroundColor: 'var(--gold)',
          transition: 'opacity 0.3s, transform 0.1s',
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed top-0 left-0 z-9998 rounded-full opacity-0"
        style={{
          width: 36,
          height: 36,
          border: '1px solid var(--gold)',
          transition: 'width 0.3s, height 0.3s, opacity 0.3s',
        }}
      />
    </>
  )
}
