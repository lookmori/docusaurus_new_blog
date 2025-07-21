import { getAllPosts } from '@/lib/mdx'
import SearchClient from '@/components/SearchClient'

export default function SearchPage() {
  const allPosts = getAllPosts()

  return <SearchClient posts={allPosts} />
}