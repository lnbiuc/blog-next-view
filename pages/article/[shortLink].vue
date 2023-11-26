<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { MdCatalog, MdPreview } from 'md-editor-v3'
import { getArticleByShortLink } from '../../server/api/article'
import type { ArticleWithContent } from '../../server/types/article'
import 'md-editor-v3/lib/preview.css'
import MyGiscus from '~/components/Giscus/MyGiscus.vue'
import { formatTime } from '~/composables/formatTime'

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
  })
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
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <NuxtLayout name="home">
        <div class="flex flex-col text-left">
          <img v-if="article?.cover[0]" :src="article?.cover[0]" alt="cover" class="aspect-[2.5/1] w-full rounded-lg object-cover">
          <div class="my-6 text-4xl font-bold">
            {{ article?.title }}
          </div>
          <div class="mb-1">
            {{ article?.description }}
          </div>
          <div>
            Last updated: {{ formatTime(article?.updatedAt) }}
          </div>
          <div class="mt-4 flex flex-row items-center justify-start text-violet">
            <span>{{ article?.views }} views</span>
          </div>
          <UDivider class="my-6" />
        </div>
        <div class="text-left lg:grid lg:grid-cols-[auto,250px] lg:gap-8">
          <MdPreview class="preview" :editor-id="id" :model-value="article?.content" :theme="theme" :show-code-row-number="true" preview-theme="github" />
          <div class="catalog relative">
            <ClientOnly>
              <MdCatalog :editor-id="id" :scroll-element-offset-top="20" :scroll-element="scrollElement" class="max-h-[100vh]" />
            </ClientOnly>
          </div>
        </div>
        <MyGiscus
          class="mt-4 py-4"
          repo="lnbiuc/blog-next-view"
          repo-id="R_kgDOKsLYcQ"
          category="Announcements"
          category-id="DIC_kwDOKsLYcc4CbAW9"
          mapping="pathname"
          term="Welcome to @giscus/vue component!"
          strict="1"
          reactions-enabled="1"
          emit-metadata="0"
          input-position="top"
          :theme="color.preference"
          lang="en"
          crossorigin="anonymous"
        />
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
.md-editor-dark, .md-editor {
  --md-bk-color: transparent !important;
}

.preview >>> ul {
  list-style-type: disc; /* 默认值，圆点 */
}

.preview >>> ol {
  list-style-type: decimal; /* 默认值，数字 */
}
</style>
