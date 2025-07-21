'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ThemeToggle from './ThemeToggle'
import SearchBar from './SearchBar'

export default function Header() {
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)

  const navigation = [
    { name: '首页', href: '/' },
    { name: '博客', href: '/blog' },
    { name: '关于', href: '/about' },
  ]

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [])

  return (
    <header 
      ref={headerRef}
      className="sticky top-0 z-50 glass-effect border-b border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="group">
            <span className="text-2xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300 inline-block">
              我的博客
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  pathname === item.href
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Search and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <SearchBar />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}