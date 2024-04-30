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
    class="backdrop-blur-sm card-bg-filter card-border overflow-hidden card"
    @click="openLink"
  >
    <div class="relative overflow-hidden">
      <img
        :src="props.friend.screenShot" alt="cover"
        class="object-cover p-2px rounded-tl-md rounded-tr-md shadow h-48 w-full z-0 transform"
      >
    </div>
    <div class="m-2 flex flex-row">
      <UAvatar
        :src="props.friend.avatar"
        size="2xl"
        alt="Avatar"
      />
      <!-- <div class="items-start w-15">
        <img :src="props.friend.avatar" alt="avatar" class="object-cover rounded z-0 transform w-15">
      </div> -->
      <div class="ml-2 flex flex-col justify-center">
        <div class="text-xl font-500 text-left">
          {{ props.friend.title }}
        </div>
        <div class="text-sm text-gray-600 text-left dark:text-gray-400 text-ellipsis">
          {{ props.friend.bio }}
        </div>
      </div>
    </div>
  </div>
</template>
