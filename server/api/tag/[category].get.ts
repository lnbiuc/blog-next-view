import { ArticleSchema } from '~/server/models/article.schema'

export default defineEventHandler(async (event) => {
  console.warn(`start request: ${event.path}`)
  const startTime = Date.now()
  try {
    const category = event.context.params?.category

    // 查询指定分类下的文章，并仅返回tags字段
    const articles = await ArticleSchema.find({ category }, { tags: 1 })

    // 从查询结果中获取所有文章的tags，并将它们扁平化为一个数组
    const allTags = articles.map(article => article.tags).flat()

    // 使用Set对象去重
    const uniqueTags = Array.from(new Set(allTags))
    const endTime = Date.now()
    const elapsedTime = endTime - startTime
    console.warn(`request: ${event.path} takes ${elapsedTime} ms`)
    return uniqueTags
  }
  catch (error) {
    return error
  }
})
