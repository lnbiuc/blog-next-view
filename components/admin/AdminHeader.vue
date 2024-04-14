<script setup lang="ts">
import { useUserStore } from '~/store/UserStore'

const { logout } = useUserStore()

const links = [[{
  label: 'Publish',
  icon: 'i-ri:edit-fill',
  to: '/violet/publish',
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
  click: () => {
    logout()
  },
}]]
</script>

<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>
