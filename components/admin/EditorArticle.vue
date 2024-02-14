import type articleVue from '~/layouts/article.vue';
<script setup lang="ts">
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
import type { IArticle } from '~/server/types'

const props = defineProps({
  shortLink: {
    type: String,
    required: false,
    default: undefined,
  },
})

const toast = useToast()

const article = ref<IArticle>({
  _id: '',
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
  const { data } = await useFetch(`/api/article/${props.shortLink}`)
  article.value = data.value as IArticle
  if (article.value.content)
    article.value.content = article.value.content.replace(/\\n/g, '\n')
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
  description: {
    type: 'string',
    required: true,
  },
  cover: {
    type: 'string',
    required: true,
  },
  category: {
    type: 'string',
    required: true,
  },
  content: {
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

function handleSubmit() {

}

const metaData = [{
  label: 'meta data',
  icon: 'i-heroicons-information-circle',
  defaultOpen: false,
  content: '',
}]

const publishSetting = ref(false)

const fileCover = ref<File | null>(null)

const tags = ref<string[]>([])

watchEffect(async () => {
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

async function handleUpload() {
  if (!fileCover.value)
    return

  toast.add({ title: `start upload ${fileCover.value.name}` })
  const formData = new FormData()
  formData.append('file', fileCover.value)
  const { data, status } = await useFetch('/api/upload', {
    method: 'POST',
    body: formData,
  })

  if (status.value === 'success') {
    if (data.value) {
      article.value.cover = data.value as string
      toast.add({ title: `upload ${fileCover.value.name} success` })
    }
  }

  if (status.value === 'error') {
    console.error(data.value)
    toast.add({ title: `upload ${fileCover.value.name} failed`, description: data.value as string })
  }
}

function handleClean() {
  fileCover.value = null
  article.value.cover = ''
}
</script>

<template>
  <div>
    <NuxtLayout name="home">
      <UAccordion :items="metaData" class="text-left">
        <template #item>
          <div>
            {{ article }}
          </div>
        </template>
      </UAccordion>
      <div class="mt-4 flex flex-row items-center">
        <UButton class="mr-2" @click="publishSetting = true">
          Publish Settings
        </UButton>
        <span>{{ article.shortLink }}</span>
        <span class="mx-2">/</span>
        <span>{{ article.title }}</span>
      </div>
    </NuxtLayout>
    <div class="p-6 flex flex-row min-h-60vh w-full">
      <div class="p-2 w-1/2">
        <UTextarea v-model="article.content" textarea-class="md-textarea" type="textarea" autoresize />
      </div>
      <div class="p-2 w-1/2">
        <MDRender id="md-result" :source="article.content ? article.content : ''" />
      </div>
    </div>
    <UModal v-model="publishSetting" class="z-2000">
      <div class="p-4">
        <UForm :state="article" class="space-y-4" @submit="handleSubmit">
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
            <UInput v-model="article.cover" :disabled="true" />
            <div v-if="errorFields?.cover?.length" class="text-xs text-red">
              {{ errorFields.cover[0].message }}
            </div>
          </UFormGroup>
          <div v-if="article.cover">
            <img :src="article.cover" alt="cover" class="object-cover rounded-md shadow w-full">
          </div>
          <UFormGroup label="Upload Cover" name="file">
            <div class="flex flex-row">
              <UInput type="file" @change="onChangeFile" />
              <UButton class="ml-2" @click="handleUpload">
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
          <UButton type="submit" :disabled="!pass">
            Publish
          </UButton>
        </UForm>
      </div>
    </UModal>
  </div>
</template>
