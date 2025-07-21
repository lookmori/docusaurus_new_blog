'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface StaggerContainerProps {
  children: ReactNode
  stagger?: number
  duration?: number
  className?: string
}

export default function StaggerContainer({
  children,
  stagger = 0.1,
  duration = 0.6,
  className = ''
}: StaggerContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const items = container.children

    gsap.set(items, {
      y: 30,
      opacity: 0
    })

    gsap.to(items, {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [stagger, duration])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}