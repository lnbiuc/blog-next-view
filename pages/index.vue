<script lang="ts" setup>
import type { IArticle } from '~/server/types'
import { useArticleStore } from '~/store/ArticleStore'

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
      href: '/favicon.ico',
    },
  ],
})

const articles: Ref<IArticle[]> = ref([])
const shorts: Ref<IArticle[]> = ref([])
const projects: Ref<IArticle[]> = ref([])

const { getAll, category } = useArticleStore()

getAll().then(() => {
  category('article').then((data) => {
    data.forEach((article) => {
      articles.value.push(article)
    })
  })

  category('short').then((data) => {
    data.forEach((short) => {
      shorts.value.push(short)
    })
  })

  category('project').then((data) => {
    data.forEach((project) => {
      projects.value.push(project)
    })
  })
})
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <!-- <IndexIGImage /> -->
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
          <div v-if="articles.length > 3" id="featured">
            <div class="title-font">
              Featured Article
            </div>
            <BlogCards :articles="articles.slice(0, 6)" />
            <div class="title-btn">
              <MyButton @click="$router.push('/blog')">
                See More
                <div class="i-ri:arrow-right-line ml-2 mt-[2px] text-violet" />
              </MyButton>
            </div>
          </div>
          <div v-if="shorts.length > 3">
            <div class="title-font">
              Featured Short
            </div>
            <ShortCards :articles="shorts.slice(0, 6)" />
            <div class="title-btn">
              <MyButton @click="$router.push('/shorts')">
                See More
                <div class="i-ri:arrow-right-line ml-2 mt-[2px] text-violet" />
              </MyButton>
            </div>
          </div>
          <div v-if="projects.length > 1">
            <div class="title-font">
              Featured Project
            </div>
            <ProjectCards :articles="projects.slice(0, 3)" />
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
