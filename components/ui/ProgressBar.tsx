'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'

export default function ProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 200,
      minimum: 0.08,
    })

    const handleStart = () => {
      NProgress.start()
    }

    const handleComplete = () => {
      NProgress.done()
    }

    // 监听路由变化
    handleStart()
    
    const timer = setTimeout(() => {
      handleComplete()
    }, 100)

    return () => {
      clearTimeout(timer)
      handleComplete()
    }
  }, [pathname, searchParams])

  return null
}