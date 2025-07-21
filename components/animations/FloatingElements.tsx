'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const elements = containerRef.current.children

    Array.from(elements).forEach((element, index) => {
      gsap.to(element, {
        y: -20,
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        delay: index * 0.2
      })

      gsap.to(element, {
        rotation: 360,
        duration: 20 + index * 5,
        repeat: -1,
        ease: 'none'
      })
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10"
    >
      {/* Floating SVG Elements */}
      <div className="absolute top-20 left-10 w-8 h-8 text-blue-200 dark:text-blue-800 opacity-30">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
        </svg>
      </div>
      
      <div className="absolute top-40 right-20 w-6 h-6 text-purple-200 dark:text-purple-800 opacity-20">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>
      
      <div className="absolute bottom-40 left-20 w-10 h-10 text-green-200 dark:text-green-800 opacity-25">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 22,20 2,20" />
        </svg>
      </div>
      
      <div className="absolute bottom-20 right-10 w-7 h-7 text-pink-200 dark:text-pink-800 opacity-30">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z" />
        </svg>
      </div>
      
      <div className="absolute top-60 left-1/2 w-5 h-5 text-yellow-200 dark:text-yellow-800 opacity-20">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
      </div>
    </div>
  )
}