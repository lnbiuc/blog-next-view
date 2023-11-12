<script setup lang="ts">
const props = defineProps({
  name: String,
})
</script>

<template>
  <div class="mr-4 transform border-[1px] border-[#30363d] rounded-[4px] px-3 py-2 transition-transform duration-150 hover:scale-105 hover:cursor-default">
    {{ props.name }}
  </div>
</template>
