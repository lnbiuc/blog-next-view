import { ArticleSchema } from '~/server/models/article.schema'

export default defineEventHandler(async () => {
  try {
    return await ArticleSchema.find({}, { content: 0 }).sort({ updatedAt: -1 })
  }
  catch (error) {
    return new Response(error as string, { status: 500 })
  }
})
