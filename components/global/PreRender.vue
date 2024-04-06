<template>
  <div v-if="props.filename"
    class="mt-4 flex flex-row justify-center items-center dark:bg-[#0e0e0e] bg-[#fafafa] text-center border-b dark:border-b-[#222] border-b-[#eee] p-2 rounded-lt rounded-rt">
    <div class="text-[#222] dark:text-[#aaa]">
      {{ props.filename }}
    </div>
  </div>
  <div class="pre-container">
  <div class="relative flex flex-row justify-end">
    <div class="absolute pt-2.5 pr-2">
      <UButton class="copy-button" color="white" :icon="icon" @click="copyCode" :trailing="false" size="xs">
        {{ copied ? 'Copied' : 'Copy' }}
      </UButton>
    </div>
  </div>
  <pre :class="$props.class + (!props.filename ? ' rounded-lt rounded-rt' : '')" class="whitespace-normal rounded-lb rounded-rb">
    <slot />
  </pre>
</div>
</template>

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
});

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
