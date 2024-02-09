<script setup lang="ts">
import type { Friend } from '~/server/types/friend'

const props = defineProps({
  friend: {
    type: Object as PropType<Friend>,
    required: true,
  },
})

function openLink() {
  window.open(props.friend.url, '_blank')
}
</script>

<template>
  <div
    class="card-bg-filter overflow-hidden card-border"
    @click="openLink"
  >
    <div class="relative overflow-hidden">
      <img :src="props.friend.screenShot" alt="cover" class="object-cover p-2px rounded-tl-md rounded-tr-md shadow h-48 w-full z-0 transform">
    </div>
    <div class="m-2 flex flex-row">
      <div class="max-w-150px items-start">
        <img :src="props.friend.avatar" alt="avatar" class="object-cover h-15 w-full z-0 transform">
      </div>
      <div class="ml-2 flex flex-col justify-center">
        <div class="text-xl font-bold text-left">
          {{ props.friend.title }}
        </div>
        <div class="text-sm text-gray-600 text-left dark:text-gray-400">
          {{ props.friend.bio }}
        </div>
      </div>
    </div>
  </div>
</template>
