import { ArticleSchema } from '~/server/models/article.schema'
import { storage } from '~/config/unstorage.config'


export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    if (!body._id || body._id === '')
      return { error: 'missing _id' }
    await storage.removeItem(body.shortLink)
    return await ArticleSchema.findByIdAndUpdate(body._id, body, { new: true })
  }
  catch (error) {
    return new Response(error as string, { status: 500 })
  }
})
