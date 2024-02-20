<script setup lang="ts">
import { useClipboard, useMouse, useTextSelection } from '@vueuse/core'
import { render } from '~/composables/markdownIt'

import '~/styles/markdown.css'
import '~/styles/prose.css'

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['renderFinished'])

// const result = ref<string>('')

const result = await render(props.source)

emit('renderFinished')

const openPop = ref<boolean>(false)

const { x, y } = useMouse({ touch: false })

function checkSelection() {
  const selection = window.getSelection()
  if (selection && selection.toString()) {
    // 文字被选中
    openPop.value = true
    const pop = document.querySelector('.popover') as HTMLElement
    if (pop) {
      pop.style.left = `${x.value - 20}px`
      pop.style.top = `${y.value - 100}px`
    }
  }
  else {
    // 没有文字被选中
    openPop.value = false
  }
}

const toast = useToast()
const state = useTextSelection()

const source = ref(state.text.value)

watch(() => state.text.value, (val) => {
  if (val !== '')
    source.value = val
})

const { copy, isSupported } = useClipboard({ source })

function copySelection() {
  copy()
  toast.add({ title: 'Copied', description: source.value, timeout: 3000, icon: 'i-heroicons-check-circle text-violet' })
  openPop.value = false
}

onMounted(() => {
  document.querySelectorAll('.markdown-it-code-copy').forEach((btn) => {
    btn.addEventListener('click', () => {
      toast.add({ title: 'Copied', timeout: 1000, icon: 'i-heroicons-check-circle text-violet' })
    })
  })
})
</script>

<template>
  <div id="violetMD" class="violet-prose mb-20 mt-5 text-left">
    <!-- <NuxtMarkdown /> -->
    <article @mouseup="checkSelection" v-html="result" />
    <div v-if="isSupported">
      <div v-show="openPop"
        class="backdrop-blur-md popover rounded text-gray-600 shadow ring-[#ccc] ring-inset flex flex-row absolute h-30px w-50px cursor-pointer justify-center items-center transition-all ring-1 dark:text-gray-400 dark:ring-[#333] active:scale-95 hover:scale-105"
        @click="copySelection">
        Copy
      </div>
    </div>
  </div>
</template>
