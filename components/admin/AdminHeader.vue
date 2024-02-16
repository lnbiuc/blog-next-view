<script setup lang="ts">
import { useUserStore } from '~/store/UserStore'

const links = [[{
  label: 'Publish',
  icon: 'i-ri:edit-fill',
  to: '/violet',
}, {
  label: 'Articles',
  icon: 'i-ri:article-fill',
  to: '/violet/articles',
}, {
  label: 'Friends',
  icon: 'i-ri:account-pin-circle-fill',
  to: '/violet/friends',
}], [{
  label: 'Logout',
  icon: 'i-ri:logout-circle-line',
  to: '/',
}]]

const { logout } = useUserStore()

function handleClick(path: string) {
  if (path === '/') {
    localStorage.removeItem('user')
    logout()
  }
}
</script>

<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800">
    <template #default="{ link }">
      <span class="group-hover:text-primary relative" @click="handleClick(link.to)">{{ link.label }}</span>
    </template>
  </UHorizontalNavigation>
</template>
