<script setup lang="ts">
import { render } from '~/utils/markdown-render'

const props = defineProps({
  html: {
    type: String,
    required: false,
    default: '',
  },
  source: {
    type: String,
    required: false,
  },
})

const emit = defineEmits(['renderFinished'])

const renderRes = ref()

onMounted(async () => {
  if (props.source) {
    const start = performance.now()
    renderRes.value = await render(props.source)
    const end = performance.now()
    const roundedStart = Math.round(start)
    const roundedEnd = Math.round(end)
    const roundedDuration = roundedEnd - roundedStart
    emit('renderFinished', renderRes.value, roundedDuration)
  }
})
</script>

<template>
  <div id="violetMD" class="violet-prose mb-20 mt-5 font-serif text-left">
    <div v-if="$props.html" v-html="$props.html" />
    <div v-else v-html="renderRes" />
  </div>
</template>
