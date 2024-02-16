<script setup lang="ts">
const route = useRoute()

// @ts-expect-error no-error
const shortLink = route.params.shortLink as string
</script>

<template>
  <div>
    <AdminEditorArticle v-if="shortLink" :short-link="shortLink" />
  </div>
</template>
