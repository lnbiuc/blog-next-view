<script lang="ts" setup>
import type { IArticle } from '~/server/types'
import { useArticleStore } from '~/store/ArticleStore'

const shorts: Ref<IArticle[]> = ref([])

const options: Ref<string[]> = ref(['Sort by date', 'Sort by view'])

const isLoading = ref<boolean>(false)

const { category } = useArticleStore()

async function getArticles() {
  category('short').then((data) => {
    data.forEach((short) => {
      shorts.value.push(short)
    })
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
    const { data } = await useFetch<IArticle[]>('/api/search', {
      method: 'POST',
      body: {
        category: 'article',
        keyword: searchVal,
      },
    })

    shorts.value = []

    if (data.value) {
      data.value.forEach((article) => {
        shorts.value.push(article)
      })
    }

    isLoading.value = false
  }
  else {
    getArticles()
  }
}

async function handleSortByChange(selectVal: string) {
  if (selectVal === options.value[0]) {
    shorts.value.sort((a, b) => {
      // @ts-expect-error no error
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }
  else {
    shorts.value.sort((a, b) => {
      // @ts-expect-error no error
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
      href: '/favicon.ico',
    },
  ],
})
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <NuxtLayout name="home">
        <div class="flex flex-row">
          <div class="text-left w-full">
            <h1 class="text-5xl text-violet font-bold">
              Shorts
            </h1>
            <div class="py-4">
              <span>Short articles, usually some notes and code snippets.
              </span>
            </div>
            <Search
              :is-loading="isLoading" category="short" @params-change="handleParamsChange"
              @sort-by-change="handleSortByChange"
            />
          </div>
        </div>
        <ShortCards :articles="shorts" />
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>
