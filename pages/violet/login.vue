<script setup lang="ts">
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { useUserStore } from '~/store/UserStore'

const form = ref({
  nickname: undefined,
  password: undefined,
})

const rules = {
  nickname: {
    type: 'string',
    min: 5,
    max: 20,
    required: true,
  },
  password: {
    type: 'string',
    min: 8,
    max: 20,
    required: true,
  },
}

// @ts-expect-error no error
const { pass, errorFields } = useAsyncValidator(form, rules)

async function onSubmit() {
  const { data, status } = await useFetch<string>('/api/user/login', {
    method: 'POST',
    body: form.value,
  })

  if (data && status.value === 'success') {
    useStorage('user', data)
    const router = useRouter()
    router.push('/violet')
  }
}

const { hasAuth } = useUserStore()

onMounted(() => {
  if (hasAuth()) {
    const router = useRouter()
    router.push('/violet')
  }
})
</script>

<template>
  <NuxtLayout name="empty">
    <div class="m-auto flex flex-row min-h-60vh w-300px justify-center items-center">
      <UForm :state="form" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Nickname" name="nickname">
          <UInput v-model="form.nickname" />
          <div v-if="errorFields?.nickname?.length" text-red>
            {{ errorFields.nickname[0].message }}
          </div>
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="form.password" type="password" />
          <div v-if="errorFields?.password?.length" text-red>
            {{ errorFields.password[0].message }}
          </div>
        </UFormGroup>

        <UButton type="submit" :disabled="!pass">
          Submit
        </UButton>
      </UForm>
    </div>
  </NuxtLayout>
</template>
