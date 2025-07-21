'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  text?: string
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'text-blue-600',
  text = '加载中...' 
}: LoadingSpinnerProps) {
  const spinnerRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  useEffect(() => {
    if (spinnerRef.current) {
      gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: 'none'
      })
    }

    if (dotsRef.current) {
      const dots = dotsRef.current.children
      gsap.to(dots, {
        opacity: 0.3,
        duration: 0.6,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      })
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* SVG Spinner */}
      <div ref={spinnerRef} className={`${sizeClasses[size]} ${color}`}>
        <svg
          className="w-full h-full"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="31.416"
            strokeDashoffset="31.416"
            className="opacity-25"
          />
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="31.416"
            strokeDashoffset="23.562"
            className="opacity-75"
          />
        </svg>
      </div>

      {/* Loading Text with Animated Dots */}
      {text && (
        <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
          <span>{text}</span>
          <div ref={dotsRef} className="flex space-x-1">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
      )}
    </div>
  )
}