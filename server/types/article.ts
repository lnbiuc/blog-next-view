import type { Author } from './author'

export interface Article {
  id: number
  shortLink: string
  title: string
  description: string
  cover: string
  category: string
  tags: string[]
  content: string
  author: Author
  createdAt: string
  updatedAt: string
  views: number
  likes: number
}
