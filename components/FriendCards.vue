<script setup lang="ts">
import type { IFriend } from '~/server/types'

const props = defineProps({
  friends: {
    type: Object as PropType<IFriend[]>,
    required: true,
  },
})
</script>

<template>
  <div v-auto-animate class="my-card mt-2 grid grid-cols-1 gap-4 w-full lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-3">
    <FriendCard v-for="friend in props.friends" :key="friend._id" :friend="friend" class="card" />
  </div>
</template>
