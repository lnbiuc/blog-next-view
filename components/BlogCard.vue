<script setup lang="ts">
import { ref } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import type { IArticle } from '~/server/types'
import { useArticleStore } from '~/store/ArticleStore'
import { formatTime } from '~/composables/formatTime'

const props = defineProps({
  article: {
    type: Object as PropType<IArticle>,
    required: true,
  },
})

const article = ref<IArticle>()

const { one } = useArticleStore()

const preloadArticle = useThrottleFn(() => {
  one(props.article.shortLink).then((data) => {
    article.value = data
  })
}, 1000)
</script>

<template>
  <NuxtLink :to="`/article/${props.article.shortLink}`" :prefetch="true" @mouseover="preloadArticle()">
    <div class="backdrop-blur-sm overflow-hidden card-border h-full card">
      <div class="relative overflow-hidden">
        <img :src="`${props.article.cover}/comporess1600x900`" alt="cover"
          class="object-cover rounded-tl-md rounded-tr-md shadow h-48 w-full z-0 transform p-2px">
        <div class="p-1 text-right absolute bottom-0 right-0">
          <UBadge v-for="t in props.article.tags" :key="t" color="gray" variant="solid" class="ml-2 opacity-90"
            :tag="t">
            {{ t }}
          </UBadge>
        </div>
      </div>

      <div class="p-4 text-left h-full">
        <div class="text-xl font-bold">
          {{ props.article.title }}
        </div>
        <div class="my-2 flex flex-row items-center">
          <div class="text-violet">
            {{ props.article.views }} views
          </div>
          <div class="mx-2">/</div>
          <div class="font-bold text-violet">
            {{ formatTime(props.article.createdAt) }}
          </div>
        </div>
        <div class="mt-2 text-sm">
          {{ props.article.description }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
