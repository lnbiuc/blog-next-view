<script setup lang="ts">
import { getAllTag } from '~/server/api/tag'
import { getAllArticle } from '~/server/api/article'

const searchVal: Ref<string> = ref('')

const tags: Ref<string[]> = ref([])

const options: Ref<string[]> = ref(['Sort by date', 'Sort by view'])

const selectVal: Ref<string> = ref(options.value[0])

async function getTags() {
  getAllTag().then((res) => {
    tags.value = res.data.value?.data as string[]
  })
}

const page = ref<{ pageNumber: number; pageSize: number; total: number; data: [] }>({
  pageNumber: 1,
  pageSize: 10,
  total: 0,
  data: [],
})

async function getArticles() {
  getAllArticle(page.value.pageNumber, page.value.pageSize).then((res) => {
    page.value = res.data.value?.data as { pageNumber: number; pageSize: number; total: number; data: [] }
  })
}

onMounted(() => {
  getTags()
  getArticles()
})
</script>

<template>
  <NuxtLayout name="home">
    <div class="flex flex-row">
      <div class="w-full text-left">
        <h1 class="text-5xl font-bold text-violet">
          Blog
        </h1>
        <div class="py-4">
          <span>Thoughts, mental models, and tutorials about front-end development.</span>
        </div>
        <div class="flex flex-row">
          <UInput
            v-model="searchVal"
            class="w-full"
            :autofocus="true"
            icon="i-heroicons-magnifying-glass-20-solid" size="lg" placeholder="Search..."
          />
          <USelectMenu v-model="selectVal" class="ml-2" size="lg" :options="options" />
        </div>
        <div class="my-4">
          <span class="mr-2 text-lg">Tags:</span>
          <UButton v-for="t in tags" :key="t" size="2xs" class="m-1" :tag="t">
            {{ t }}
          </UButton>
        </div>
      </div>
    </div>
    <BlogCards :articles="page.data" />
  </NuxtLayout>
</template>
