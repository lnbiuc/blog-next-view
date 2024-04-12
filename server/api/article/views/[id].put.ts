import process from 'node:process'
import { ArticleSchema } from '~/server/models/article.schema'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  if (process.env.NODE_ENV !== 'production')
    return new Response('not in production', { status: 200 })

  try {
    const result = await ArticleSchema.findOneAndUpdate(
      { _id: id },
      { $inc: { views: 1 } },
      { new: true },
    )

    if (!result)
      throw new Error('article not found')

    return { success: true }
  }
  catch (error) {
    return new Response(error as string, { status: 500 })
  }
})
