<script lang="ts" setup>
import type { Article } from '~/server/types/article'
import { getArticleByCategory, searchArticle } from '~/server/api/article'

const page = ref<{ pageNumber: number, pageSize: number, total: number, data: Article[] }>({
  pageNumber: 1,
  pageSize: 20,
  total: 0,
  data: [],
})

const options: Ref<string[]> = ref(['Sort by date', 'Sort by view'])

const isLoading = ref<boolean>(false)

async function getArticles() {
  isLoading.value = true
  getArticleByCategory('ARTICLE', page.value.pageNumber, page.value.pageSize).then((res) => {
    page.value = res.data.value?.data as { pageNumber: number, pageSize: number, total: number, data: Article[] }
    page.value.data.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    isLoading.value = false
  })
}

getArticles()

async function handleParamsChange(searchVal: string) {
  if (searchVal === 'ALL') {
    getArticles()
    return
  }
  if (searchVal !== '') {
    isLoading.value = true
    searchArticle(searchVal, page.value.pageNumber, page.value.pageSize).then((res) => {
      page.value = res.data.value?.data as { pageNumber: number, pageSize: number, total: number, data: Article[] }
      page.value.data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      isLoading.value = false
    })
  }
  else {
    getArticles()
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
  ogImage: '/ogblog.png',
  twitterTitle: '薇尔薇｜Blog',
  twitterDescription: '薇尔薇 is A Web Developer 🖥. Code for Fun.',
  twitterImage: '/ogblog.png',
  twitterCard: 'summary_large_image'
})

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png'
    }
  ]
})
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <NuxtLayout name="home">
        <div class="flex flex-row">
          <div class="w-full text-left">
            <h1 class="text-5xl font-bold text-violet">
              Blog
            </h1>
            <div class="py-4">
              <span>Thoughts, mental models, and tutorials about front-end development.</span>
            </div>
            <Search
              :is-loading="isLoading" category="ARTICLE" @params-change="handleParamsChange"
              @sort-by-change="handleSortByChange"
            />
          </div>
        </div>
        <BlogCards :articles="page.data" />
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>
