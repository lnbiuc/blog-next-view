import type articleVue from '~/layouts/article.vue';
<script setup lang="ts">
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
import type { IArticle } from '~/server/types'
import { useIntervalFn, useThrottleFn } from '@vueuse/core'

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

async function handleUpload(option: 'cover' | 'content') {
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

  fileCover.value = null
}

const fileInput = ref()

function handleClean() {
  fileCover.value = null
  fileInput.value = null
  article.value.cover = ''
}

async function handlePublish() {
  if (!article.value._id || article.value._id === '') {
    const { data, status, error } = await useFetch<IArticle>('/api/article/create', {
      method: 'POST',
      body: article.value
    })
    if (status.value === 'success') {
      if (data.value) {
        publishSetting.value = false
        toast.add({ title: `publish ${data.value.title} success, article id ${data.value._id}` })
      }
    }

    if (status.value === 'error') {
      toast.add({ title: `publish failed, ${error.value}` })
    }
  }

  if (article.value._id && article.value._id !== '') {
    const { data, status, error } = await useFetch<IArticle>('/api/article/update', {
      method: 'PUT',
      body: article.value
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

onMounted(() => {
  const textarea = document.querySelector('.md-textarea') as HTMLTextAreaElement
  if (!textarea)
    return

  textarea.addEventListener('paste', async (event) => {
    // 获取粘贴事件的数据
    if (!event.clipboardData) return
    const items = (event.clipboardData).items;
    // 遍历粘贴的内容
    for (const item of items) {
      // 如果是图片
      if (item.type.indexOf('image') !== -1) {

        console.log(item)
        // 获取图片文件
        const blob = item.getAsFile();

        if (!blob) return

        // 将图片文件上传到服务器
        const imageUrl = await uploadImage(blob);

        // 如果成功上传图片
        if (imageUrl) {
          // 在textarea中插入图片链接到光标位置
          insertImageUrlAtCursor(textarea, imageUrl);
        }

        // 阻止默认粘贴行为
        event.preventDefault();
      }
    }
  });
})

// 上传图片到服务器
async function uploadImage(file: File) {
  fileCover.value = file
  const url = await handleUpload('content')
  fileCover.value = null
  return url
}

// 在textarea中插入图片链接到光标位置
function insertImageUrlAtCursor(textarea: HTMLTextAreaElement, imageUrl: string) {
  const startPos = textarea.selectionStart;
  const endPos = textarea.selectionEnd;
  const textBefore = textarea.value.substring(0, startPos);
  const textAfter = textarea.value.substring(endPos, textarea.value.length);
  const newText = `${textBefore}![image](${imageUrl})${textAfter}`;
  textarea.value = newText;
  textarea.setSelectionRange(startPos + imageUrl.length + 11, startPos + imageUrl.length + 11);
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

onMounted(() => {
  document.addEventListener('keydown', (event) => {
    // 检查是否按下了Ctrl键 (Cmd键在Mac上)
    const ctrlKey = event.ctrlKey || event.metaKey; // metaKey用于检查Cmd键，在Mac上是true

    // 检查是否按下了S键
    const sKey = event.key === 's';

    // 如果同时按下了Ctrl键和S键
    if (ctrlKey && sKey) {
      // 阻止浏览器默认的保存行为
      event.preventDefault();
      throttledPublish()
    }
  });
})
</script>

<template>
  <div>
    <NuxtLayout name="home">
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
          <UButton @click="autoSave = !autoSave" :color="autoSave ? 'green' : 'red'" class="mr-2">
            {{ autoSave ? 'Disable' : 'Enable' }}
          </UButton>
          <span class="mr-2">auto save status: {{ isActive ? 'Enable' : 'Disable' }}</span>
        </div>
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
              <UInput v-model="fileInput" type="file" @change="onChangeFile" />
              <UButton class="ml-2" @click="handleUpload('cover')">
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
          <UButton type="submit" :disabled="!pass" @click="throttledPublish">
            Submit
          </UButton>
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
