import { defineStore } from 'pinia'
import type { Article, ArticleWithContent } from '~/server/types/article'
import { getArticleByShortLink, getHomeArticle } from '~/server/api/article'

export const useArticleApiStore = defineStore('articleApi', () => {
  const indexDataRef = ref({
    featuredArticles: [] as Article[],
    featuredShort: [] as Article[],
    featuredProject: [] as Article[],
  })

  const hasIndexData = computed(() => {
    return indexDataRef.value.featuredArticles.length > 0 && indexDataRef.value.featuredShort.length > 0 && indexDataRef.value.featuredProject.length > 0
  })

  const indexData = computed(() => {
    return indexDataRef.value
  })

  function setIndexData(data: typeof indexDataRef.value) {
    indexDataRef.value = data
  }

  function getIndexData() {
    if (hasIndexData.value) {
      return indexData.value
    }
    else {
      getHomeArticle().then((res) => {
        indexDataRef.value = res.data.value?.data as typeof indexDataRef.value
        setIndexData(indexDataRef.value)
      })
    }
  }

  return { indexData, hasIndexData, getIndexData }
})

export const useIndexArticleApiStore = defineStore('indexArticleApi', {
  state: () => ({
    indexData: {
      featuredArticles: [] as Article[],
      featuredShort: [] as Article[],
      featuredProject: [] as Article[],
    },
  }),
  getters: {
    hasIndexData(): boolean {
      return this.indexData.featuredArticles.length > 0 && this.indexData.featuredShort.length > 0 && this.indexData.featuredProject.length > 0
    },
  },
  actions: {
    setIndexData(data: typeof this.indexData) {
      this.indexData = data
    },
  },
})

export const usePreloadCacheStore = defineStore('preloadCache', () => {
  const articleCache: Ref<Record<string, ArticleWithContent>> = ref({})
  // const tagCache: Ref<Record<string>, string[]> = ref({})

  function cacheArticle(data: ArticleWithContent): void {
    articleCache.value[data.shortLink] = data
  }

  function getArticleCache(shortLink: string): ArticleWithContent | undefined {
    if (articleCache.value[shortLink])
      return articleCache.value[shortLink]
  }

  // function cacheTags(category: string, tags: string[]) {
  //   tagCache.value[category] = tags
  // }

  // function getTagsCache(category: string) {

  // }

  return { cacheArticle, getArticleCache }
})
