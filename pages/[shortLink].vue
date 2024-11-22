<script setup lang="ts">
import { useArticleStore } from '~/store/ArticleStore'

const route = useRoute()

// @ts-expect-error no error
const shortLink = route.params.shortLink as string

const { one } = useArticleStore()

const article = await one(shortLink)

useHead({
  htmlAttrs: {
    lang: 'zh_CN',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/site-favicon.ico',
    },
  ],
})

useSeoMeta({
  title: () => {
    return article ? `${article.title} | 薇尔薇` : '404 NotFound | 薇尔薇'
  },
  ogTitle: () => {
    return article ? `${article.title} | 薇尔薇` : '404 NotFound | 薇尔薇'
  },
  description: () => {
    return article ? `${article.description}` : '404 NotFound'
  },
  ogDescription: () => {
    return article ? `${article.description}` : '404 NotFound'
  },
  articleAuthor: ['violet'],
  author: 'violet',
  articleModifiedTime: () => {
    return article ? formatTime(article.updatedAt) : ''
  },
  articlePublishedTime: () => {
    return article ? formatTime(article.createdAt) : ''
  },
})

const colorModel = useColorMode()

defineOgImage({
  component: 'NuxtSeo',
  props: {
    title: () => {
      return article ? `${article.title}` : '404 NotFound'
    },
    description: () => {
      return article ? `${article.description}` : '404 NotFound'
    },
    theme: '#a78bfa',
    colorMode: () => (colorModel.preference === 'dark' ? 'dark' : 'light'),
  },
})
</script>

<template>
  <div v-if="article">
    <NuxtLayout name="common-view">
      <template #title>
        {{ article?.title }}
      </template>
      <template #description>
        {{ article?.description }}
      </template>
      <MDCRenderer
        v-if="article?.html && article?.html?.body && article?.html.data"
        id="violetMD"
        class="violet-prose z-2"
        :body="article?.html.body"
        :data="article?.html.data"
      />
      <Comment />
    </NuxtLayout>
  </div>
  <div v-else class="w-full text-center">
    <h1 class="text-10 pt-40vh">
      404 Not Found
    </h1>
    <NuxtLink to="/" class="text-violet mt-2 hover:underline-violet">
      Back To Home
    </NuxtLink>
  </div>
</template>
