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

const { text, copy, isSupported } = useClipboard({ source })

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
    class="p-2 mt-4 bg-[#fafafa] border-b border-b-[#eee] rounded-lt rounded-rt text-center shadow flex flex-row justify-center items-center dark:bg-[#0e0e0e] dark:border-b-[#222]"
  >
    <div class="text-[#222] dark:text-[#aaa]">
      {{ props.filename }}
    </div>
  </div>
  <div class="pre-container shadow">
    <div class="flex flex-row relative justify-end">
      <div class="pr-2 pt-2.5 absolute">
        <UButton class="copy-button" color="white" :icon="icon" :trailing="false" size="xs" @click="copyCode">
          {{ copied ? 'Copied' : 'Copy' }}
        </UButton>
      </div>
    </div>
    <pre
      :class="$props.class + (!props.filename ? ' rounded-lt rounded-rt' : '')"
      class="rounded-lb rounded-rb whitespace-normal"
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
