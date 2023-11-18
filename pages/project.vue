<script setup lang="ts">
import type { Article } from '~/server/types/article'
import { getArticleByCategory } from '~/server/api/article'

const page = ref<{ pageNumber: number, pageSize: number, total: number, data: Article[] }>({
  pageNumber: 1,
  pageSize: 20,
  total: 0,
  data: [],
})

getArticleByCategory('PROJECT', page.value.pageNumber, page.value.pageSize).then((res) => {
  page.value = res.data.value?.data as { pageNumber: number, pageSize: number, total: number, data: Article[] }
  page.value.data.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
})
</script>

<template>
  <NuxtLayout name="default">
    <NuxtLayout name="home">
      <div class="flex flex-row">
        <div class="w-full text-left">
          <h1 class="text-5xl font-bold text-violet">
            Project
          </h1>
          <div class="py-4">
            <span>Showcase of my works on full-stack development.</span>
          </div>
        </div>
      </div>
      <ProjectCards :articles="page.data" />
    </NuxtLayout>
  </NuxtLayout>
</template>
