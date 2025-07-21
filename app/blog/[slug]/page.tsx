import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import CodeBlock from '@/components/CodeBlock'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// MDX Components
const components = {
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-medium mt-4 mb-2" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-1" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-1" {...props} />,
  li: (props: any) => <li className="ml-4" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600 dark:text-gray-400" {...props} />
  ),
  code: (props: any) => {
    // Check if this is a code block (has className with language) or inline code
    const isCodeBlock = props.className && props.className.includes('language-')
    
    if (isCodeBlock) {
      // Extract language from className (e.g., "language-javascript" -> "javascript")
      const language = props.className.replace('language-', '')
      return (
        <CodeBlock 
          language={language}
          className={props.className}
        >
          {props.children}
        </CodeBlock>
      )
    }
    
    // For inline code, use the CodeBlock component which will render as inline
    return <CodeBlock className={props.className}>{props.children}</CodeBlock>
  },
  pre: (props: any) => {
    // For pre elements, we need to extract the code content and pass it to CodeBlock
    const codeElement = props.children
    if (codeElement && codeElement.props) {
      const language = codeElement.props.className?.replace('language-', '') || ''
      return (
        <CodeBlock 
          language={language}
          className={codeElement.props.className}
        >
          {codeElement.props.children}
        </CodeBlock>
      )
    }
    
    // Fallback for pre without code children
    return (
      <CodeBlock>
        {props.children}
      </CodeBlock>
    )
  },
  a: (props: any) => (
    <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />
  ),
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link 
        href="/blog" 
        className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>返回博客列表</span>
      </Link>

      {/* Post Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.date).toLocaleDateString('zh-CN')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>{post.readingTime} 分钟阅读</span>
          </div>
        </div>

        {post.tags.length > 0 && (
          <div className="flex items-center space-x-2 mb-8">
            <Tag className="w-4 h-4 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Post Content */}
      <div className="prose-custom">
        <MDXRemote source={post.content} components={components} />
      </div>
    </article>
  )
}