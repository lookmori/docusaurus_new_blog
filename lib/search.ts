import Fuse from 'fuse.js'
import { BlogPost } from '@/types/blog'

export function createSearchIndex(posts: BlogPost[]) {
  const options = {
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'excerpt', weight: 0.3 },
      { name: 'content', weight: 0.2 },
      { name: 'tags', weight: 0.5 },
    ],
    threshold: 0.3,
    includeScore: true,
  }

  return new Fuse(posts, options)
}

export function searchPosts(posts: BlogPost[], query: string) {
  if (!query.trim()) {
    return posts
  }

  const fuse = createSearchIndex(posts)
  const results = fuse.search(query)
  
  return results.map(result => result.item)
}