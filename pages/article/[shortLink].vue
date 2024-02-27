<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import * as tocbot from 'tocbot'
import { useTimeoutFn } from '@vueuse/core'
import { useArticleStore } from '~/store/ArticleStore'
import { formatTime } from '~/composables/formatTime'

const route = useRoute()

// @ts-expect-error no error
const shortLink = route.params.shortLink as string

const { one } = useArticleStore()

const article = await one(shortLink)

const hasCatalog = ref(false)

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

function initTOC() {
  if (!document) return

  if (document.querySelector('#violetToc') && document.querySelector('#violetMD')) {
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: '#violetToc',
      // Where to grab the headings to build the table of contents.
      contentSelector: '#violetMD',
      // Which headings to grab inside of the contentSelector element.
      headingSelector: 'h1, h2, h3',
      // For headings inside relative or absolute positioned containers within content.
      // hasInnerContainers: true,
      scrollSmoothOffset: -80,
      headingsOffset: 80,
    })
  } else {
    setTimeout(() => {
      initTOC()
    }, 50)
  }
}

const { start, stop } = useTimeoutFn(async () => {
  useFetch<string>(`/api/article/views/${article?._id}`, {
    method: 'PUT',
  })
}, 10000)

onMounted(() => {
  start()
})

onBeforeRouteLeave(() => {
  stop()
})

onBeforeUnmount(() => {
  tocbot.destroy()
})

const { width } = useWindowSize()

watchEffect(() => {
  if (width.value < 1200) { hasCatalog.value = false }
  else {
    nextTick(() => {
      initTOC()
    })
    hasCatalog.value = true
  }
})

useSeoMeta({
  title: () => { return article.title },
  ogTitle: () => { return article.title },
  description: () => { return article.description },
  ogDescription: () => { return article.description },
  ogImage: () => { return article.ogImage },
  twitterCard: 'summary_large_image',
  twitterTitle: () => { return article.title },
  twitterDescription: () => { return article.description },
  twitterImage: () => { return article.ogImage },
  articleAuthor: ['violet'],
  author: 'violet',
  articleModifiedTime: () => { return formatTime(article.updatedAt) },
  articlePublishedTime: () => { return formatTime(article.createdAt) },
})
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <div v-if="article">
        <NuxtLayout name="home">
          <div class="text-left flex flex-col">
            <Transition name="fade">
              <img v-if="article?.cover" :src="`${article?.cover}/comporess1600x900`" alt="cover"
                class="cover-image object-cover rounded-lg shadow-md w-full aspect-[16/9] z-10 transition-all">
            </Transition>

            <div class="my-6 text-4xl font-bold">
              {{ article?.title }}
            </div>
            <div class="mb-1">
              {{ article?.description }}
            </div>
            <div class="mt-4 flex flex-row justify-start items-center">
              <div class="i-carbon-view mr-2" />
              <div class="text-violet">
                {{ article?.views }} views
              </div>
              <div class="i-carbon-alarm mx-2 scale-110" />
              <div class="text-violet">
                {{ formatTime(article?.updatedAt) }}
              </div>
            </div>
            <UDivider class="my-6" />
          </div>
          <div class="pb-10 pt-10 flex flex-row justify-between">
            <div class="max-w-760px w-full">
              <div class="text-left">
                <MDRender v-if="article.html" :html="article.html"  @render-finished="initTOC" />
              </div>
            </div>
            <div v-if="hasCatalog" id="violetToc"
              class="catalog p-2 pl-6 mt-8 text-[#555] text-left flex flex-row w-full justify-start dark:text-[#bbb]" />
          </div>
          <div class="violet-prose mb-10 text-left cursor-pointer">
            <a class="text-xl" @click="$router.back">cd ..</a>
          </div>
          <Comment />
        </NuxtLayout>
      </div>
    </NuxtLayout>
  </div>
</template>
