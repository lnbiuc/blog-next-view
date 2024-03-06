<script lang="ts" setup>
import type { IArticle } from '~/server/types'
import { useArticleStore } from '~/store/ArticleStore'

const shorts: Ref<IArticle[]> = ref([])

const options: Ref<string[]> = ref(['Sort by date', 'Sort by view'])

const isLoading = ref<boolean>(false)

const { category } = useArticleStore()

const selected = ref('Sort by date')

async function getArticles() {
  const data = await category('short')

  data.forEach(article => {
    let include = false
    shorts.value.forEach(existArticle => {
      if (article._id == existArticle._id) {
        include = true
      }
    })
    if (!include) {
      shorts.value.push(article)
    }
  })

  handleSortByChange(selected.value)
}

getArticles()

async function handleParamsChange(searchVal: string) {
  if (searchVal === 'ALL') {
    getArticles()
    return
  }
  if (searchVal !== '') {
    isLoading.value = true
    const { data } = await useFetch<IArticle[]>('/api/search/orama', {
      method: 'POST',
      body: {
        category: 'short',
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

  selected.value = selectVal
  if (selectVal === options.value[0]) {
    shorts.value.sort((a, b) => {
      // @ts-expect-error no error
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }
  else {
    shorts.value.sort((a, b) => {
      return b.views - a.views
    })
  }
}

useSeoMeta({
  title: 'Short | 薇尔薇',
  ogTitle: 'Short | 薇尔薇',
  description: '薇尔薇 is A Web Developer. Code for Fun.',
  ogDescription: '薇尔薇 is A Web Developer. Code for Fun.',
})

const colorModel = useColorMode()

defineOgImage({
  component: 'NuxtSeo',
  props: {
    title: 'Short | 薇尔薇',
    description: '薇尔薇 is A Web Developer. Code for Fun.',
    theme: '#a78bfa',
    colorMode: () => colorModel.preference === 'dark' ? 'dark' : 'light',
  },
})

useHead({
  htmlAttrs: {
    lang: 'zh_CN',
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
            <Search :is-loading="isLoading" category="short" @params-change="handleParamsChange"
              @sort-by-change="handleSortByChange" />
          </div>
        </div>
        <ShortCards :articles="shorts" />
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>
