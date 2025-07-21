'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { BlogPost } from '@/types/blog'
import { searchPosts } from '@/lib/search'
import BlogCard from '@/components/BlogCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import FadeInUp from '@/components/animations/FadeInUp'
import StaggerContainer from '@/components/animations/StaggerContainer'
import { Search, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

interface SearchClientProps {
  posts: BlogPost[]
}

export default function SearchClient({ posts }: SearchClientProps) {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const searchResults = searchPosts(posts, query)
        setResults(searchResults)
        
        if (searchResults.length === 0) {
          toast.error('没有找到相关文章，试试其他关键词吧')
        }
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
        toast.error('搜索出错了，请稍后重试')
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(performSearch, 300)
    return () => clearTimeout(debounceTimer)
  }, [query, posts])

  return (
    <div className="max-w-6xl mx-auto">
      <FadeInUp>
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-6 gradient-text">搜索文章</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            在知识的海洋中寻找你想要的内容
          </p>
          
          {/* Enhanced Search Input */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20"></div>
            <div className="relative">
              <input
                type="text"
                placeholder="输入关键词搜索..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 text-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-lg"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </FadeInUp>

      {/* Search Results */}
      <div>
        {isLoading ? (
          <FadeInUp>
            <div className="text-center py-16">
              <LoadingSpinner size="lg" text="搜索中" />
            </div>
          </FadeInUp>
        ) : query.trim() ? (
          <>
            <FadeInUp>
              <div className="mb-8 p-4 glass-effect rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-600 dark:text-gray-400">
                      找到 <span className="font-semibold text-blue-600 dark:text-blue-400">{results.length}</span> 篇相关文章
                    </span>
                  </div>
                  {query && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">关键词:</span>
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-100 dark:border-blue-800">
                        "{query}"
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </FadeInUp>
            
            {results.length > 0 ? (
              <StaggerContainer className="blog-grid">
                {results.map((post) => (
                  <div key={post.slug} className="card-hover">
                    <BlogCard post={post} />
                  </div>
                ))}
              </StaggerContainer>
            ) : (
              <FadeInUp>
                <div className="text-center py-16 glass-effect rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">没有找到相关文章</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    尝试使用其他关键词搜索，或者浏览所有文章
                  </p>
                  <button
                    onClick={() => setQuery('')}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    清空搜索
                  </button>
                </div>
              </FadeInUp>
            )}
          </>
        ) : (
          <FadeInUp>
            <div className="text-center py-16 glass-effect rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">开始你的搜索之旅</h3>
              <p className="text-gray-500 dark:text-gray-400">
                输入关键词，发现有趣的内容
              </p>
            </div>
          </FadeInUp>
        )}
      </div>
    </div>
  )
}