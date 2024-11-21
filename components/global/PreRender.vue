<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})

const copied = ref(false)

const icon = computed(() => {
  return copied.value ? 'i-ri:file-copy-fill' : 'i-ri:file-copy-line'
})

const source = ref(props.code)

const { copy } = useClipboard({ source })

function copyCode() {
  copy(source.value)

  copied.value = true

  setTimeout(() => {
    copied.value = false
  }, 3000)
}
</script>

<template>
  <div
    v-if="props.filename"
    class="p-2 mt-4 bg-[#F8FAFC] border border-[#eee] rounded-lt-md rounded-rt-md text-center flex flex-row justify-center items-center dark:bg-[#121212] dark:border-[#181818]"
  >
    <div class="text-[#2a2a2a] dark:text-[#bbb]">
      {{ props.filename }}
    </div>
  </div>
  <div class="pre-container">
    <div class="flex flex-row relative justify-end">
      <div class="pr-2 pt-2.5 absolute">
        <UButton class="copy-button" color="white" :icon="icon" :trailing="false" size="xs" @click="copyCode">
          {{ copied ? 'Copied' : 'Copy' }}
        </UButton>
      </div>
    </div>
    <pre
      :class="$props.class + (!props.filename ? ' rounded-lt-md rounded-rt-md' : '')"
      class="border border-[#eee] rounded-lb-md rounded-rb-md whitespace-normal dark:border-[#181818]"
    >
    <slot />
  </pre>
  </div>
</template>

<style>
pre code {
  white-space: pre;
}

pre code .line {
  display: block;
}

.copy-button {
  opacity: 0;
  transition: opacity 0.3s;
  transition-delay: 3s;
}

.pre-container:hover .copy-button {
  opacity: 1;
  transition-delay: 0s;
}
</style>
