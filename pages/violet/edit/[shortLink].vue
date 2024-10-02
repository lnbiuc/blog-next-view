<script setup lang="ts">
import EditorArticle from '~/components/admin/EditorArticle.vue'

const route = useRoute()

// @ts-expect-error no-error
const shortLink = route.params.shortLink as string

definePageMeta({
  keepalive: false,
})
</script>

<template>
  <div>
    <!-- {{ shortLink }} -->
    <EditorArticle :short-link="shortLink" />
  </div>
</template>
