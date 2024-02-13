<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import type { IArticle } from '~/server/types'
import { useArticleStore } from '~/store/ArticleStore'

definePageMeta({
  layout: 'empty',
})

const route = useRoute()
const article = ref<IArticle>()

const shortLink = route.params.shortLink as string

const { one } = useArticleStore()

one(shortLink).then((data) => {
  article.value = data
})

onMounted(() => {
  // hidden header
  const header: HTMLElement | null = document.getElementById('header')
  if (header)
    header.style.display = 'none'

  const footer: HTMLElement | null = document.getElementById('footer')
  if (footer)
    footer.style.display = 'none'
})
</script>

<template>
  <div class="object-cover bg-gradient-to-r from-violet-500 to-fuchsia-500 px-15 py-20 flex flex-col absolute h-[100vh] w-[100vw] justify-between left-0 top-[-60px] z-0 z-10">
    <div class="text-[4rem] text-white font-700 text-shadow-xl">
      {{ `${article?.title}` }}
    </div>
    <div class="flex flex-col">
      <div class="text-4xl text-white font-500 leading-15 text-shadow-md">
        {{ `${article?.description}` }}
      </div>

      <div class="mt-10 text-4xl text-white flex flex-row justify-end items-end">
        <div class="i-carbon-view mr-2" />
        <div class="text-shadow">
          {{ article?.views }} views
        </div>
        <div class="i-carbon-alarm mx-2 scale-110" />
        <div class="text-shadow">
          Posted in {{ article?.updatedAt }}
        </div>
      </div>
    </div>
  </div>
</template>
