<script setup lang="ts">
import type { Article } from '~/server/types/article'
import { getAllArticle, searchArticle } from '~/server/api/article'

const page = ref<{ pageNumber: number; pageSize: number; total: number; data: Article[] }>({
  pageNumber: 1,
  pageSize: 20,
  total: 0,
  data: [],
})

const options: Ref<string[]> = ref(['Sort by date', 'Sort by view'])

const isLoading = ref<boolean>(false)

async function getArticles() {
  isLoading.value = true
  getAllArticle(page.value.pageNumber, page.value.pageSize).then((res) => {
    page.value = res.data.value?.data as { pageNumber: number; pageSize: number; total: number; data: Article[] }
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
      page.value = res.data.value?.data as { pageNumber: number; pageSize: number; total: number; data: Article[] }
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

useHead({
  title: 'Blogs',
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
            <Search category="ARTICLE" :is-loading="isLoading" @params-change="handleParamsChange"
              @sort-by-change="handleSortByChange" />
          </div>
        </div>
        <BlogCards :articles="page.data" />
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>
