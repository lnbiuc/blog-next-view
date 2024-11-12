import { orama } from '~/config/orama.config'
import type { IArticle } from '~/server/types'

export default defineEventHandler(async (event) => {
  try {
    // const { keyword, category } = getQuery(event);

    const body = await readBody(event)

    const category = body.category
    const keyword = body.keyword

    if (keyword && category) {
      const results = await orama.search({
        term: keyword as string,
        limit: 10,
      })

      if (results) {
        const ids: string[] = []
        const articles: IArticle[] = []
        const hits = results.hits
        hits.forEach((hit) => {
          const doc = hit.document as IArticle
          if (doc.category === category)
            ids.push(hit.document._id as string)
          articles.push(hit.document)
        })

        // const articles = await ArticleSchema.find({ _id: { $in: ids } })
        //   .select('-content -html')
        //   .lean()
        return articles
      }
      return []
    }
    else {
      return []
    }
  }
  catch (error) {
    return new Response(error as string, { status: 500 })
  }
})
