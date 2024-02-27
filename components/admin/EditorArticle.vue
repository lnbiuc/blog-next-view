import type articleVue from '~/layouts/article.vue';
<script setup lang="ts">
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
import type { IArticle } from '~/server/types'
import { useIntervalFn, useThrottleFn } from '@vueuse/core'
import Vditor from 'vditor';
import 'vditor/dist/index.css';

const vditor = ref<Vditor | null>(null);

const color = useColorMode()

onMounted(() => {
  vditor.value = new Vditor('vditor', {
    after: () => {
      // vditor.value is a instance of Vditor now and thus can be safely used here
      if (article.value.content) {
        vditor.value?.setValue(article.value.content.replace(/\\n/g, '\n'))
      } else {
        vditor.value?.setValue('')
      }
    },
    width: '50%',
    theme: color.value === 'dark' ? 'dark' : 'classic',
    upload: {
      // @ts-expect-error no error
      handler: async (files: File[]) => {
        const url = await uploadImage(files[0])
        vditor.value?.insertValue(`![image](${url})`)
        return url
      },
    },
    keydown: (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === 's') || (e.metaKey && e.key === 's')) {
        e.preventDefault()
        throttledPublish()
      }
    },
    mode: 'sv',
    preview: {
      mode: 'editor',
    },
    toolbar: [
      "emoji",
      "headings",
      "bold",
      "italic",
      "strike",
      "link",
      "|",
      "list",
      "ordered-list",
      "check",
      "outdent",
      "indent",
      "|",
      "quote",
      "line",
      "code",
      "inline-code",
      "insert-before",
      "insert-after",
      "|",
      "upload",
      "table",
      "|",
      "undo",
      "redo",
      "|",
      "fullscreen",
      "edit-mode",
      {
        name: "more",
        toolbar: [
          "both",
          "code-theme",
          "content-theme",
          "export",
          "outline",
          "preview",
          "devtools",
          "info",
          "help",
        ],
      },
    ],
    toolbarConfig: {
      hide: false,
      pin: false,
    },
  });

  watch(color, () => {
    vditor.value?.setTheme(color.value === 'dark' ? 'dark' : 'classic')
  })
});

const props = defineProps({
  shortLink: {
    type: String,
    required: false,
    default: undefined,
  },
})

const toast = useToast()

const article = ref<IArticle>({
  _id: undefined,
  shortLink: '',
  title: '',
  description: '',
  cover: '',
  category: '',
  tags: [],
  content: 'empty',
  authorId: '',
  status: '',
  views: 0,
  likes: 0,
  ogImage: '',
  link: '',
  createdAt: undefined,
  updatedAt: undefined,
  html: '',
})

if (props.shortLink) {
  const { data } = await useFetch(`/api/article/${props.shortLink}`, {
    method: 'PUT',
  })
  article.value = data.value as IArticle
}

onMounted(() => {
  const user = localStorage.getItem('user')
  article.value.authorId = user ? JSON.parse(user)._id : ''
})

const rules = {
  shortLink: {
    type: 'string',
    required: true,
  },
  title: {
    type: 'string',
    required: true,
  },
  category: {
    type: 'string',
    required: true,
  },
  authorId: {
    type: 'string',
    required: true,
  },
  status: {
    type: 'string',
    required: true,
  },
}

// @ts-expect-error no error
const { pass, errorFields } = useAsyncValidator(article, rules)

const metaData = [{
  label: 'meta data',
  icon: 'i-heroicons-information-circle',
  defaultOpen: false,
  content: '',
}]

const publishSetting = ref(false)

const fileCover = ref<File | null>(null)

const tags = ref<string[]>([])

const throttledPublish = useThrottleFn(() => {
  handlePublish()
}, 3000)

watchEffect(async () => {

  tags.value = []
  if (!article.value.category)
    return
  const { data } = await useFetch(`/api/tag/${article.value.category}`)

  tags.value = data.value as string[]
})

function onChangeFile(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file)
    fileCover.value = file
}

const uploading = ref(false)

async function handleUpload(option: 'cover' | 'content') {
  if (!fileCover.value)
    return

  toast.add({ title: `start upload ${fileCover.value.name}` })
  const formData = new FormData()
  formData.append('file', fileCover.value)
  uploading.value = true
  const { data, status } = await useFetch('/api/upload', {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': localStorage.getItem('token') || '',
    }
  })

  if (status.value === 'success') {
    if (data.value) {

      if (option === 'cover') {
        article.value.cover = data.value as string
      }

      if (option === 'content') {
        return data.value as string
      }
      toast.add({ title: `upload ${fileCover.value.name} success` })
    }
  }

  if (status.value === 'error') {
    console.error(data.value)
    toast.add({ title: `upload ${fileCover.value.name} failed`, description: data.value as string })
  }
  uploading.value = false
  fileCover.value = null
}

const fileInput = ref()

function handleClean() {
  fileCover.value = null
  fileInput.value = null
  article.value.cover = ''
}

async function handlePublish() {
  console.warn('publish')
  article.value.content = vditor.value?.getValue() as string
  if ((!article.value._id || article.value._id === undefined || article.value._id === null || article.value._id === '') && pass.value) {
    const { data, status, error } = await useFetch<IArticle>('/api/article/create', {
      method: 'POST',
      body: article.value,
      headers: {
        'Authorization': localStorage.getItem('token') || '',
      }
    })
    if (status.value === 'success') {
      if (data.value) {
        publishSetting.value = false
        article.value = data.value
        toast.add({ title: `publish ${data.value.title} success, article id ${data.value._id}` })
      }
    }

    if (status.value === 'error') {
      toast.add({ title: `publish failed, ${error.value}` })
    }
  }

  if (article.value._id && article.value._id !== '' && pass.value) {
    const { data, status, error } = await useFetch<IArticle>('/api/article/update', {
      method: 'PUT',
      body: article.value,
      headers: {
        'Authorization': localStorage.getItem('token') || '',
      }
    })
    if (status.value === 'success') {
      if (data.value) {
        publishSetting.value = false
        toast.add({ title: `update ${data.value.title} success, article id ${data.value._id}`, timeout: 3000 })
      }
    }

    if (status.value === 'error') {
      toast.add({ title: `update failed, ${error.value}` })
    }
  }
}

// 上传图片到服务器
async function uploadImage(file: File) {
  fileCover.value = file
  const url = await handleUpload('content')
  fileCover.value = null
  return url
}

const autoSave = ref(false)

const { pause, resume, isActive } = useIntervalFn(() => {

  if (article.value._id && article.value._id !== '' && autoSave.value) {
    // auto save
    throttledPublish()
  }
}, 30000)

watchEffect(() => {
  if (autoSave.value) {
    resume()
  } else {
    pause()
  }
})

const isPending = ref(false)

async function handleGenerateOgImage() {

  if (article.value.shortLink === '') {
    toast.add({ title: `shortLink is empty.` })
    return
  }

  if (article.value._id === undefined || article.value._id === null || article.value._id === '') {
    toast.add({ title: `article id is empty.` })
    return
  }

  const url = `https://vio.vin/og/${article.value.shortLink}`
  isPending.value = true
  const { data, error } = await useFetch<string>('/api/friend/screenshot', {
    method: 'POST',
    body: {
      url,
    },
    headers: {
      'Authorization': localStorage.getItem('token') || '',
    }
  })

  if (error.value) {
    isPending.value = false
    toast.add({ title: error.value?.message })
  }
  if (data.value) {
    isPending.value = false
    article.value.ogImage = data.value
    toast.add({ title: `gen screenShot success.` })
  }
}

const timeCost = ref(0)

function handleRenderFinished(html: string, time: number) {
  article.value.html = html
  timeCost.value = time
}
</script>

<template>
  <div>
    <NuxtLayout name="admin-home">
      <div class="mt-4 flex flex-row items-center justify-between">
        <div class="flex flex-row items-center">
          <UButton class="mr-2" @click="publishSetting = true">
            Publish Settings
          </UButton>
          <span>{{ article.shortLink }}</span>
          <span class="mx-2">/</span>
          <span>{{ article.title }}</span>
        </div>
        <div>
          <span class="mr-2">{{ timeCost }} ms</span>
          <UButton @click="autoSave = !autoSave" :color="autoSave ? 'green' : 'red'" class="mr-2">
            {{ autoSave ? 'Disable' : 'Enable' }}
          </UButton>
          <span class="mr-2">auto save status: {{ isActive ? 'Enable' : 'Disable' }}</span>
        </div>
      </div>
    </NuxtLayout>
    <div class="p-6 flex flex-row min-h-60vh w-full">
      <div id="vditor" class="w-1/2" />
      <div
        class="w-1/2 dark:border-[#333] border-[#eee] shadow-sm dark:bg-opacity-50 backdrop-blur-md border p-2 rounded">
        <MDRender :source="article.content" @render-finished="handleRenderFinished"/>
      </div>
    </div>
    <UModal v-model="publishSetting" class="z-2000">
      <div class="p-4">
        <UForm :state="article" class="space-y-4">
          <UFormGroup label="ShortLink" name="shortLink">
            <UInput v-model="article.shortLink" />
            <div v-if="errorFields?.shortLink?.length" class="text-xs text-red">
              {{ errorFields.shortLink[0].message }}
            </div>
          </UFormGroup>
          <UFormGroup label="Title" name="title">
            <UInput v-model="article.title" />
            <div v-if="errorFields?.title?.length" class="text-xs text-red">
              {{ errorFields.title[0].message }}
            </div>
          </UFormGroup>
          <UFormGroup label="Description" name="description">
            <UInput v-model="article.description" />
            <div v-if="errorFields?.description?.length" class="text-xs text-red">
              {{ errorFields.description[0].message }}
            </div>
          </UFormGroup>
          <UFormGroup label="Cover" name="cover">
            <UInput v-model="article.cover" />
            <div v-if="errorFields?.cover?.length" class="text-xs text-red">
              {{ errorFields.cover[0].message }}
            </div>
          </UFormGroup>
          <div v-if="article.cover">
            <img :src="article.cover" alt="cover" class="object-cover rounded-md shadow w-full">
          </div>
          <UFormGroup label="Upload Cover" name="file">
            <div class="flex flex-row">
              <UInput v-model="fileInput" type="file" @change="onChangeFile" class="w-full" />
              <UButton class="ml-2" @click="handleUpload('cover')" :disabled="uploading" :loading="uploading">
                upload
              </UButton>
              <UButton color="red" class="ml-2" @click="handleClean">
                clean
              </UButton>
            </div>
          </UFormGroup>
          <UFormGroup label="Category" name="category">
            <USelectMenu v-model="article.category" :options="['article', 'short', 'project']" />
            <div v-if="errorFields?.category?.length" class="text-xs text-red">
              {{ errorFields.category[0].message }}
            </div>
          </UFormGroup>
          <UFormGroup label="Tags" name="tags">
            <USelectMenu v-model="article.tags" :multiple="true" :creatable="true" :options="tags" />
            <div v-if="errorFields?.tags?.length" class="text-xs text-red">
              {{ errorFields.tags[0].message }}
            </div>
          </UFormGroup>
          <UFormGroup label="Status" name="status">
            <USelectMenu v-model="article.status" :options="['PUBLISHED', 'SAVED', 'DELETED']" />
            <div v-if="errorFields?.status?.length" class="text-xs text-red">
              {{ errorFields.status[0].message }}
            </div>
          </UFormGroup>
          <UFormGroup label="AuthorId" name="authorId">
            <UInput v-model="article.authorId" :disabled="true" />
            <div v-if="errorFields?.authorId?.length" class="text-xs text-red">
              {{ errorFields.authorId[0].message }}
            </div>
          </UFormGroup>
          <UFormGroup label="Link" name="link">
            <UInput v-model="article.link" placeholder="project require link" />
            <div v-if="errorFields?.link?.length" class="text-xs text-red">
              {{ errorFields.link[0].message }}
            </div>
          </UFormGroup>
          <UFormGroup label="Og Image" name="ogImage">
            <div class="flex flex-row w-full">
              <UInput v-model="article.ogImage" class="w-full" />
              <UButton class="ml-2" @click="handleGenerateOgImage" :loading="isPending" :disabled="isPending">
                Generate Og Image
              </UButton>
            </div>
            <div v-if="article.ogImage" class="my-4">
              <img :src="article.ogImage" alt="cover" class="object-cover rounded-md shadow w-full">
            </div>
          </UFormGroup>
          <div class="w-full">
            <UButton type="submit" color="blue" :disabled="!pass" @click="throttledPublish">
              Submit
            </UButton>
          </div>

        </UForm>
      </div>
    </UModal>
    <NuxtLayout name="home">
      <UAccordion :items="metaData" class="text-left">
        <template #item>
          <div>
            {{ article }}
          </div>
        </template>
      </UAccordion>
    </NuxtLayout>
  </div>
</template>
