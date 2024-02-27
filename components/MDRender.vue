<script setup lang="ts">
import { useClipboard, useMouse, useTextSelection } from '@vueuse/core'

import {render} from '~/utils/markdown-render'

const props = defineProps({
  html: {
    type: String,
    required: false,
    default: '',
  },
  source: {
    type: String,
    required: false,
  }
})

const emit = defineEmits(['renderFinished'])

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

const sourceCopy = ref(state.text.value)

watch(() => state.text.value, (val) => {
  if (val !== '')
    sourceCopy.value = val
})

const { copy, isSupported } = useClipboard({ source: sourceCopy })

function copySelection() {
  copy()
  toast.add({ title: 'Copied', description: sourceCopy.value, timeout: 3000, icon: 'i-heroicons-check-circle text-violet' })
  openPop.value = false
}

const renderRes = ref()

onMounted(async() => {
  document.querySelectorAll('.markdown-it-code-copy').forEach((btn) => {
    btn.addEventListener('click', () => {
      toast.add({ title: 'Copied', timeout: 1000, icon: 'i-heroicons-check-circle text-violet' })
    })
  })

  if (props.source) {
    const start = performance.now()
    renderRes.value = await render(props.source)
    const end = performance.now()
    const roundedStart = Math.round(start);
    const roundedEnd = Math.round(end);
    const roundedDuration = roundedEnd - roundedStart;
    emit('renderFinished', renderRes.value, roundedDuration)
    console.log(renderRes.value)
  }
})
</script>

<template>
  <div id="violetMD" class="violet-prose mb-20 mt-5 text-left" @mouseup="checkSelection">
    <div v-if="$props.html" v-html="$props.html"/>
    <div v-else v-html="renderRes"/>
    <div v-if="isSupported">
      <div v-show="openPop"
        class="backdrop-blur-md popover rounded text-gray-600 shadow ring-[#ccc] ring-inset flex flex-row absolute h-30px w-50px cursor-pointer justify-center items-center transition-all ring-1 dark:text-gray-400 dark:ring-[#333] active:scale-95 hover:scale-105"
        @click="copySelection">
        Copy
      </div>
    </div>
  </div>
</template>
