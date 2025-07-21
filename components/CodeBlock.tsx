'use client'

import { useRef, useEffect, useState } from 'react'
import CopyButton from './CopyButton'

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
  language?: string
  title?: string
  showLineNumbers?: boolean
}

export default function CodeBlock({ 
  children, 
  className = '', 
  language,
  title,
  showLineNumbers = false
}: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null)
  const [codeContent, setCodeContent] = useState('')

  // Extract plain text content from the code element
  useEffect(() => {
    if (codeRef.current) {
      const extractCodeContent = (element: HTMLElement): string => {
        // Clone the element to avoid modifying the original
        const clone = element.cloneNode(true) as HTMLElement
        
        // Remove line number elements if they exist
        clone.querySelectorAll('.line-number, .line-numbers-rows').forEach(el => el.remove())
        
        // Remove any other non-code elements
        clone.querySelectorAll('.token-line-number, .highlight-line').forEach(el => {
          // Keep the content but remove the wrapper
          const parent = el.parentNode
          if (parent) {
            while (el.firstChild) {
              parent.insertBefore(el.firstChild, el)
            }
            parent.removeChild(el)
          }
        })
        
        // Extract plain text while preserving formatting
        return clone.textContent || clone.innerText || ''
      }

      const content = extractCodeContent(codeRef.current)
      setCodeContent(content.trim())
    }
  }, [children])

  // Determine if this is an inline code or block code
  const isInlineCode = !className?.includes('language-') && !language

  if (isInlineCode) {
    // For inline code, render without copy button
    return (
      <code 
        ref={codeRef}
        className={`
          px-1.5 py-0.5 rounded-md text-sm font-mono
          bg-gray-100 dark:bg-gray-800 
          text-pink-600 dark:text-pink-400
          ${className}
        `}
      >
        {children}
      </code>
    )
  }

  // For block code, render with copy functionality
  return (
    <div className="code-block-container relative group">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {title}
          </span>
          {language && (
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
              {language}
            </span>
          )}
        </div>
      )}
      
      <div className="relative">
        <pre className={`
          overflow-x-auto p-4 rounded-lg ${title ? 'rounded-t-none' : ''}
          bg-gray-50 dark:bg-gray-900 
          border border-gray-200 dark:border-gray-700
          ${className}
        `}>
          <code 
            ref={codeRef}
            className={`
              block text-sm font-mono leading-relaxed
              text-gray-800 dark:text-gray-200
              ${language ? `language-${language}` : ''}
            `}
          >
            {children}
          </code>
        </pre>
        
        {codeContent && (
          <CopyButton 
            code={codeContent}
            position="top-right"
            size="md"
          />
        )}
      </div>
    </div>
  )
}