<script setup lang="ts">
definePageMeta({
  middleware: [
    'auth',
  ],
});
</script>

<template>
  <div>
    <AdminEditorArticle />
  </div>
</template>
