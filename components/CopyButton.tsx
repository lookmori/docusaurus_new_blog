'use client'

import { useState, useCallback } from 'react'
import { Copy, Check, X } from 'lucide-react'
import { toast } from 'react-hot-toast'

type CopyState = 'idle' | 'copying' | 'success' | 'error'

interface CopyButtonProps {
  code: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

export default function CopyButton({ 
  code, 
  className = '', 
  size = 'md',
  position = 'top-right'
}: CopyButtonProps) {
  const [copyState, setCopyState] = useState<CopyState>('idle')

  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        return true
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        const success = document.execCommand('copy')
        document.body.removeChild(textArea)
        return success
      }
    } catch (error) {
      console.error('Copy failed:', error)
      return false
    }
  }, [])

  const handleCopy = useCallback(async () => {
    if (copyState === 'copying') return

    setCopyState('copying')
    
    const success = await copyToClipboard(code)
    
    if (success) {
      setCopyState('success')
      toast.success('代码已复制到剪贴板', {
        duration: 2000,
        position: 'bottom-right'
      })
      
      // Reset state after 2 seconds
      setTimeout(() => {
        setCopyState('idle')
      }, 2000)
    } else {
      setCopyState('error')
      toast.error('复制失败，请手动复制', {
        duration: 3000,
        position: 'bottom-right'
      })
      
      // Reset state after 3 seconds
      setTimeout(() => {
        setCopyState('idle')
      }, 3000)
    }
  }, [code, copyState, copyToClipboard])

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleCopy()
    }
  }, [handleCopy])

  const getIcon = () => {
    switch (copyState) {
      case 'copying':
        return <Copy className="animate-pulse" />
      case 'success':
        return <Check />
      case 'error':
        return <X />
      default:
        return <Copy />
    }
  }

  const getButtonText = () => {
    switch (copyState) {
      case 'copying':
        return '复制中...'
      case 'success':
        return '已复制'
      case 'error':
        return '复制失败'
      default:
        return '复制代码'
    }
  }

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  const positionClasses = {
    'top-right': 'top-2 right-2',
    'top-left': 'top-2 left-2',
    'bottom-right': 'bottom-2 right-2',
    'bottom-left': 'bottom-2 left-2'
  }

  return (
    <button
      onClick={handleCopy}
      onKeyDown={handleKeyDown}
      disabled={copyState === 'copying'}
      className={`
        copy-button absolute ${positionClasses[position]} p-2 rounded-md
        bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400
        hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
        opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 sm:opacity-100
        disabled:opacity-50 disabled:cursor-not-allowed
        ${copyState === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : ''}
        ${copyState === 'error' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : ''}
        ${className}
      `}
      aria-label={getButtonText()}
      aria-describedby="copy-status"
      title={getButtonText()}
      tabIndex={0}
    >
      <span className={`${sizeClasses[size]} flex items-center justify-center`}>
        {getIcon()}
      </span>
      
      {/* Screen Reader Status */}
      <span id="copy-status" className="sr-only">
        {getButtonText()}
      </span>
    </button>
  )
}