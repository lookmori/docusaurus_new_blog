import { getAllPosts } from '@/lib/mdx'
import BlogListClient from '@/components/BlogListClient'

export default function BlogPage() {
  const allPosts = getAllPosts()

  return <BlogListClient posts={allPosts} />
}