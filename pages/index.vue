<script lang="ts" setup>
import type { Article } from '~/server/types/article'
import { usePreloadCacheStore } from '~/store'
import { getArticleByCategory } from '~/server/api/article'

const online = useOnline()

useSeoMeta({
  ogImage: '/og.png',
  twitterTitle: '薇尔薇',
  twitterDescription: '薇尔薇 is A Web Developer 🖥. Code for Fun.',
  twitterImage: '/og.png',
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

const articlePage = ref<{ pageNumber: number, pageSize: number, total: number, data: Article[] }>({
  pageNumber: 1,
  pageSize: 50,
  total: 0,
  data: [],
})

const shortsPage = ref<{ pageNumber: number, pageSize: number, total: number, data: Article[] }>({
  pageNumber: 1,
  pageSize: 50,
  total: 0,
  data: [],
})

const projectPage = ref<{ pageNumber: number, pageSize: number, total: number, data: Article[] }>({
  pageNumber: 1,
  pageSize: 50,
  total: 0,
  data: [],
})

const { cacheCategoryArticle, getCategoryArticleCache } = usePreloadCacheStore()

function preloadArticles() {
  if (!getCategoryArticleCache('ARTICLE') || getCategoryArticleCache('ARTICLE')?.total === 0) {
    getArticleByCategory('ARTICLE', articlePage.value.pageNumber, articlePage.value.pageSize).then((res) => {
      articlePage.value = res.data.value?.data as { pageNumber: number, pageSize: number, total: number, data: Article[] }
      articlePage.value.data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      cacheCategoryArticle('ARTICLE', articlePage.value)
    })
  }
  else {
    articlePage.value = getCategoryArticleCache('ARTICLE') as { pageNumber: number, pageSize: number, total: number, data: Article[] }
  }

  if (!getCategoryArticleCache('SHORTS') || getCategoryArticleCache('SHORTS')?.total === 0) {
    getArticleByCategory('SHORTS', shortsPage.value.pageNumber, shortsPage.value.pageSize).then((res) => {
      shortsPage.value = res.data.value?.data as { pageNumber: number, pageSize: number, total: number, data: Article[] }
      shortsPage.value.data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      cacheCategoryArticle('SHORTS', shortsPage.value)
    })
  }
  else {
    shortsPage.value = getCategoryArticleCache('SHORTS') as { pageNumber: number, pageSize: number, total: number, data: Article[] }
  }

  if (!getCategoryArticleCache('PROJECT') || getCategoryArticleCache('PROJECT')?.total === 0) {
    getArticleByCategory('PROJECT', projectPage.value.pageNumber, projectPage.value.pageSize).then((res) => {
      projectPage.value = res.data.value?.data as { pageNumber: number, pageSize: number, total: number, data: Article[] }
      projectPage.value.data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      cacheCategoryArticle('PROJECT', projectPage.value)
    })
  }
  else {
    projectPage.value = getCategoryArticleCache('PROJECT') as { pageNumber: number, pageSize: number, total: number, data: Article[] }
  }
}

preloadArticles()
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <IndexIGImage />
      <div>
        <Suspense>
          <ClientOnly>
            <div v-if="!online" text-gray:80>
              You're offline
            </div>
          </ClientOnly>
          <template #fallback>
            <div op50 italic>
              <span animate-pulse>Loading...</span>
            </div>
          </template>
        </Suspense>
        <WelcomeCard />
        <NuxtLayout name="home">
          <div v-if="articlePage.data.length > 3" id="featured">
            <div class="title-font">
              Featured Article
            </div>
            <BlogCards :articles="articlePage.data.slice(0, 6)" />
            <div class="title-btn">
              <MyButton @click="$router.push('/blog')">
                See More
                <div class="i-ri:arrow-right-line ml-2 mt-[2px] text-violet" />
              </MyButton>
            </div>
          </div>
          <div v-if="shortsPage.data.length > 3">
            <div class="title-font">
              Featured Short
            </div>
            <ShortCards :articles="shortsPage.data.slice(0, 6)" />
            <div class="title-btn">
              <MyButton @click="$router.push('/shorts')">
                See More
                <div class="i-ri:arrow-right-line ml-2 mt-[2px] text-violet" />
              </MyButton>
            </div>
          </div>
          <div v-if="projectPage.data.length > 1">
            <div class="title-font">
              Featured Project
            </div>
            <ProjectCards :articles="projectPage.data.slice(0, 3)" />
            <div class="title-btn">
              <MyButton @click="$router.push('/project')">
                See More
                <div class="i-ri:arrow-right-line ml-2 mt-[2px] text-violet" />
              </MyButton>
            </div>
          </div>
        </NuxtLayout>
      </div>
    </NuxtLayout>
  </div>
</template>
