import process from 'node:process'
import type { MDCParserResult } from '@nuxtjs/mdc/runtime/types/index'
import { ArticleSchema } from '~/server/models/article.schema'
import type { IArticle } from '~/server/types'
import { useMarkdownParser } from '~/composables/useMarkdownParser'
import { storage } from '~/config/unstorage.config'
import zlib from 'node:zlib'

export default defineEventHandler(async (event) => {
  const parse = useMarkdownParser()
  const shortLink = event.context.params?.shortLink as string

  const articleData: Partial<IArticle> = {
    _id: '',
    shortLink: '',
    title: '',
    description: '',
    cover: '',
    category: '',
    tags: [],
    content: '',
    authorId: '',
    status: '',
    views: 0,
    likes: 0,
    link: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    html: undefined,
  }

  try {
    if (!shortLink)
      return new Response('ShortLink Require', { status: 404 })

    const article = (await ArticleSchema.findOne({ shortLink })) as IArticle
    if (!article)
      return new Response('Article Not Found', { status: 404 })

    articleData._id = article._id
    articleData.shortLink = article.shortLink
    articleData.title = article.title
    articleData.description = article.description
    articleData.cover = article.cover
    articleData.category = article.category
    articleData.tags = article.tags
    articleData.authorId = article.authorId
    articleData.status = article.status
    articleData.views = article.views
    articleData.likes = article.likes
    articleData.link = article.link
    articleData.createdAt = article.createdAt
    articleData.updatedAt = article.updatedAt

    const { content } = article

    const result = await storage.getItem<MDCParserResult>(shortLink)
    if (result) {
      console.warn('= recover from cache:', shortLink)
      articleData.html = result as MDCParserResult
    }
    else {
      const start = performance.now()
      const html = await parse(content as string)
      const end = performance.now()
      const executionTime = Math.round(end - start)
      console.warn(`+ render html for [${shortLink}] takes [${executionTime}] ms`)
      await storage.setItem(shortLink, html)
      articleData.html = html as MDCParserResult
    }

    return articleData
  }
  catch (error) {
    return new Response(error as string, { status: 500 })
  }
})
