<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
})

const imageError = ref<boolean>(false)
</script>

<template>
  <div>
    <img
      v-if="!imageError"
      :src="props.src"
      :alt="props.alt"
      :width="props.width"
      :height="props.height"
      class="my-2 opacity-75 rounded transition-all hover:opacity-100 hover:shadow"
      @error="imageError = true"
    >
  </div>
</template>
