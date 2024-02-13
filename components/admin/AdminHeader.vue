<script setup>
const links = [{
  label: 'Publish',
  icon: 'i-heroicons-home',
  to: '/violet',
}, {
  label: 'Articles',
  icon: 'i-heroicons-command-line',
  to: '/violet/articles',
}, {
  label: 'Friends',
  icon: 'i-heroicons-chart-bar',
  to: '/violet/friends',
}]
</script>

<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>
