import { ArticleSchema } from '~/server/models/article.schema'

export default defineEventHandler(async (event) => {
  console.warn(`request: ${event.path}`)
  try {
    const body = await readBody(event)
    return await new ArticleSchema(body).save()
  }
  catch (error) {
    return error
  }
})
