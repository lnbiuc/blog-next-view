<script setup lang="ts">
import type { IFriend } from '~/server/types'

const props = defineProps({
  friend: {
    type: Object as PropType<IFriend>,
    required: true,
  },
})

function openLink() {
  window.open(props.friend.url, '_blank')
}
</script>

<template>
  <div
    class="card-bg-filter backdrop-blur-sm overflow-hidden card-border card"
    @click="openLink"
  >
    <div class="relative overflow-hidden">
      <img :src="props.friend.screenShot" alt="cover" class="object-cover p-2px rounded-tl-md rounded-tr-md shadow h-48 w-full z-0 transform">
    </div>
    <div class="m-2 flex flex-row">
      <div class="max-w-150px items-start">
        <img :src="props.friend.avatar" alt="avatar" class="object-cover rounded h-15 w-15 z-0 transform">
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
