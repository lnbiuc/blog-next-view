<script setup lang="ts">
import { useUserStore } from '~/store/UserStore'

const { hasAuth } = useUserStore()

const router = useRouter()

onMounted(() => {
  if (!hasAuth())
    router.push('/violet/login')
})
</script>

<template>
  <div>
    <NuxtLayout name="admin" />
    <AdminEditorArticle />
  </div>
</template>
