<script setup lang="ts">
defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  favicon: {
    type: String,
  },
  link: {
    type: String,
  }
})
</script>

<template>
  <a
    class="backdrop-blur-sm card-bg-filter card-border overflow-hidden card cursor-pointer"
    :href="link" target="_blank"
  >
    <div class="m-2 flex flex-row">
      <UAvatar
        :src="favicon"
        size="2xl"
        alt="Avatar"
      />
      <div class="ml-2 flex flex-col justify-center">
        <div class="text-xl font-500 text-left">
          {{ title }}
        </div>
        <div class="text-sm text-gray-600 text-left dark:text-gray-400 text-ellipsis">
          {{ description }}
        </div>
      </div>
    </div>
  </a>
</template>
