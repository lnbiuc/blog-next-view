<script setup lang="ts">
const props = defineProps({
  link: {
    type: String,
    require: true,
  },
})

const repoInfo = ref()

onMounted(async () => {
  if (props.link) {
    const regex = /^https:\/\/github\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)$/
    const match = props.link.match(regex)
    if (match) {
      const owner = match[1]
      const repoName = match[2]
      repoInfo.value = await $fetch(`https://api.github.com/repos/${owner}/${repoName}`)
    }
  }
})
</script>

<template>
  <ClientOnly>
    <div v-if="repoInfo" class="my-4 flex flex-row w-full justify-start items-center">
      <NuxtLink
        :href="props.link" target="_blank"
        class="p-4 rounded-md flex flex-col h-36 w-full justify-between transition-all lg:w-96 md:w-96 sm:w-96 xl:w-96 card"
      >
        <div class="flex flex-row justify-start items-start w-full h-full">
          <NuxtImg :src="repoInfo.owner.avatar_url" class="rounded h-28 w-28 " />
          <div class="ml-4 flex flex-col w-full">
            <div class=" mb-2 text-xl">
              {{ repoInfo?.full_name }}
            </div>
            <div class="line-clamp-2 text-sm text-gray">
              {{ repoInfo?.description }}
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <NuxtLink v-else :href="props.link" target="_blank">
      {{ props.link }}
    </NuxtLink>
  </ClientOnly>
</template>
