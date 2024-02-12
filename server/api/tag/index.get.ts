import { ArticleSchema } from '~/server/models/article.schema'

export default defineEventHandler(async (event) => {
  console.warn(`request: ${event.path}`)
  try {
    return await ArticleSchema.find({}, { tags: 1 })
  }
  catch (error) {
    return error
  }
})
