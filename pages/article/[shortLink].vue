<script setup lang="ts">
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
const { shortLink }: RouteParams = route.params as RouteParams

const article = ref<ArticleWithContent>()

const id = 'preview-only'

const color = useColorMode()

function getArticle() {
  if (!shortLink)
    return
  getArticleByShortLink(shortLink).then((res) => {
    article.value = res.data.value?.data as ArticleWithContent
  }
  )
}
getArticle()

const theme = ref<'light' | 'dark'>()

let scrollElement: string | HTMLElement | undefined

watchEffect(() => {
  theme.value = color.value === 'light' ? 'light' : 'dark'
})

onMounted(() => {
  scrollElement = document.documentElement
  const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
  theme.value = mediaQueryList.matches ? 'dark' : 'light'
})

const mdHeadingId = (_text: any, _level: any, index: number) => `heading-${index}`

const hasCatalog = ref(false)

function handleOnGetCatalog(catalog: HeadList[]) {
  console.log(catalog)
  if (catalog && catalog.length > 0)
    hasCatalog.value = true
}

</script>

<template>
  <div>

    <Head>
      <Meta name="keywords"
        :content="article?.tags?.join(',') || 'Violet, Blog, Vue, Nuxt, TypeScript, JavaScript, Node.js, Web, Frontend, Backend, Fullstack, Developer, Programmer, Engineer, Software, Software Engineer, Software Developer, Software Programmer, Software Engineer, Software Developer'" />
      <Meta property="og:title" :content="article?.title || 'Violet\'s Blog'" />
      <Meta property="og:description" :content="article?.description || 'A blog for sharing knowledge test'" />
      <Meta property="og:image" :content="article?.cover[0] || 'https://vio.vin/favicon.ico'" />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:creator" content="@lnbiuc" />
      <Meta name="twitter:title" :content="article?.title || 'Violet\'s Blog'" />
      <Meta name="twitter:description" :content="article?.description || 'A blog for sharing knowledge test'" />
      <Meta name="twitter:image" :content="article?.cover[0] || 'https://vio.vin/favicon.ico'" />
    </Head>
    <NuxtLayout name="default">
      <NuxtLayout name="home">
        <div v-if="article">
          <div class="flex flex-col text-left">
            <Transition name="fade">
              <img v-if="article?.cover[0]" :src="article?.cover[0]" alt="cover"
                class="aspect-[2.5/1] w-full rounded-lg object-cover z-10">
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
          <div class="text-left lg:grid lg:gap-8"
            :style="hasCatalog ? { gridTemplateColumns: 'auto 250px' } : { gridAutoColumns: 'auto' }">
            <MdPreview :on-get-catalog="handleOnGetCatalog" :theme="theme" :md-heading-id="mdHeadingId" class="preview"
              :editor-id="id" :model-value="article?.content" :show-code-row-number="true" preview-theme="github" />
            <Transition name="right">
              <div class="catalog relative" v-if="hasCatalog">
                <ClientOnly>
                  <MdCatalog :md-heading-id="mdHeadingId" :editor-id="id" :scroll-element-offset-top="20"
                    :scroll-element="scrollElement" class="max-h-[100vh]" />
                </ClientOnly>
              </div>
            </Transition>
          </div>
          <MyGiscus class="mt-4 py-4" repo="lnbiuc/blog-next-view" repo-id="R_kgDOKsLYcQ" category="Announcements"
            category-id="DIC_kwDOKsLYcc4CbAW9" mapping="pathname" term="Welcome to @giscus/vue component!" strict="1"
            reactions-enabled="1" emit-metadata="0" input-position="top" :theme="theme" lang="en"
            crossorigin="anonymous" />
        </div>
        <div v-else class="center">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </div>
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>

<style scoped>
.catalog {
  position: sticky;
  top: 10px;
  overflow: auto;
  height: auto;
  max-height: calc(100vh - 50px);
}

.md-editor-dark,
.md-editor {
  --md-bk-color: transparent !important;
}

.preview>>>ul {
  list-style-type: disc;
  /* 默认值，圆点 */
}

.preview>>>ol {
  list-style-type: decimal;
  /* 默认值，数字 */
}

.spinner {
  animation: spin 2000ms;
  animation-iteration-count: infinite;
}

bodY {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.center {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wave {
  width: 5px;
  height: 100px;
  background: linear-gradient(45deg, rgb(106, 103, 206), #8a2be2);
  margin: 10px;
  animation: wave 1s linear infinite;
  border-radius: 20px;
}

.wave:nth-child(2) {
  animation-delay: 0.1s;
}

.wave:nth-child(3) {
  animation-delay: 0.2s;
}

.wave:nth-child(4) {
  animation-delay: 0.3s;
}

.wave:nth-child(5) {
  animation-delay: 0.4s;
}

.wave:nth-child(6) {
  animation-delay: 0.5s;
}

.wave:nth-child(7) {
  animation-delay: 0.6s;
}

.wave:nth-child(8) {
  animation-delay: 0.7s;
}

.wave:nth-child(9) {
  animation-delay: 0.8s;
}

.wave:nth-child(10) {
  animation-delay: 0.9s;
}

@keyframes wave {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}
</style>
