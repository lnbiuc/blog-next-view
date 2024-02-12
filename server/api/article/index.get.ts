import { ArticleSchema } from '~/server/models/article.schema'

export default defineEventHandler(async () => {
  try {
    return await ArticleSchema.find({})
  }
  catch (error) {
    return error
  }
})
