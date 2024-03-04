<script setup lang="ts">
useSeoMeta({
  title: 'Admin | 薇尔薇',
  ogTitle: 'Admin | 薇尔薇',
  description: '薇尔薇 is A Web Developer. Code for Fun.',
  ogDescription: '薇尔薇 is A Web Developer. Code for Fun.',
})
</script>

<template>
  <div>
    <NuxtLayout name="admin-home">
      <AdminHeader />
    </NuxtLayout>
    <RouterView />
  </div>
</template>
