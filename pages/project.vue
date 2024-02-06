<script lang="ts" setup>
import type { Article } from '~/server/types/article'
import { getArticleByCategory } from '~/server/api/article'
import { usePreloadCacheStore } from '~/store'

const page = ref<{ pageNumber: number, pageSize: number, total: number, data: Article[] }>({
  pageNumber: 1,
  pageSize: 50,
  total: 0,
  data: [],
})

const { cacheCategoryArticle, getCategoryArticleCache } = usePreloadCacheStore()

function loadProjects() {
  const res: { pageNumber: number, pageSize: number, total: number, data: Article[] } | undefined = getCategoryArticleCache('PROJECT')
  if (res) {
    page.value = res
    return
  }
  getProjects()
}

loadProjects()

function getProjects() {
  getArticleByCategory('PROJECT', page.value.pageNumber, page.value.pageSize).then((res) => {
    page.value = res.data.value?.data as { pageNumber: number, pageSize: number, total: number, data: Article[] }
    page.value.data.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    cacheCategoryArticle('PROJECT', page.value)
  })
}

useSeoMeta({
  ogImage: '/ogproject.png',
  twitterTitle: '薇尔薇｜Project',
  twitterDescription: '薇尔薇 is A Web Developer 🖥. Code for Fun.',
  twitterImage: '/ogproject.png',
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
            <h1 class="text-5xl text-violet font-bold">
              Project
            </h1>
            <div class="py-4">
              <span>
                My projects and interesting projects that I deploy
              </span>
            </div>
          </div>
        </div>
        <ProjectCards :articles="page.data" />
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>
