<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import * as tocbot from 'tocbot'
import { getArticleByShortLink } from '~/server/api/article'
import type { ArticleWithContent } from '~/server/types/article'
import { formatTime } from '~/composables/formatTime'
import { usePreloadCacheStore } from '~/store'

const route = useRoute()
const article = ref<ArticleWithContent>()

const afterFetchData = ref(false)

// @ts-expect-error no error
const shortLink = route.params.shortLink

function getFirstLink(shortLink: string | string[]): string {
  if (Array.isArray(shortLink) && shortLink.length > 0)
    return shortLink[0]
  else if (typeof shortLink === 'string')
    return shortLink
  else
    throw new Error('Invalid input')
}

const { cacheArticle, getArticleCache } = usePreloadCacheStore()

function getArticle() {
  const res: ArticleWithContent | undefined = getArticleCache(getFirstLink(shortLink))
  if (res) {
    article.value = res
    afterFetchData.value = true
    return
  }
  getArticleByShortLink(getFirstLink(shortLink)).then((res) => {
    article.value = res.data.value?.data as ArticleWithContent
    afterFetchData.value = true
    cacheArticle(article.value)
  },
  )
}

getArticle()

const hasCatalog = ref(false)

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

function initTOC() {
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
}

onMounted(() => {
  nextTick(() => {
    initTOC()
  })
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
</script>

<template>
  <div>
    <Head>
      <Meta
        :content="article?.tags?.join(',') || 'Violet, Blog, Vue, Nuxt, TypeScript, JavaScript, Node.js, Web, Frontend, Backend, Fullstack, Developer, Programmer, Engineer, Software, Software Engineer, Software Developer, Software Programmer, Software Engineer, Software Developer'"
        name="keywords"
      />
      <Meta :content="article?.title || 'Violet\'s Blog'" property="og:title" />
      <Meta :content="article?.description || 'A blog for sharing knowledge.'" property="og:description" />
      <Meta :content="article?.ogImage || '/og.png'" property="og:image" />
      <Meta content="summary_large_image" name="twitter:card" />
      <Meta content="@lnbiuc" name="twitter:creator" />
      <Meta :content="article?.title || 'Violet\'s Blog'" name="twitter:title" />
      <Meta :content="article?.description || 'A blog for sharing knowledge.'" name="twitter:description" />
      <Meta :content="article?.ogImage || '/og.png'" name="twitter:image" />
    </Head>
    <NuxtLayout name="default">
      <div v-if="afterFetchData">
        <NuxtLayout name="home">
          <div class="text-left flex flex-col">
            <Transition name="fade">
              <img
                v-if="article?.cover[0]" :src="`${article?.cover[0]}/comporess1600x900`" alt="cover"
                class="object-cover rounded-lg shadow-md w-full aspect-[16/9] z-10"
              >
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
              <div
                class="text-left"
              >
                <MDRender :source="article!.content" />
              </div>
            </div>
            <div v-if="hasCatalog" id="violetToc" class="catalog p-2 pl-6 text-[#555] text-left flex flex-row w-full justify-start dark:text-[#bbb]" />
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

<style scoped>
.catalog {
  position: sticky;
  top: 80px;
  overflow: auto;
  height: auto;
  max-height: var(--toc-height);
  max-width: calc(1000px - 760px);
}

/* HTML: <div class="loader"></div> */
/* HTML: <div class="loader"></div> */
.loader {
  width: fit-content;
  font-weight: bold;
  font-family: monospace;
  white-space: pre;
  font-size: 30px;
  line-height: 1.2em;
  height: 1.2em;
  overflow: hidden;
}

.loader:before {
  content: "Loading...\AgodnLai...\Aoiaglni...\ALiongad...\Agindola...\Analoidg...";
  white-space: pre;
  display: inline-block;
  animation: l38 1s infinite steps(6);
}

@keyframes l38 {
  100% {
    transform: translateY(-100%)
  }
}
</style>
