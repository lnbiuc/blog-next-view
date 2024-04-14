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
      const res = await $fetch(`https://api.github.com/repos/${owner}/${repoName}`)
      repoInfo.value = res
    }
  }
})
</script>

<template>
  <ClientOnly>
    <div v-if="repoInfo" class="my-4 flex flex-row w-full justify-center items-center">
      <NuxtLink
        :href="props.link" target="_blank"
        class="p-4 bg-[#fafafa] rounded-md shadow flex flex-col h-35 w-full justify-between transition-all dark:bg-[#222] hover:shadow-md lg:w-100 md:w-100 sm:w-100 xl:w-100"
      >
        <div class="flex flex-row justify-start items-center">
          <div class="object-cover w-28">
            <NuxtImg :src="repoInfo.owner.avatar_url" class="rounded" />
          </div>
          <div class="ml-4 flex flex-col w-full">
            <div class="line-clamp-1 mb-2 text-xl">
              {{ repoInfo?.full_name }}
            </div>
            <div class="line-clamp-2 text-sm text-gray">
              {{ repoInfo?.description }}
            </div>
          </div>
        </div>
        <div class="px-4 mt-2.5 text-sm flex flex-row w-full justify-between">
          <div class="text-amber flex flex-row justify-start items-center">
            <div class="i-ri:star-s-fill mr-2" />
            <div>{{ repoInfo?.stargazers_count }}</div>
          </div>
          <div class="text-blue flex flex-row justify-center items-center">
            <div class="i-ri:git-fork-fill mr-2" />
            <div>{{ repoInfo?.forks_count }}</div>
          </div>
          <div class="text-red flex flex-row justify-end items-center">
            <div class="i-ri:error-warning-fill mr-2" />
            <div>{{ repoInfo?.open_issues_count }}</div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <NuxtLink v-else :href="props.link" target="_blank">
      {{ props.link }}
    </NuxtLink>
  </ClientOnly>
</template>
