import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost, BlogFrontmatter } from '@/types/blog'

const contentDirectory = path.join(process.cwd(), 'content')

export function getAllPosts(): BlogPost[] {
  const blogDir = path.join(contentDirectory, 'blog')
  
  if (!fs.existsSync(blogDir)) {
    return []
  }

  const fileNames = fs.readdirSync(blogDir)
  const allPostsData = fileNames
    .filter(name => name.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(blogDir, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      const frontmatter = data as BlogFrontmatter
      const readingTime = Math.ceil(content.split(' ').length / 200)

      return {
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        excerpt: frontmatter.excerpt,
        tags: frontmatter.tags || [],
        content,
        readingTime,
      }
    })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, 'blog', `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const frontmatter = data as BlogFrontmatter
    const readingTime = Math.ceil(content.split(' ').length / 200)

    return {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      excerpt: frontmatter.excerpt,
      tags: frontmatter.tags || [],
      content,
      readingTime,
    }
  } catch (error) {
    return null
  }
}

export function getAboutContent(): { content: string } | null {
  try {
    const fullPath = path.join(contentDirectory, 'about.mdx')
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { content } = matter(fileContents)
    
    return { content }
  } catch (error) {
    return null
  }
}