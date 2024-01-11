<script lang="ts" setup>
withDefaults(defineProps<{ title?: string; backgroundColor?: string }>(), {
  title: 'Hello World',
  backgroundColor: 'bg-green-500',
});
</script>
<template>
  <div
      :class="[backgroundColor || 'bg-green-500']"
      class="w-full h-full flex text-white items-center justify-center"
  >
    <h1>{{ title || 'Hello World' }}</h1>
  </div>
</template>
<style scoped>
h1 {
  color: red;
  font-size: 70px;
}
</style>