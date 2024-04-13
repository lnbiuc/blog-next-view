<script setup lang="ts">
import MyGiscus from '~/components/Giscus'

const colorMode = useColorMode()

const theme = computed(() => {
  return colorMode.value === 'dark' ? 'transparent_dark' : 'light_tritanopia'
})
</script>

<template>
  <ClientOnly>
    <MyGiscus :theme="theme" category="Announcements" category-id="DIC_kwDOKsLYcc4CbAW9" class="py-4 pt-4"
      crossorigin="anonymous" emit-metadata="0" input-position="bottom" lang="en" mapping="pathname"
      reactions-enabled="1" repo="lnbiuc/blog-next-view" repo-id="R_kgDOKsLYcQ" strict="1"
      term="Welcome to @giscus/vue component!" />
  </ClientOnly>
</template>
