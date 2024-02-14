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
  tags: {
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
  content: `${JSON.stringify(article.value)}`,
}]

const publishSetting = ref(false)
</script>

<template>
  <div>
    <NuxtLayout name="home">
      <div class="mt-4 flex flex-row items-center">
        <UButton @click="publishSetting = true">
          Publish
        </UButton>
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
    <NuxtLayout name="home">
      <UAccordion :items="metaData" class="text-left" />
    </NuxtLayout>
    <UModal v-model="publishSetting">
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

          <UButton type="submit" :disabled="!pass">
            Submit
          </UButton>
        </UForm>
      </div>
    </UModal>
  </div>
</template>
