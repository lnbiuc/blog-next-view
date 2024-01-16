<script lang="ts" setup>
import type { Article } from '~/server/types/article'
import { getArticleByCategory, searchShorts } from '~/server/api/article'
import { usePreloadCacheStore } from '~/store'

const page = ref<{ pageNumber: number, pageSize: number, total: number, data: Article[] }>({
  pageNumber: 1,
  pageSize: 50,
  total: 0,
  data: [],
})

const options: Ref<string[]> = ref(['Sort by date', 'Sort by view'])

const isLoading = ref<boolean>(false)

const { cacheCategoryArticle, getCategoryArticleCache } = usePreloadCacheStore()

function loadShorts() {
  const res: { pageNumber: number, pageSize: number, total: number, data: Article[] } | undefined = getCategoryArticleCache('SHORTS')
  if (res) {
    page.value = res
    return
  }
  getShorts()
}

loadShorts()

async function getShorts() {
  isLoading.value = true
  getArticleByCategory('SHORTS', page.value.pageNumber, page.value.pageSize).then((res) => {
    page.value = res.data.value?.data as { pageNumber: number, pageSize: number, total: number, data: Article[] }
    page.value.data.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    isLoading.value = false
    cacheCategoryArticle('SHORTS', page.value)
  })
}

async function handleParamsChange(searchVal: string) {
  if (searchVal === 'ALL') {
    getShorts()
    return
  }
  if (searchVal !== '') {
    isLoading.value = true
    searchShorts(searchVal, page.value.pageNumber, page.value.pageSize).then((res) => {
      page.value = res.data.value?.data as { pageNumber: number, pageSize: number, total: number, data: Article[] }
      isLoading.value = false
    })
  }
  else {
    getShorts()
  }
}

async function handleSortByChange(selectVal: string) {
  if (selectVal === options.value[0]) {
    page.value.data.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }
  else {
    page.value.data.sort((a, b) => {
      return b.views - a.views
    })
  }
}

useSeoMeta({
  ogImage: '/ogshort.png',
  twitterTitle: '薇尔薇｜Shorts',
  twitterDescription: '薇尔薇 is A Web Developer 🖥. Code for Fun.',
  twitterImage: '/ogshort.png',
  twitterCard: 'summary_large_image',
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png',
    },
  ],
})
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <NuxtLayout name="home">
        <div class="flex flex-row">
          <div class="w-full text-left">
            <h1 class="text-5xl font-bold text-violet">
              Shorts
            </h1>
            <div class="py-4">
              <span>A collection of short articles and thoughts.
              </span>
            </div>
            <Search
              :is-loading="isLoading" category="SHORTS" @params-change="handleParamsChange"
              @sort-by-change="handleSortByChange"
            />
          </div>
        </div>
        <ShortCards :articles="page.data" />
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>
