import { defineStore } from 'pinia'
import type { Friend } from '~/server/types/friend'
import type { Article, ArticleWithContent } from '~/server/types/article'

export const usePreloadCacheStore = defineStore('preloadCache', () => {
  const articleCache: Ref<Record<string, ArticleWithContent>> = ref({})
  const tagCache: Ref<Record<string>, string[]> = ref({})
  const categoryArticleCache: Ref<Record<string, { pageNumber: number, pageSize: number, total: number, data: Article[] }>> = ref({})
  const friendCache: Ref<Friend[]> = ref([])

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

  function cacheFriend(data: Friend[]) {
    friendCache.value = data
  }

  function getFriendCache(): Friend[] {
    return friendCache.value
  }

  return { cacheArticle, getArticleCache, cacheTags, getTagsCache, cacheCategoryArticle, getCategoryArticleCache, cacheFriend, getFriendCache }
})
