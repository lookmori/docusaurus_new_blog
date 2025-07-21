import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export default function BlogPagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className = '' 
}: BlogPaginationProps) {
  const hasPrevious = currentPage > 1
  const hasNext = currentPage < totalPages

  const handlePrevious = () => {
    if (hasPrevious) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (hasNext) {
      onPageChange(currentPage + 1)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) {
    return null
  }

  return (
    <nav 
      className={`pagination-container ${className}`}
      aria-label="博客文章分页导航"
    >
      <div className="flex items-center gap-4">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          onKeyDown={(e) => handleKeyDown(e, handlePrevious)}
          disabled={!hasPrevious}
          className="pagination-button flex items-center gap-2"
          aria-label="上一页"
          tabIndex={0}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">上一页</span>
        </button>

        {/* Page Indicator */}
        <div className="pagination-current">
          <span className="text-sm font-medium">
            第 {currentPage} 页，共 {totalPages} 页
          </span>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          onKeyDown={(e) => handleKeyDown(e, handleNext)}
          disabled={!hasNext}
          className="pagination-button flex items-center gap-2"
          aria-label="下一页"
          tabIndex={0}
        >
          <span className="hidden sm:inline">下一页</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Screen Reader Information */}
      <div className="sr-only" aria-live="polite">
        当前显示第 {currentPage} 页，共 {totalPages} 页
      </div>
    </nav>
  )
}