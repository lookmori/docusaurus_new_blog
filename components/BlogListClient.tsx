'use client'

import { BlogPost } from '@/types/blog'
import BlogCard from '@/components/BlogCard'
import BlogPagination from '@/components/BlogPagination'
import FadeInUp from '@/components/animations/FadeInUp'
import StaggerContainer from '@/components/animations/StaggerContainer'
import { usePagination } from '@/lib/pagination'
import { useMemo } from 'react'

interface BlogListClientProps {
  posts: BlogPost[]
}

export default function BlogListClient({ posts }: BlogListClientProps) {
  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage
  } = usePagination({
    totalItems: posts.length
  })

  // Get posts for current page
  const currentPosts = useMemo(() => {
    return posts.slice(startIndex, endIndex)
  }, [posts, startIndex, endIndex])

  return (
    <div className="max-w-6xl mx-auto">
      <FadeInUp>
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-6 gradient-text">所有文章</h1>
          <div className="flex items-center justify-center space-x-4 text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>共 {posts.length} 篇文章</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span>持续更新中</span>
          </div>
        </div>
      </FadeInUp>

      {posts.length > 0 ? (
        <>
          <StaggerContainer className="blog-grid">
            {currentPosts.map((post) => (
              <div key={post.slug} className="card-hover">
                <BlogCard post={post} />
              </div>
            ))}
          </StaggerContainer>
          
          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </>
      ) : (
        <FadeInUp>
          <div className="text-center py-16 glass-effect rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">还没有发布任何文章</h3>
            <p className="text-gray-500 dark:text-gray-400">
              在 <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">content/blog</code> 目录下添加 .mdx 文件开始写作吧！
            </p>
          </div>
        </FadeInUp>
      )}
    </div>
  )
}