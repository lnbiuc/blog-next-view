<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { MdCatalog, MdPreview } from 'md-editor-v3'
import type { HeadList } from 'md-editor-v3/lib/types'
import { getArticleByShortLink } from '~/server/api/article'
import type { ArticleWithContent } from '~/server/types/article'
import 'md-editor-v3/lib/preview.css'
import MyGiscus from '~/components/Giscus/MyGiscus.vue'
import { formatTime } from '~/composables/formatTime'
import 'animate.css'

interface RouteParams {
  shortLink: string
}

const route = useRoute()
const params = route.params
const article = ref<ArticleWithContent>()
const id = 'preview-only'

const isLoading = ref(true)
const afterFetchData = ref(false)

function processShortLink(shortLink: string | string[]): string {
  if (Array.isArray(shortLink)) {
    return ''; // 如果是数组，返回空字符串
  } else {
    return shortLink; // 否则返回shortLink本身
  }
}
function getArticle() {
  getArticleByShortLink(processShortLink(params?.shortLink)).then((res) => {
    article.value = res.data.value?.data as ArticleWithContent
    afterFetchData.value = true
  },
  )
}

getArticle()

const color = useColorMode()

const theme = ref<'light' | 'dark'>(color.value === 'dark' ? 'dark' : 'light')

// if (window)
//   theme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

watch(() => color.value, () => {
  theme.value = color.value === 'light' ? 'light' : 'dark'
}, {
  immediate: true,
})

let scrollElement: string | HTMLElement | undefined

onMounted(() => {
  scrollElement = document.documentElement
  // color.preference = theme.value
})

// nextTick(() => {
//   nextTick(() => {
//     theme.value = color.value === 'light' ? 'light' : 'dark'
//   })
// })

const mdHeadingId = (_text: any, _level: any, index: number) => `heading-${index}`

const hasCatalog = ref(false)

function handleOnGetCatalog(catalog: HeadList[]) {
  if (catalog && catalog.length > 0)
    hasCatalog.value = true

  isLoading.value = false
}

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
      <Meta :content="article?.cover[0] || '/og.png'" property="og:image" />
      <Meta content="summary_large_image" name="twitter:card" />
      <Meta content="@lnbiuc" name="twitter:creator" />
      <Meta :content="article?.title || 'Violet\'s Blog'" name="twitter:title" />
      <Meta :content="article?.description || 'A blog for sharing knowledge.'" name="twitter:description" />
      <Meta :content="article?.cover[0] || '/og.png'" name="twitter:image" />
    </Head>
    <NuxtLayout name="default">
      <NuxtLayout name="home">
        <div v-if="isLoading" class="absolute left-0 top-0 z-40 bg-light-200 dark:bg-black">
          <div class="relative h-[100vh] w-[100vw] flex flex-row items-center justify-center">
            <div class="loader w-full scale-150 text-violet" />
          </div>
        </div>
        <div v-if="afterFetchData">
          <div class="flex flex-col text-left">
            <Transition name="fade">
              <img
                v-if="article?.cover[0]" :src="article?.cover[0]" alt="cover"
                class="z-10 aspect-[2.5/1] w-full rounded-lg object-cover"
              >
            </Transition>

            <div class="my-6 text-4xl font-bold">
              {{ article?.title }}
            </div>
            <div class="mb-1">
              {{ article?.description }}
            </div>
            <div class="mt-4 flex flex-row items-center justify-start text-violet">
              <div class="i-carbon-view mr-2" />
              <div>{{ article?.views }} views</div>
              <div class="i-carbon-alarm mx-2 scale-110" />
              <div>{{ formatTime(article?.updatedAt) }}</div>
            </div>
            <UDivider class="my-6" />
          </div>
          <div
            :style="hasCatalog ? { gridTemplateColumns: 'auto 250px' } : { gridAutoColumns: 'auto' }"
            class="text-left lg:grid lg:gap-8"
          >
            <MdPreview
              :editor-id="id" :md-heading-id="mdHeadingId" :model-value="article?.content" :on-get-catalog="handleOnGetCatalog"
              :show-code-row-number="true" :theme="theme" class="preview" preview-theme="github"
            />
            <Transition name="right">
              <div v-if="hasCatalog" class="catalog relative mt-[60px]">
                <ClientOnly>
                  <MdCatalog
                    :editor-id="id" :md-heading-id="mdHeadingId" :offset-top="90" :scroll-element="scrollElement"
                    :scroll-element-offset-top="80"
                  />
                </ClientOnly>
              </div>
            </Transition>
          </div>
          <MyGiscus
            :theme="theme" category="Announcements" category-id="DIC_kwDOKsLYcc4CbAW9" class="mt-4 py-4"
            crossorigin="anonymous" emit-metadata="0" input-position="top" lang="en"
            mapping="pathname" reactions-enabled="1" repo="lnbiuc/blog-next-view" repo-id="R_kgDOKsLYcQ" strict="1"
            term="Welcome to @giscus/vue component!"
          />
        </div>
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>

<style scoped>
.catalog {
  position: sticky;
  top: 80px;
  overflow: auto;
  height: auto;
  max-height: calc(100vh - 95px);
}

.md-editor-dark,
.md-editor {
  --md-bk-color: transparent !important;
}
/* 使用 :deep() 替换 >>> */
:deep(.preview) ul {
  list-style-type: disc; /* 默认值，圆点 */
}

:deep(.preview) ol {
  list-style-type: decimal; /* 默认值，数字 */
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
