<script lang="ts" setup>
import type { IArticle } from '~/server/types'
import { useArticleStore } from '~/store/ArticleStore'

const projects: Ref<IArticle[]> = ref([])

const { category } = useArticleStore()

category('project').then((data) => {
  data.forEach((project) => {
    projects.value.push(project)
  })
})

useSeoMeta({
  title: 'Project | 薇尔薇',
  ogTitle: 'Project | 薇尔薇',
  description: '薇尔薇 is A Web Developer. Code for Fun.',
  ogDescription: '薇尔薇 is A Web Developer. Code for Fun.',
})

const colorModel = useColorMode()

defineOgImage({
  component: 'NuxtSeo',
  props: {
    title: 'Project | 薇尔薇',
    description: '薇尔薇 is A Web Developer. Code for Fun.',
    theme: '#a78bfa',
    colorMode: () => colorModel.preference === 'dark' ? 'dark' : 'light',
  },
})

useHead({
  htmlAttrs: {
    lang: 'zh_CN',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.ico',
    },
  ],
})
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <NuxtLayout name="home">
        <div class="flex flex-row">
          <div class="text-left w-full">
            <h1 class="text-5xl text-violet font-bold">
              Project
            </h1>
            <div class="py-4">
              <span>
                My projects and interesting projects that I deploy.
              </span>
            </div>
          </div>
        </div>
        <ProjectCards :articles="projects" />
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>
