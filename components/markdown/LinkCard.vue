<script setup lang="ts">
const props = defineProps({
  link: {
    type: String,
    require: true
  }
})

const repoInfo = ref()

onMounted(async () => {
  if (props.link) {
    const regex = /^https:\/\/github\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)$/;
    const match = props.link.match(regex);
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
    <div v-if="repoInfo" class="w-full flex flex-row items-center justify-center my-4">
      <NuxtLink :href="props.link" target="_blank"
        class="h-35 sm:w-100 md:w-100 xl:w-100 lg:w-100 w-full p-2 dark:bg-[#222] bg-[#ddd] rounded-md shadow flex flex-col justify-between">
        <div class="flex flex-row justify-start items-center">
          <div class="w-28 object-cover">
            <NuxtImg :src="repoInfo.owner.avatar_url" class="rounded" />
          </div>
          <div class="flex flex-col w-full ml-2">
            <div class="text-xl mb-2 line-clamp-1">
              {{ repoInfo?.full_name }}
            </div>
            <div class="text-sm line-clamp-2 text-gray">
              {{ repoInfo?.description }}
            </div>
          </div>
        </div>
        <div
          class="w-full text-sm mb-2 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          <div class="flex flex-row items-center text-amber">
            <div class="i-ri:star-s-fill mr-2"></div>
            <div>{{ repoInfo?.stargazers_count }}</div>
          </div>
          <div class="flex flex-row items-center text-blue justify-center">
            <div class="i-ri:git-fork-fill mr-2"></div>
            <div>{{ repoInfo?.forks_count }}</div>
          </div>
          <div class="flex flex-row items-center text-red justify-end">
            <div class="i-ri:error-warning-fill mr-2"></div>
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
