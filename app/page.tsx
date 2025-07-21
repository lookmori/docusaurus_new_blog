import { getAllPosts } from '@/lib/mdx'
import BlogCard from '@/components/BlogCard'
import Link from 'next/link'
import FadeInUp from '@/components/animations/FadeInUp'
import StaggerContainer from '@/components/animations/StaggerContainer'

export default function Home() {
  const posts = getAllPosts().slice(0, 6) // 显示最新6篇文章

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <FadeInUp>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 gradient-text leading-tight">
            欢迎来到我的博客
          </h1>
        </FadeInUp>
        
        <FadeInUp delay={0.2}>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            分享技术见解、学习心得和生活感悟
          </p>
        </FadeInUp>
        
        <FadeInUp delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/blog" 
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>浏览文章</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link 
              href="/about" 
              className="group glass-effect border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              关于我
            </Link>
          </div>
        </FadeInUp>
      </section>

      {/* Latest Posts */}
      <section>
        <FadeInUp>
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
              最新文章
            </h2>
            <Link 
              href="/blog" 
              className="group text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              <span className="flex items-center space-x-2">
                <span>查看全部</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
        </FadeInUp>
        
        {posts.length > 0 ? (
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.slug} className="card-hover">
                <BlogCard post={post} />
              </div>
            ))}
          </StaggerContainer>
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
      </section>
    </div>
  )
}