import { ArticleSchema } from '~/server/models/article.schema'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  console.warn(`start request: ${event.path}`)
  const startTime = Date.now()
  try {
    const result = await ArticleSchema.findOneAndUpdate(
      { _id: id },
      { $inc: { views: 1 } },
      { new: true },
    )

    if (!result)
      throw new Error('article not found')

    const endTime = Date.now()
    const elapsedTime = endTime - startTime
    console.warn(`request: ${event.path} takes ${elapsedTime} ms`)
    return { success: true }
  }
  catch (error) {
    return error
  }
})
