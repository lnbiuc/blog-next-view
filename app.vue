<script lang="ts" setup>
import type { Article } from '~/server/types/article'
import { getTagByCategory } from '~/server/api/tag'
import { usePreloadCacheStore } from '~/store'
import { getArticleByCategory } from '~/server/api/article'

function handleToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const isScroll = ref(false)

const articleTags: Ref<string[]> = ref(['ALL'])
const shortTags: Ref<string[]> = ref(['ALL'])

const { cacheTags, getTagsCache, cacheCategoryArticle, getCategoryArticleCache } = usePreloadCacheStore()

async function preloadArticleTags() {
  getTagByCategory('ARTICLE').then((res) => {
    const resTag = res.data.value?.data as string[]
    // push res to tags
    resTag.forEach(e => articleTags.value.push(e))
    if (!getTagsCache('ARTICLE'))
      cacheTags('ARTICLE', articleTags.value)
  })
}

function preloadShortTags() {
  getTagByCategory('SHORTS').then((res) => {
    const resTag = res.data.value?.data as string[]
    // push res to tags
    resTag.forEach(e => shortTags.value.push(e))
    if (!getTagsCache('SHORTS'))
      cacheTags('SHORTS', shortTags.value)
  })
}

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

function preloadArticles() {
  if (!getCategoryArticleCache('ARTICLE')) {
    getArticleByCategory('ARTICLE', articlePage.value.pageNumber, articlePage.value.pageSize).then((res) => {
      articlePage.value = res.data.value?.data as { pageNumber: number, pageSize: number, total: number, data: Article[] }
      articlePage.value.data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      cacheCategoryArticle('ARTICLE', articlePage.value)
      provide('articlePage', articlePage)
    })
  }

  if (!getCategoryArticleCache('SHORTS')) {
    getArticleByCategory('SHORTS', shortsPage.value.pageNumber, shortsPage.value.pageSize).then((res) => {
      shortsPage.value = res.data.value?.data as { pageNumber: number, pageSize: number, total: number, data: Article[] }
      shortsPage.value.data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      cacheCategoryArticle('SHORTS', shortsPage.value)
      provide('shortsPage', shortsPage)
    })
  }

  if (!getCategoryArticleCache('PROJECT')) {
    getArticleByCategory('PROJECT', projectPage.value.pageNumber, projectPage.value.pageSize).then((res) => {
      projectPage.value = res.data.value?.data as { pageNumber: number, pageSize: number, total: number, data: Article[] }
      projectPage.value.data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      cacheCategoryArticle('PROJECT', projectPage.value)
      provide('projectPage', projectPage)
    })
  }
}

preloadArticleTags()
preloadShortTags()
preloadArticles()

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScroll.value = window.scrollY > window.innerHeight / 2
  })
})

useColorMode().value = 'dark'
</script>

<template>
  <div>
    <div class="main-bg z-0 h-full w-full opacity-20" />
    <Header />
    <div class="relative z-10">
      <NuxtPage />
    </div>
    <Footer />
    <UNotifications class="w-[300px]" />
    <Transition name="fade">
      <div v-if="isScroll" class="fixed bottom-4 right-4 z-1000 flex flex-row justify-end">
        <div
          class="h-35px w-35px flex flex-row items-center justify-center rounded-full bg-violet transition-all duration-150 active:scale-90 hover:scale-110 hover:bg-violet-500"
          @click="handleToTop"
        >
          <div class="i-carbon-chevron-up" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #0E1111;
  color: #C9D1D9;
}

.md-editor-dark {
  --md-color: '#C9D1D9' !important;
}

.main-bg {
  position: fixed;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1049%26quot%3b)' fill='none'%3e%3cpath d='M1294.88 496.8 a119.9 119.9 0 1 0 239.8 0 a119.9 119.9 0 1 0 -239.8 0z' fill='rgba(138%2c 99%2c 255%2c 0.24)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M525.27 376.38 a117.11 117.11 0 1 0 234.22 0 a117.11 117.11 0 1 0 -234.22 0z' fill='rgba(138%2c 99%2c 255%2c 0.24)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M787.44 191.98 a165.28 165.28 0 1 0 330.56 0 a165.28 165.28 0 1 0 -330.56 0z' fill='rgba(138%2c 99%2c 255%2c 0.24)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M266.05 202.1 a115.4 115.4 0 1 0 230.8 0 a115.4 115.4 0 1 0 -230.8 0z' fill='rgba(138%2c 99%2c 255%2c 0.24)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M21.61 163.07 a107.41 107.41 0 1 0 214.82 0 a107.41 107.41 0 1 0 -214.82 0z' fill='rgba(138%2c 99%2c 255%2c 0.24)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1031.36 20.49 a113.34 113.34 0 1 0 226.68 0 a113.34 113.34 0 1 0 -226.68 0z' fill='rgba(138%2c 99%2c 255%2c 0.24)' class='triangle-float2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1049'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e");
  background-position: center;
  background-size: cover;
}

.md-editor-preview-wrapper {
  padding: 0 !important;
}

.md-editor-catalog-link span:hover,
.md-editor-catalog-active>span {
  color: #A78BFA !important;
}

/* 1. declare transition */
.fade-move,
.fade-enter-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  animation: up-to-down .5s ease;
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(1) translate(50px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  animation: up-to-down .5s ease reverse;
}

@keyframes up-to-down {
  from {
    transform: translateY(50%);
  }

  to {
    transform: translateY(0%);
  }
}

.right-enter-active {
  animation: right-to-left .5s ease;
}

@keyframes right-to-left {
  from {
    transform: translateX(50%);
  }

  to {
    transform: translateX(0%);
  }
}

.downUp-enter-active {
  animation: down-up .5s ease;
}

.downUp-leave-active {
  animation: down-up .5s ease reverse;
}

@keyframes one-in {
  from {
    transform: translateY(50%);
  }

  to {
    transform: translateY(0%);
  }
}

@keyframes multi-step-spin {
  0% {
    transform: rotate(0turn);
  }

  25% {
    transform: rotate(0.25turn);
  }

  50% {
    transform: rotate(0.5turn);
  }

  75% {
    transform: rotate(0.75turn);
  }

  100% {
    transform: rotate(1turn);
  }
}

.common-shadow {
  box-shadow:
    2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
    100px 100px 80px rgba(0, 0, 0, 0.07);
}

.card-bg-filter {
  backdrop-filter: saturate(180%) blur(20px);
}

.my-open-tab {
  cursor: url(/new-tab.png) 10 10, pointer
}

@font-face {
  font-family: 'CodeFont';
  src: url('/MonaspaceArgon-Regular.woff') format('truetype');
}

.github-theme h1 {
  font-size: 2rem !important;
}

.github-theme h2 {
  font-size: 1.75rem;
}

.github-theme h3 {
  font-size: 1.5rem;
}

.github-theme h4 {
  font-size: 1.25rem;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
