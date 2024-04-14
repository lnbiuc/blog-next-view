<script lang="ts" setup>
import { Codemirror } from 'vue-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { markdown } from '@codemirror/lang-markdown'
import { shallowRef } from 'vue'
import { useClipboard, watchDebounced } from '@vueuse/core'
import { githubLight } from '@uiw/codemirror-theme-github'
import { EditorView } from '@codemirror/view'
import { useUserStore } from '~/store/UserStore'

const props = defineProps({
  input: {
    type: String,
  },
})

const emit = defineEmits<{
  change: [value: string]
}>()

const extensions: any[] = [markdown(), EditorView.lineWrapping]

const color = useColorMode()

if (color.preference === 'light')
  extensions.push(githubLight)
else
  extensions.push(oneDark)

// Codemirror EditorView instance ref
const view = shallowRef()

function handleReady(payload: any) {
  view.value = payload.view
}

const content = ref<string>('')

if (props.input)
  content.value = props.input

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
  const { data, status } = await useFetch('/api/upload', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: getToken(),
    },
  })

  if (status.value === 'success') {
    if (data.value) {
      const imageString = `\n![${file.name}](${data.value})\n`

      handleCopy(imageString)

      emit('change', content.value)

      toast.add({ title: `upload ${file.name} success, Link copied.`, description: imageString })
    }
  }

  if (status.value === 'error')
    toast.add({ title: `upload ${file.name} failed`, description: data.value as string })
}

function handleCopy(text: string) {
  const sourceCopy = ref(text)

  const { copy, isSupported } = useClipboard({ source: sourceCopy })

  if (isSupported) {
    copy()
    toast.add({ title: 'Copied', description: sourceCopy.value, timeout: 3000, icon: 'i-heroicons-check-circle text-violet' })
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
  <Codemirror
    v-model="content" placeholder="" :style="{ minHeight: '1000px', fontSize: '1.05rem' }" :autofocus="true"
    :indent-with-tab="true" :tab-size="2" :extensions="extensions" @ready="handleReady"
  />
</template>
