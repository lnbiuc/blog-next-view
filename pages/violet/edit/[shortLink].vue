<script setup lang="ts">
const route = useRoute()

// @ts-expect-error no-error
const shortLink = route.params.shortLink as string
</script>

<template>
  <div>
    <NuxtLayout name="admin" />
    <AdminEditorArticle v-if="shortLink" :short-link="shortLink" />
  </div>
</template>
