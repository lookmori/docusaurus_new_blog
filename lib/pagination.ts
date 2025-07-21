import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

export const POSTS_PER_PAGE = 6

// Pagination calculation utilities
export const calculatePagination = (totalPosts: number, currentPage: number) => {
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  
  return {
    totalPages,
    startIndex,
    endIndex,
    hasNext: currentPage < totalPages,
    hasPrevious: currentPage > 1
  }
}

// Validate page parameter
export const validatePageNumber = (page: string | null, totalPages: number): number => {
  if (!page) return 1
  
  const pageNum = parseInt(page, 10)
  
  // Return 1 if page is not a valid number
  if (isNaN(pageNum) || pageNum < 1) return 1
  
  // Return totalPages if page exceeds total pages
  if (pageNum > totalPages) return Math.max(1, totalPages)
  
  return pageNum
}

// Custom hook for pagination
interface UsePaginationProps {
  totalItems: number
  itemsPerPage?: number
}

interface UsePaginationReturn {
  currentPage: number
  totalPages: number
  startIndex: number
  endIndex: number
  goToPage: (page: number) => void
  goToNext: () => void
  goToPrevious: () => void
  hasNext: boolean
  hasPrevious: boolean
}

export const usePagination = ({ 
  totalItems, 
  itemsPerPage = POSTS_PER_PAGE 
}: UsePaginationProps): UsePaginationReturn => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  // Get current page from URL parameters
  const currentPage = useMemo(() => {
    const pageParam = searchParams.get('page')
    return validatePageNumber(pageParam, totalPages)
  }, [searchParams, totalPages])
  
  // Calculate pagination values
  const paginationData = useMemo(() => {
    return calculatePagination(totalItems, currentPage)
  }, [totalItems, currentPage])
  
  // Navigation functions
  const goToPage = useCallback((page: number) => {
    const validPage = validatePageNumber(page.toString(), totalPages)
    
    if (validPage === 1) {
      // Remove page parameter for page 1 to keep URL clean
      router.push('/blog')
    } else {
      router.push(`/blog?page=${validPage}`)
    }
  }, [router, totalPages])
  
  const goToNext = useCallback(() => {
    if (paginationData.hasNext) {
      goToPage(currentPage + 1)
    }
  }, [currentPage, paginationData.hasNext, goToPage])
  
  const goToPrevious = useCallback(() => {
    if (paginationData.hasPrevious) {
      goToPage(currentPage - 1)
    }
  }, [currentPage, paginationData.hasPrevious, goToPage])
  
  return {
    currentPage,
    totalPages: paginationData.totalPages,
    startIndex: paginationData.startIndex,
    endIndex: paginationData.endIndex,
    goToPage,
    goToNext,
    goToPrevious,
    hasNext: paginationData.hasNext,
    hasPrevious: paginationData.hasPrevious
  }
}