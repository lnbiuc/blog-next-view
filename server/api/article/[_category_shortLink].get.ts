import { ArticleSchema } from '~/server/models/article.schema'

export default defineEventHandler(async (event) => {
  try {
    const shortLink = event.context.params?.shortLink
    const category = event.context.params?.category
    console.warn(`shortLink:${shortLink}, category:${category}`)
    return await ArticleSchema.findOne({ shortLink, category })
  }
  catch (error) {
    return error
  }
})
