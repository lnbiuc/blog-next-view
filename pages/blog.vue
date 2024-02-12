<script lang="ts" setup>
import type { IArticle } from '~/server/types'
import { useArticleStore } from '~/store/ArticleStore'

const articles: Ref<IArticle[]> = ref([])

const options: Ref<string[]> = ref(['Sort by date', 'Sort by view'])

const isLoading = ref<boolean>(false)

const { category } = useArticleStore()

async function getArticles() {
  category('article').then((data) => {
    data.forEach((article) => {
      articles.value.push(article)
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

    articles.value = []

    if (data.value) {
      data.value.forEach((article) => {
        articles.value.push(article)
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
    articles.value.sort((a, b) => {
      // @ts-expect-error no error
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }
  else {
    articles.value.sort((a, b) => {
      // @ts-expect-error no error
      return b.views - a.views
    })
  }
}

useSeoMeta({
  ogImage: '/ogblog.png',
  twitterTitle: '薇尔薇｜Blog',
  twitterDescription: '薇尔薇 is A Web Developer 🖥. Code for Fun.',
  twitterImage: '/ogblog.png',
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
              Blog
            </h1>
            <div class="py-4">
              <span>
                A collection of my thoughts and experiences.
              </span>
            </div>
            <Search
              :is-loading="isLoading" category="article" @params-change="handleParamsChange"
              @sort-by-change="handleSortByChange"
            />
          </div>
        </div>
        <BlogCards :articles="articles" />
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>
