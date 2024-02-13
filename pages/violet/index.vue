<script setup lang="ts">
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
import { useUserStore } from '~/store/UserStore'

const { hasAuth } = useUserStore()

const router = useRouter()

onMounted(() => {
  if (!hasAuth())
    router.push('/violet/login')
})

const publishSetting = ref(false)

function handlePublish() {
  publishSetting.value = true
}

const form = ref({
  shortLink: '',
  title: '',
  description: '',
  cover: '',
  category: '',
  tags: '',
  content: '## Hello World',
  authorId: '',
  status: '',
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
const { pass, errorFields } = useAsyncValidator(form, rules)

function handleSubmit() {

}

const metaData = [{
  label: 'meta data',
  icon: 'i-heroicons-information-circle',
  defaultOpen: false,
  content: `${JSON.stringify(form.value)}`,
}]
</script>

<template>
  <div>
    <NuxtLayout name="admin">
      <div class="mt-4 flex flex-row items-center">
        <UButton @click="handlePublish">
          Publish
        </UButton>
      </div>
    </NuxtLayout>
    <div class="p-6 flex flex-row min-h-60vh w-full">
      <div class="p-2 w-1/2">
        <UTextarea v-model="form.content" type="textarea" autoresize />
      </div>
      <div class="p-2 w-1/2">
        <MDRender :source="form.content" />
      </div>
    </div>
    <NuxtLayout name="home">
      <UAccordion :items="metaData" />
    </NuxtLayout>
    <UModal v-model="publishSetting">
      <div class="p-4">
        <UForm :state="form" class="space-y-4" @submit="handleSubmit">
          <UFormGroup label="ShortLink" name="shortLink">
            <UInput v-model="form.shortLink" />
            <div v-if="errorFields?.shortLink?.length" class="text-xs text-red">
              {{ errorFields.shortLink[0].message }}
            </div>
          </UFormGroup>
          <UFormGroup label="Title" name="title">
            <UInput v-model="form.title" />
            <div v-if="errorFields?.title?.length" class="text-xs text-red">
              {{ errorFields.title[0].message }}
            </div>
          </UFormGroup>
          <UFormGroup label="Description" name="description">
            <UInput v-model="form.description" />
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
