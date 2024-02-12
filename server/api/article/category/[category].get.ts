import { ArticleSchema } from '~/server/models/article.schema'

export default defineEventHandler(async (event) => {
  console.warn(`request: ${event.path}`)
  try {
    const category = event.context.params?.category
    console.warn(`category:${category}`)
    return await ArticleSchema.find({ category }, { })
  }
  catch (error) {
    return error
  }
})
