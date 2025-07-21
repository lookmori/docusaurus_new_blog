'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface FadeInUpProps {
  children: ReactNode
  delay?: number
  duration?: number
  distance?: number
  className?: string
}

export default function FadeInUp({
  children,
  delay = 0,
  duration = 0.8,
  distance = 50,
  className = ''
}: FadeInUpProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current

    gsap.set(element, {
      y: distance,
      opacity: 0
    })

    gsap.to(element, {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [delay, duration, distance])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}