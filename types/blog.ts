export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  content: string
  readingTime: number
}

export interface BlogFrontmatter {
  title: string
  date: string
  excerpt: string
  tags: string[]
}