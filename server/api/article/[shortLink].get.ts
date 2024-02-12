import { ArticleSchema } from '~/server/models/article.schema'

export default defineEventHandler(async (event) => {
  console.warn(`request: ${event.path}`)
  try {
    const shortLink = event.context.params?.shortLink
    console.warn(`shortLink:${shortLink}`)
    return await ArticleSchema.findOne({ shortLink })
  }
  catch (error) {
    return error
  }
})
