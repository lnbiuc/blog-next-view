import zlib from 'node:zlib'
import { ArticleSchema } from '~/server/models/article.schema'
import { storage } from '~/config/unstorage.config'

export default defineEventHandler(async (event) => {
  try {
    const shortLink = event.context.params?.shortLink
    let json
    if (shortLink) {
      const result = await storage.getItem(shortLink)
      if (result) {
        console.warn('= recover from cache:', shortLink)
        json = result
      }
      else {
        const queryres = (await ArticleSchema.findOne(
          { shortLink },
          { content: 1 },
        )) as { _id: string, content: string }

        if (!queryres)
          return new Response('404 Not Found', { status: 404 })

        const { content } = queryres

        const start = performance.now()
        const html = await parseMarkdown(content)
        const end = performance.now()
        const executionTime = Math.round(end - start)
        console.warn(`+ render html for [${shortLink}] takes [${executionTime}] ms`)
        storage.setItem(shortLink, html)
        json = html
      }

      const jsonData = JSON.stringify(json)
      const compressedData = zlib.gzipSync(jsonData)
      const headers = new Headers()
      headers.set('Content-Encoding', 'gzip')
      headers.set('Content-Length', compressedData.length.toString())
      return new Response(compressedData, {
        headers,
      })
    }
  }
  catch (error) {
    return new Response(error as string, { status: 500 })
  }
})
