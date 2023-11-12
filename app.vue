<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <Header />
  <NuxtLayout name="default">
    <template #main>
      <NuxtPage />
    </template>
  </NuxtLayout>
  <Footer />
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #0E1111;
  color: white;
}
</style>
