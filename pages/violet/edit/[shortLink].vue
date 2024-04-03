<script setup lang="ts">
import EditorArticle from '~/components/admin/EditorArticle.vue'

const route = useRoute()

// @ts-expect-error no-error
const shortLink = route.params.shortLink as string
</script>

<template>
  <div>
    <EditorArticle v-if="shortLink" :short-link="shortLink" />
  </div>
</template>
