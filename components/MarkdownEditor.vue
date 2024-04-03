<script lang="ts" setup>
import { Codemirror } from 'vue-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { markdown } from '@codemirror/lang-markdown'
import { shallowRef } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { githubLight } from '@uiw/codemirror-theme-github';
import { useUserStore } from '~/store/UserStore'
import { EditorView } from '@codemirror/view'



let extensions: any[] = [markdown(), EditorView.lineWrapping]

const color = useColorMode()

if (color.preference === 'light') {
  extensions.push(githubLight)
} else {
  extensions.push(oneDark)
}

// Codemirror EditorView instance ref
const view = shallowRef()
const handleReady = (payload: any) => {
  view.value = payload.view
}

const getCurrentCursor = () => {
  const state = view.value.state
  const ranges = state.selection.ranges

  return ranges[0].anchor
}

const content = ref<string>('')

const emit = defineEmits<{
  change: [value: string]
}>()

const props = defineProps({
  input: {
    type: String,
  }
})

if (props.input) {
  content.value = props.input
}

watchDebounced(
  content,
  () => { emit('change', content.value) },
  { debounce: 1000, maxWait: 3000 },
)

function handlePaste(event: ClipboardEvent) {

  if (event.clipboardData) {
    const items = (event.clipboardData).items
    for (const item of items) {
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        const file = item.getAsFile()
        if (file) {
          uploadImage(file)
          // 阻止默认粘贴行为
          event.preventDefault()
          return
        }
      }
    }
  }
}

const { getToken } = useUserStore()

const toast = useToast()

async function uploadImage(file: File) {
  toast.add({ title: `start upload ${file.name}` })

  const formData = new FormData()
  formData.append('file', file)
  console.log(file)
  const { data, status } = await useFetch('/api/upload', {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': getToken()
    }
  })

  if (status.value === 'success') {
    if (data.value) {

      const length = content.value.replace(/\\n/g, '\n')
      const cursor = getCurrentCursor()
      const imageString = `\n![${file.name}](${data.value})\n`

      if (cursor <= length) {
        function insertString(originalString: string, insertString: string, index: number) {
          return originalString.slice(0, index) + insertString + originalString.slice(index);
        }

        insertString(content.value, imageString, cursor)
      } else {
        content.value = content.value + imageString
      }

      emit('change', content.value)

      toast.add({ title: `upload ${file.name} success` })
    }
  }

  if (status.value === 'error') {
    toast.add({ title: `upload ${file.name} failed`, description: data.value as string })
  }
}

onMounted(() => {
  document.addEventListener('paste', handlePaste)
})

onBeforeUnmount(() => {
  document.removeEventListener('paste', handlePaste)
})
</script>

<template>
  <codemirror v-model="content" placeholder="" :style="{ minHeight: '1000px', fontSize: '1.05rem' }" :autofocus="true"
    :indent-with-tab="true" :tab-size="2" :extensions="extensions" @ready="handleReady" />
</template>
