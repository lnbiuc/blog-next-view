<script setup lang="ts">
const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.back()
  }, 3000)
})

useSeoMeta({
  title: '404 NotFound | 薇尔薇',
  ogTitle: '404 NotFound | 薇尔薇',
  description: '薇尔薇 is A Web Developer. Code for Fun.',
  ogDescription: '薇尔薇 is A Web Developer. Code for Fun.',
})

const colorModel = useColorMode()

defineOgImage({
  component: 'NuxtSeo',
  props: {
    title: '404 NotFound | 薇尔薇',
    description: '薇尔薇 is A Web Developer. Code for Fun.',
    theme: '#a78bfa',
    colorMode: () => colorModel.preference === 'dark' ? 'dark' : 'light',
  },
})
</script>

<template>
  <NuxtLayout name="default">
    <main p="x4 y10" text="center teal-700 dark:gray-200 min-h-[80vh]">
      <div text-4xl>
        <div i-carbon-warning inline-block />
      </div>
      <div>Not found</div>
      <div>
        <button text-sm btn m="3 t8" @click="router.back()">
          Back
        </button>
      </div>
    </main>
  </NuxtLayout>
</template>
