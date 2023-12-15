import { defineStore } from 'pinia'
import type { Article } from '~/server/types/article'

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

  return { indexData, hasIndexData, setIndexData }
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
