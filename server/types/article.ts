import type { Author } from './author'

export interface Article {
  id: number
  shortLink: string
  title: string
  description: string
  cover: string[]
  stack: string[]
  category: string
  tags: string[]
  content: string
  author: Author
  createdAt: string
  updatedAt: string
  views: number
  likes: number
}

export interface ArticleWithContent {
  id: number
  shortLink: string
  title: string
  description: string
  cover: string[]
  category: string
  stack: any
  tags: string[]
  content: string
  author: Author
  createdAt: string
  updatedAt: string
  views: number
  likes: number
}

export interface ArticlePublishDto {
  shortLink: string
  title: string
  description?: string
  cover?: string[]
  stack?: string[]
  category: string
  content: string
  status: string
  tags?: string[]
}

export interface ArticleViews {
  shortLink: string
  views: number
}
