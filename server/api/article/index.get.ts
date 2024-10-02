import { ArticleSchema } from '~/server/models/article.schema'

export default defineEventHandler(async () => {
  try {
    const article = await ArticleSchema.find({ status: 'PUBLISHED' }, { content: 0 }).sort({ updatedAt: -1 })
    if (article)
      return article
    else
      return { title: '404 Not Found' }
  }
  catch (error) {
    return new Response(error as string, { status: 500 })
  }
})
