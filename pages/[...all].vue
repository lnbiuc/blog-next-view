<script setup lang="ts">
const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.back()
  }, 3000)
})
</script>

<template>
  <NuxtLayout name="default">
    <main p="x4 y10" text="center teal-700 dark:gray-200">
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
