<script lang="ts" setup>
import {
  useClipboard,
  useMouse,
  useTextSelection,
  useTimeoutFn,
} from '@vueuse/core'

import * as tocbot from 'tocbot'

import { useArticleStore } from '~/store/ArticleStore'
import { formatTime } from '~/composables/formatTime'
import { useUserStore } from '~/store/UserStore'

const route = useRoute()

// @ts-expect-error no error
const shortLink = route.params.shortLink as string

const { one } = useArticleStore()

const article = await one(shortLink)

const hasCatalog = ref(false)

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

function initTOC() {
  if (!document)
    return

  if (
    !document.querySelector('#violetToc')
    || !document.querySelector('#violetMD')
  ) {
    // wait for the dom to be ready
    setTimeout(() => {
      initTOC()
    }, 100)
    return
  }

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

  setTimeout(() => {
    // check if the toc is empty
    if (!document.querySelector('.toc-list'))
      initTOC()
  }, 100)
}

const { start, stop } = useTimeoutFn(async () => {
  if (article) {
    useFetch<string>(`/api/article/views/${article?._id}`, {
      method: 'PUT',
    })
  }
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

const openPop = ref<boolean>(false)

const { x, y } = useMouse({ touch: false })

function checkSelection() {
  const selection = window.getSelection()
  if (selection && selection.toString()) {
    // 文字被选中
    openPop.value = true
    const pop = document.querySelector('.popover') as HTMLElement
    if (pop) {
      pop.style.left = `${x.value - 20}px`
      pop.style.top = `${y.value - 100}px`
    }
  }
  else {
    // 没有文字被选中
    openPop.value = false
  }
}

const toast = useToast()
const state = useTextSelection()

const sourceCopy = ref(state.text.value)

watch(
  () => state.text.value,
  (val) => {
    if (val !== '')
      sourceCopy.value = val
  },
)

const { copy, isSupported } = useClipboard({ source: sourceCopy })

function copySelection() {
  copy()
  toast.add({
    title: 'Copied',
    description: sourceCopy.value,
    timeout: 3000,
    icon: 'i-heroicons-check-circle text-violet-500',
  })
  openPop.value = false
}

watchEffect(() => {
  if (width.value < 1200) {
    hasCatalog.value = false
  }
  else {
    initTOC()
    hasCatalog.value = true
  }
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

const isLogin = ref(false)

onMounted(() => {
  nextTick(() => {
    initTOC()
  })

  const { hasAuth } = useUserStore()

  if (hasAuth())
    isLogin.value = true
})
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <div v-if="article">
        <!-- <Transition name="slide-fade">
          <NuxtImg v-if="article?.cover" :src="`${article?.cover}`" alt="cover"
            class="object-cover rounded-lg shadow-md w-full scale-110 z-0 transition-all duration-300 op90 dark:op-40 h-[30vh] max-h-[500px] absolute top-[-50px]">
          </NuxtImg>
        </Transition> -->
        <NuxtLayout name="home">
          <!-- <div v-if="article?.cover" class="mt-[20vh]"></div> -->
          <div class="text-left flex flex-col">
            <div class="mb-6 text-4xl font-600 z-2">
              {{ article?.title }}
            </div>
            <div class="mb-1 mt-8 z-2">
              {{ article?.description }}
            </div>
            <div class="mt-3 flex flex-row justify-start items-center z-2">
              <UBadge
                v-for="t in article.tags"
                :key="t"
                size="sm"
                color="violet"
                variant="solid"
                class="mx-1"
                :tag="t"
              >
                {{ t }}
              </UBadge>
            </div>
            <div class="mt-4 flex flex-row justify-between items-center">
              <div class="flex flex-row justify-start items-center">
                <div class="i-carbon-view mr-2 z-2" />
                <div class="text-violet-500 z-2">
                  {{ article?.views }} views
                </div>
                <div class="i-carbon-alarm mx-2 z-2 scale-110" />
                <div class="text-violet-500 z-2">
                  {{ formatTime(article?.updatedAt) }}
                </div>
              </div>
              <div>
                <UButton
                  v-if="isLogin"
                  icon="i-ri:edit-fill"
                  variant="link"
                  :to="`/violet/edit/${article.shortLink}`"
                  target="_blank"
                >
                  Edit this Page
                </UButton>
              </div>
            </div>
            <UDivider class="my-6" />
          </div>
          <div class="pb-10 pt-10 flex flex-row justify-between z-2">
            <div class="max-w-[760px] w-full">
              <div class="text-left">
                <!-- <MDRender v-if="article.html" :html="article.html" @render-finished="initTOC" /> -->
                <!-- <div v-if="article.html" v-html="article.html" id="violetMD"
                  class="violet-prose mb-20 mt-5 text-left font-serif" @mouseup="checkSelection"></div> -->

                <MDCRenderer
                  v-if="
                    article?.html && article?.html?.body && article?.html.data
                  "
                  id="violetMD"
                  class="violet-prose z-2"
                  :body="article?.html.body"
                  :data="article?.html.data"
                  @mouseup="checkSelection"
                />

                <div v-else class="text-2xl text-violet-500">
                  <div v-for="i in 3" :key="i" class="flex flex-col items-start">
                    <USkeleton class="h-10 w-1/3 my-2 mt-8" />
                    <USkeleton v-for="i in 10" :key="i" class="h-4 w-full my-2" />
                  </div>
                </div>

                <div v-if="isSupported">
                  <UButton
                    v-show="openPop"
                    icon="i-heroicons-clipboard-document"
                    class="popover absolute transition-all"
                    color="white"
                    size="sm"
                    variant="solid"
                    @click="copySelection"
                  >
                    copy
                  </UButton>
                </div>
              </div>
            </div>
            <ClientOnly>
              <div
                v-if="hasCatalog"
                id="violetToc"
                class="catalog p-2 pl-6 mt-8 text-[#555] text-left flex flex-row w-full justify-start animated animated-fade-in-right animated-fast dark:text-[#bbb]"
              />
            </ClientOnly>
          </div>
          <div class="violet-prose mb-10 text-left cursor-pointer">
            <a class="text-xl hover:underline" @click="$router.back">cd ..</a>
          </div>
          <Comment />
        </NuxtLayout>
      </div>
    </NuxtLayout>
  </div>
</template>
