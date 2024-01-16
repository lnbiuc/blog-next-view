import { defineStore } from 'pinia'
import type { PropType } from 'nuxt/dist/app/compat/capi'
import type { Article, ArticleWithContent } from '~/server/types/article'
import { getHomeArticle } from '~/server/api/article'

export const usePreloadCacheStore = defineStore('preloadCache', () => {
  const articleCache: Ref<Record<string, ArticleWithContent>> = ref({})
  const tagCache: Ref<Record<string>, string[]> = ref({})
  const categoryArticleCache: Ref<Record<string, { pageNumber: number, pageSize: number, total: number, data: Article[] }>> = ref({})

  function cacheArticle(data: ArticleWithContent): void {
    articleCache.value[data.shortLink] = data
  }

  function getArticleCache(shortLink: string): ArticleWithContent | undefined {
    if (articleCache.value[shortLink])
      return articleCache.value[shortLink]
  }

  function cacheTags(category: string, tags: string[]) {
    tagCache.value[category] = tags
  }

  function getTagsCache(category: string) {
    if (tagCache.value[category])
      return tagCache.value[category]
  }

  function cacheCategoryArticle(category: string, pageData: { pageNumber: number, pageSize: number, total: number, data: Article[] }) {
    categoryArticleCache.value[category] = pageData
  }

  function getCategoryArticleCache(category: string) {
    if (categoryArticleCache.value[category])
      return categoryArticleCache.value[category]
  }

  return { cacheArticle, getArticleCache, cacheTags, getTagsCache, cacheCategoryArticle, getCategoryArticleCache }
})
