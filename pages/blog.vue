<script lang="ts" setup>
import type { IArticle } from '~/server/types'
import { useArticleStore } from '~/store/ArticleStore'

const articles: Ref<IArticle[]> = ref([])

const options: Ref<string[]> = ref(['Sort by date', 'Sort by view'])

const isLoading = ref<boolean>(false)

const { category } = useArticleStore()

const selected = ref('Sort by date')

async function getArticles() {
  const data = await category('article')

  data.forEach(article => {
    let include = false
    articles.value.forEach(existArticle => {
      if (article._id == existArticle._id) {
        include = true
      }
    })
    if (!include) {
      articles.value.push(article)
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
  selected.value = selectVal

  if (selectVal === options.value[0]) {
    articles.value.sort((a, b) => {
      // @ts-expect-error no error
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }
  else {
    articles.value.sort((a, b) => {
      return b.views - a.views
    })
  }
}

useSeoMeta({
  title: 'Blog | 薇尔薇',
  ogTitle: 'Blog | 薇尔薇',
  description: '薇尔薇 is A Web Developer. Code for Fun.',
  ogDescription: '薇尔薇 is A Web Developer. Code for Fun.',
})

const colorModel = useColorMode()

defineOgImage({
  component: 'NuxtSeo',
  props: {
    title: 'Blog | 薇尔薇',
    description: '薇尔薇 is A Web Developer. Code for Fun.',
    theme: '#a78bfa',
    colorMode: () => colorModel.preference === 'dark' ? 'dark' : 'light',
  },
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
            <Search :is-loading="isLoading" category="article" @params-change="handleParamsChange"
              @sort-by-change="handleSortByChange" />
          </div>
        </div>
        <BlogCards :articles="articles" />
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>
