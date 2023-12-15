import { defineStore } from 'pinia'

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
    hasIndexData() {
      return this.indexData.featuredArticles.length > 0 && this.indexData.featuredShort.length > 0 && this.indexData.featuredProject.length > 0
    },
  },
  actions: {
    setIndexData(data: typeof useOptionArticleApiStore.state.indexData) {
      this.indexData = data
    },
  },
})

export const useBlogArticleApiStore = defineStore('blogArticleApi', {
  state: () => ({
    pageNumber: 1 as number,
    pageSize: 20 as number,
    total: 0 as number,
    data: [] as Article[],
  }),
  getters: {
    hasPageData() {
      return this.data.length > 0
    },
    getPageData() {
      return {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        total: this.total,
        data: this.data,
      }
    },
  },
  actions: {
    setPageData(pageNumber: number, pageSize: number, total: number, data: typeof useBlogArticleApiStore.state.data) {
      this.pageNumber = pageNumber
      this.pageSize = pageSize
      this.total = total
      this.data = data
    },
  },
})

export const useSearchTagsApiStore = defineStore('searchTagsApi', {
  state: () => ({
    data: {
      tags: Map<string, Tags[]>(),
    },
  }),

  actions: {
    setTags(type: string, tags: typeof useSearchTagsApiStore.state.data) {
      this.data.tags.set(type, tags)
    },
  },

  getters: {
    hasTags(type: string) {
      return this.data.tags.has(type)
    },
    getTags(type: string) {
      return this.data.tags.get(type)
    },
  },
})
