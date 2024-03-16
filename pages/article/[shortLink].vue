<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import '~/styles/md-alert.css';
import { useClipboard, useMouse, useTextSelection } from '@vueuse/core'

import * as tocbot from 'tocbot'
import { useTimeoutFn } from '@vueuse/core'
import { useArticleStore } from '~/store/ArticleStore'
import { formatTime } from '~/composables/formatTime'
import type { IArticle } from '~/server/types'

const route = useRoute()

// @ts-expect-error no error
const shortLink = route.params.shortLink as string

const { one } = useArticleStore()

// const article: Ref<IArticle> = ref({
//   _id: '',
//   shortLink: '',
//   title: '',
//   description: '',
//   cover: '',
//   category: '',
//   tags: [],
//   content: '',
//   authorId: '',
//   status: '',
//   views: 0,
//   likes: 0,
//   ogImage: '',
//   link: '',
//   createdAt: undefined,
//   updatedAt: undefined,
//   html: '',
// })

// one(shortLink).then((data) => {
//   if (data) {
//     article.value = data
//   }
// })

const router = useRouter()

const article = await one(shortLink)

if (!article) {
  router.back()
}

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
  if (!document) return


  if (!document.querySelector('#violetToc') || !document.querySelector('#violetMD')) {
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
    if (!document.querySelector('.toc-list')) {
      initTOC()
    }
  }, 100)
}

function initCopyBtn() {

  if (document.querySelectorAll('.markdown-it-code-copy').length === 0) {
    setTimeout(() => {
      initCopyBtn()
    }, 500)
    return
  }

  document.querySelectorAll('.markdown-it-code-copy').forEach((btn) => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-clipboard-text');
      sourceCopy.value = code as string
      copy()
      toast.add({ title: 'Copied', timeout: 1000, icon: 'i-heroicons-check-circle text-violet' })
    })
  })
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

watch(() => state.text.value, (val) => {
  if (val !== '')
    sourceCopy.value = val
})

const { copy, isSupported } = useClipboard({ source: sourceCopy })

function copySelection() {
  copy()
  toast.add({ title: 'Copied', description: sourceCopy.value, timeout: 3000, icon: 'i-heroicons-check-circle text-violet' })
  openPop.value = false
}

watchEffect(() => {
  if (width.value < 1200) { hasCatalog.value = false }
  else {
    initTOC()
    hasCatalog.value = true
  }
})

useSeoMeta({
  title: () => { return article ? `${article.title} | 薇尔薇` :'404 NotFound | 薇尔薇' },
  ogTitle: () => { return article ? `${article.title} | 薇尔薇`: '404 NotFound | 薇尔薇' },
  description: () => { return article ? `${article.description}` : '404 NotFound' },
  ogDescription: () => { return article ? `${article.description}` : '404 NotFound' },
  articleAuthor: ['violet'],
  author: 'violet',
  articleModifiedTime: () => { return article ? formatTime(article.updatedAt) : '' },
  articlePublishedTime: () => { return article ? formatTime(article.createdAt) : '' },
})

const colorModel = useColorMode()

defineOgImage({
  component: 'NuxtSeo',
  props: {
    title: () => { return article ? `${article.title} | 薇尔薇` :'404 NotFound | 薇尔薇' },
    description: () => { return article ? `${article.description}` : '404 NotFound' },
    theme: '#a78bfa',
    colorMode: () => colorModel.preference === 'dark' ? 'dark' : 'light',
  },
})

onMounted(() => {
  nextTick(() => {
    initTOC()
    initCopyBtn()
  })
})
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <div v-if="article">
        <NuxtLayout name="home">
          <div class="text-left flex flex-col">
            <div class="flex flex-row justify-center items-center my-4">
              <UBadge v-for="t in article.tags" :key="t" size="lg" :ui="{ rounded: 'rounded-full' }" color="violet"
                variant="solid" class="mx-1" :tag="t">
                {{ t }}
              </UBadge>
            </div>
            <Transition name="fade">
              <img v-if="article?.cover" :src="`${article?.cover}/comporess1600x900`" alt="cover"
                class="cover-image object-cover rounded-lg shadow-md w-full aspect-[16/9] z-10 transition-all duration-300 op90 dark:op-70 hover:op100">
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
                <!-- <MDRender v-if="article.html" :html="article.html" @render-finished="initTOC" /> -->
                <div v-if="article.html" v-html="article.html" id="violetMD" class="violet-prose mb-20 mt-5 text-left"
                  @mouseup="checkSelection"></div>
                <div v-else class="text-2xl text-violet">loading... please wait</div>
                <div v-if="isSupported">
                  <div v-show="openPop"
                    class="backdrop-blur-md popover rounded text-gray-600 shadow ring-[#ccc] ring-inset flex flex-row absolute h-30px w-50px cursor-pointer justify-center items-center transition-all ring-1 dark:text-gray-400 dark:ring-[#333] active:scale-95 hover:scale-105"
                    @click="copySelection">
                    Copy
                  </div>
                </div>
              </div>
            </div>
            <ClientOnly>
              <div v-if="hasCatalog" id="violetToc"
                class="catalog p-2 pl-6 mt-8 text-[#555] text-left flex flex-row w-full justify-start dark:text-[#bbb]" />
            </ClientOnly>
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
