import type articleVue from '~/layouts/article.vue';
<script setup lang="ts">
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
import { useThrottleFn } from '@vueuse/core'
import type { MDCParserResult } from '@nuxtjs/mdc/runtime/types/index'
import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import type { IArticle } from '~/server/types'
import { useUserStore } from '~/store/UserStore'
import MarkdownEditor from '~/components/MarkdownEditor.vue'
import '~/styles/md-alert.css'

const props = defineProps({
  shortLink: {
    type: String,
    required: false,
    default: undefined,
  },
})

const toast = useToast()

const article = ref<IArticle>({
  // @ts-expect-error no error
  _id: undefined,
  shortLink: '',
  title: '',
  description: '',
  cover: '',
  category: '',
  tags: [],
  content: '',
  authorId: '',
  status: '',
  views: 0,
  likes: 0,
  ogImage: '',
  link: '',
  createdAt: undefined,
  updatedAt: undefined,
})

if (props.shortLink) {
  const { data } = await useFetch(`/api/article/${props.shortLink}`, {
    method: 'PUT',
  })
  article.value = data.value as IArticle
}

onMounted(async () => {
  const user = localStorage.getItem('user')
  article.value.authorId = user ? JSON.parse(user)._id : ''

  // if (article.value.content) {
  //   renderRes.value = await render(article.value.content)
  // }
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

const publishSetting = ref(false)

const fileCover = ref<File | null>(null)

const tags = ref<string[]>([])

const throttledPublish = useThrottleFn(() => {
  handlePublish()
}, 3000)

watchEffect(async () => {
  if (article.value.category) {
    tags.value = []
    const { data } = await useFetch(`/api/tag/${article.value.category}`)

    // @ts-expect-error no error
    tags.value = data.value as string[]
  }
})

function onChangeFile(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file)
    fileCover.value = file
}

const uploading = ref(false)

const { getToken } = useUserStore()

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
      Authorization: getToken(),
    },
  })

  if (status.value === 'success') {
    if (data.value) {
      if (option === 'cover')
        article.value.cover = data.value as string

      if (option === 'content')
        return data.value as string

      toast.add({ title: `upload ${fileCover.value.name} success` })
    }
  }

  if (status.value === 'error')
    toast.add({ title: `upload ${fileCover.value.name} failed`, description: data.value as string })

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
  // renderRes.value = await render(article.value.content)

  // article.value.html = renderRes.value

  if ((!article.value._id || article.value._id === '') && pass.value) {
    const { data, status, error } = await useFetch<IArticle>('/api/article/create', {
      method: 'POST',
      body: article.value,
      headers: {
        Authorization: getToken(),
      },
    })
    if (status.value === 'success') {
      if (data.value) {
        publishSetting.value = false
        article.value = data.value
        toast.add({ title: `publish ${data.value.title} success, article id ${data.value._id}` })
      }
    }

    if (status.value === 'error')
      toast.add({ title: `publish failed, ${error.value}` })
  }

  if (article.value._id && article.value._id !== '' && pass.value) {
    const { data, status, error } = await useFetch<IArticle>('/api/article/update', {
      method: 'PUT',
      body: article.value,
      headers: {
        Authorization: getToken(),
      },
    })
    if (status.value === 'success') {
      if (data.value) {
        publishSetting.value = false
        toast.add({ title: `update ${data.value.title} success, article id ${data.value._id}`, timeout: 3000 })
      }
    }

    if (status.value === 'error')
      toast.add({ title: `update failed, ${error.value}` })
  }
}

const createTag = ref('')

function handleCreateTag() {
  if (createTag.value === '')
    return

  tags.value.push(createTag.value)
  createTag.value = ''
}

const preview = ref(false)

function handleEmitContent(value: string) {
  article.value.content = value
}

const ast = ref<MDCParserResult | null>(null)

watchEffect(async () => {
  if (preview.value) {
    // const data = await render(article.value.content)
    // renderRes.value = await render(article.value.content)
    ast.value = await parseMarkdown(article.value.content)
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown)
})

function handleKeyDown(event: KeyboardEvent) {
  if ((event.ctrlKey || event.metaKey) && event.key === 's') {
    throttledPublish()
    event.preventDefault()
  }
}
</script>

<template>
  <div>
    <NuxtLayout name="admin-home">
      <div class="flex flex-col justify-between items-center">
        <div class="flex flex-row w-full justify-between items-center">
          <div>
            <span class="text-violet">{{ article.shortLink }}</span>
            <em class="mx-2">/</em>
            <span class="text-violet font-bold">{{ article.title }}</span>
          </div>
          <div>
            <UButton class="mr-2" color="blue" @click="preview = !preview">
              Preview
            </UButton>
            <UButton @click="publishSetting = true">
              Publish Settings
            </UButton>
          </div>
        </div>
      </div>
      <div class="mt-4 text-left w-full">
        <MarkdownEditor :input="article.content" @change="handleEmitContent" />
      </div>
    </NuxtLayout>

    <UModal
      v-model="preview" fullscreen
      :ui="{ container: 'items-center', fullscreen: 'w-full lg:w-[80%] md:w-full sm:w-full xl:max-w-[1000px] xl:w-[80%] h-auto min-h-500px my-6' }"
    >
      <UCard>
        <template #header>
          <div class="flex flex-row justify-between items-center">
            <div class="text-violet">
              {{ article.title }}
            </div>
            <div>
              <UButton color="red" @click="preview = false">
                Close
              </UButton>
            </div>
          </div>
        </template>
        <Suspense>
          <MDCRenderer v-if="ast?.body" class="violet-prose" :body="ast.body" :data="ast.data" />
        </Suspense>
      </UCard>
    </UModal>

    <USlideover v-model="publishSetting">
      <UCard
        class="flex flex-1 flex-col"
        :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
      >
        <template #header>
          Publish Settings
        </template>
        <div class="p-2 max-h-[calc(100vh - 100px)] overflow-y-scroll">
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
                <input type="file" class="w-full" @change="onChangeFile">
                <UButton class="ml-2" :disabled="uploading" :loading="uploading" @click="handleUpload('cover')">
                  upload
                </UButton>
                <UButton color="red" class="ml-2" @click="handleClean">
                  clean
                </UButton>
              </div>
            </UFormGroup>
            <UFormGroup label="Category" name="category">
              <USelectMenu v-model="article.category" :options="['article', 'short', 'project', 'page']" />
              <div v-if="errorFields?.category?.length" class="text-xs text-red">
                {{ errorFields.category[0].message }}
              </div>
            </UFormGroup>
            <UFormGroup v-if="article.category !== 'page'" label="Tags" name="tags">
              <USelectMenu v-model="article.tags" :options="tags" searchable multiple />
              <div v-if="errorFields?.tags?.length" class="text-xs text-red">
                {{ errorFields.tags[0].message }}
              </div>
            </UFormGroup>
            <UFormGroup v-if="article.category !== 'page'" label="Create Tag" name="createTags">
              <div class="flex flex-row w-full">
                <UInput v-model="createTag" class="w-full" />
                <UButton class="ml-2" @click="handleCreateTag">
                  Create
                </UButton>
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
            <div class="w-full">
              <UButton type="submit" color="blue" :disabled="!pass" @click="throttledPublish">
                Submit
              </UButton>
            </div>
          </UForm>
        </div>
      </UCard>
    </USlideover>
  </div>
</template>
