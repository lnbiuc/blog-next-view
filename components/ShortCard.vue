<script setup lang="ts">
import { ref } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import type { IArticle } from '~/server/types'
import { useArticleStore } from '~/store/ArticleStore'

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
  <div
    class="card-bg-filter card-border"
    @click="$router.push(`/article/${props.article.shortLink}`)"
    @mouseover="preloadArticle()"
  >
    <div class="p-4 text-left">
      <div class="text-lg font-bold">
        {{ props.article.title }}
      </div>
      <div class="mt-2">
        <UBadge
          v-for="t in props.article.tags" :key="t" color="gray" variant="solid" class="my-1 mr-2 opacity-90"
          :tag="t"
        >
          {{ t }}
        </UBadge>
      </div>
      <div class="mt-3 text-sm">
        {{ props.article.createdAt }}
      </div>
    </div>
  </div>
</template>
