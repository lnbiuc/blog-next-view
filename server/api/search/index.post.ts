import { ArticleSchema } from '~/server/models/article.schema'

export default defineEventHandler(async (event) => {
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
        status: 'PUBLISHED',
        $text: { $search: keyword },
      }

      // 执行查询
      return await ArticleSchema.find(query, { content: 0 })
    }
    else {
      // 如果category或keyword为空，则返回空数组
      return []
    }
  }
  catch (error) {
    return new Response(error as string, { status: 500 })
  }
})
