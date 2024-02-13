import { ArticleSchema } from '~/server/models/article.schema'

export default defineEventHandler(async (event) => {
  console.warn(`start request: ${event.path}`)
  const startTime = Date.now()
  try {
    const body = await readBody(event)

    const category = body.category
    const keyword = body.keyword
    console.warn(`category:${category}`)
    console.warn(`keyword:${keyword}`)

    // 确保category和keyword都有值
    if (category && keyword) {
      // 构造查询条件，同时满足category字段值为特定值，并且包含keyword的文章
      const query = {
        category,
        $text: { $search: keyword },
        content: 0,
      }

      // 执行查询
      const result = await ArticleSchema.find(query)
      const endTime = Date.now()
      const elapsedTime = endTime - startTime
      console.warn(`request: ${event.path} takes ${elapsedTime} ms`)
      return result
    }
    else {
      // 如果category或keyword为空，则返回空数组
      return []
    }
  }
  catch (error) {
    return error
  }
})
