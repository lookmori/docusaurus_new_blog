import Link from 'next/link'
import { BlogPost } from '@/types/blog'
import { Calendar, Clock, Tag } from 'lucide-react'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 overflow-hidden">
      {/* Gradient Top Border */}
      <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="p-6 flex flex-col flex-1">
        <Link href={`/blog/${post.slug}`} className="block mb-4">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed text-sm flex-1">
          {post.excerpt}
        </p>

        <div className="mt-auto space-y-3">
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(post.date).toLocaleDateString('zh-CN')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{post.readingTime} 分钟</span>
            </div>
          </div>

          {post.tags.length > 0 && (
            <div className="flex items-start gap-2">
              <Tag className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md border border-blue-100 dark:border-blue-800"
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}