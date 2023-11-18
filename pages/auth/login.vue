<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import { login } from '~/server/api/user'
import type { Author } from '~/server/types/author'

const state = reactive({
  account: undefined,
  password: undefined,
})

function validate(state: any): FormError[] {
  const errors = []
  if (!state.account)
    errors.push({ path: 'account', message: 'Required' })
  if (!state.password)
    errors.push({ path: 'password', message: 'Required' })
  return errors
}

const toast = useToast()

const user = ref<Author>()

async function onSubmit(event: FormSubmitEvent<any>) {
  login(event.data.account, event.data.password).then((res) => {
    user.value = res.data.value?.data as Author
    if (res.data.value?.code === 200) {
      toast.add({
        title: 'Login Success',
        description: `Welcome ${user.value.nickname}`,
      })
      useRouter().push('/authed/publish')
    }
    else {
      toast.add({
        title: 'Login Failed',
        description: res.data.value?.data as string,
      })
    }
  })
}
</script>

<template>
  <NuxtLayout name="default">
    <NuxtLayout name="home">
      <div class="flex flex-col items-center justify-center">
        <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormGroup label="Account" name="account">
            <UInput v-model="state.account" />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput v-model="state.password" type="password" />
          </UFormGroup>

          <UButton type="submit" color="gray">
            Submit
          </UButton>
        </UForm>
      </div>
    </NuxtLayout>
  </NuxtLayout>
</template>
