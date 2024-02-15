<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import type { IArticle } from '~/server/types'
import { useArticleStore } from '~/store/ArticleStore'
import { formatTime } from '~/composables/formatTime'

definePageMeta({
  layout: 'empty',
  colorMode: 'dark',
})

const route = useRoute()
const article = ref<IArticle>()

// @ts-expect-error no error
const shortLink = route.params.shortLink as string

const { one } = useArticleStore()

one(shortLink).then((data) => {
  article.value = data
})

onMounted(() => {
  // hidden header
  const headers = document.querySelectorAll('.header-hidden-sign')

  headers?.forEach(header => {
    if (header) {
      // @ts-expect-error no error
      header.style.display = 'none'
    }
  })

  const footer: HTMLElement | null = document.getElementById('footer')
  if (footer)
    footer.style.display = 'none'
})
</script>

<template>
  <div
    class="object-cover px-15 py-20 flex flex-col absolute h-[100vh] w-[100vw] justify-between left-0 top-[-60px] z-0 z-10">
    <div class="flex flex-row justify-between">
      <div class="text-[4rem] text-white font-700 text-shadow-xl">
        {{ `${article?.title}` }}
      </div>
      <div>
        <img src="/favicon.ico" alt="logo" class="w-60 h-60 object-cover mx-10" />
      </div>
    </div>
    <div class="flex flex-col">
      <div class="text-3xl text-white font-500 leading-15 text-shadow-md">
        {{ `${article?.description}` }}
      </div>

      <div class="mt-10 text-4xl text-white flex flex-row justify-end items-end">
        <div class="i-carbon-view mr-2 text-violet" />
        <div class="text-shadow">
          {{ article?.views }} views
        </div>
        <div class="i-carbon-alarm mx-2 scale-110 text-violet" />
        <div class="text-shadow">
          Posted in {{ formatTime(article?.updatedAt) }}
        </div>
      </div>
    </div>
  </div>
</template>
