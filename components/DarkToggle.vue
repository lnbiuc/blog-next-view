<script setup lang="ts">
const color = useColorMode()

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#E6EDF3',
  }],
})

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}

color.value = 'dark'
</script>

<template>
  <button class="!outline-none" @click="toggleDark">
    <div class="i-ri:sun-foggy-fill dark:i-ri:moon-foggy-fill" />
  </button>
</template>
