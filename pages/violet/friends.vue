<script setup lang="ts">
import type { IFriend } from '~/server/types';
import { formatZHTime } from '~/composables/formatTime'
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
import { useUserStore } from '~/store/UserStore'

const toast = useToast()

const { getToken } = useUserStore()

const { data, pending, error } = useFetch<IFriend[]>('/api/friend/all', {
  method: 'GET',
  server: false,
  headers: {
    'Authorization': getToken(),
  }
})

const router = useRouter()

if (error.value) {
  if (error.value.statusCode === 401) {
    toast.add({ title: 'Error', description: 'Unauthorized' })
    router.push('/violet/login')
  } else {
    toast.add({ title: 'Error', description: error.value.message })
  }
}

const columns = [
  { key: '_id', label: 'ID' },
  { key: 'title', label: 'Title' },
  { key: 'bio', label: 'Bio' },
  { key: 'avatar', label: 'Avatar' },
  { key: 'url', label: 'Url' },
  { key: 'email', label: 'Email' },
  { key: 'screenShot', label: 'ScreenShot' },
  { key: 'status', label: 'Status' },
  { key: 'createdAt', label: 'CreatedAt' },
  { key: 'updatedAt', label: 'UpdatedAt' }
]

const selectedColumns = ref([...columns])

const q = ref('')

const filteredRows = computed(() => {
  if (!data.value)
    return []

  if (!q.value)
    return data.value

  return data.value.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})


const metaData = [{
  label: 'meta data',
  icon: 'i-heroicons-information-circle',
  defaultOpen: false,
  content: `${JSON.stringify(data.value)}`,
}]

const selected: Ref<IFriend[]> = ref([])

function select(row: any) {
  const index = selected.value.findIndex(item => item._id === row._id)
  if (index === -1)
    selected.value.push(row)
  else
    selected.value.splice(index, 1)
}


function calcStatusColor(status: string) {
  switch (status) {
    case 'PUBLISHED':
      return 'emerald'
    case 'DELETED':
      return 'red'
    case 'SAVED':
      return 'orange'
    default:
      return 'gray'
  }
}

const editFriend = ref<boolean>(false)

const friend = ref<IFriend>({
  _id: undefined,
  title: '',
  bio: '',
  avatar: '',
  url: '',
  email: '',
  screenShot: '',
  status: '',
  createdAt: undefined,
  updatedAt: undefined,
})

function setDefaultFriend() {
  friend.value = {
    _id: undefined,
    title: '',
    bio: '',
    avatar: '',
    url: '',
    email: '',
    screenShot: '',
    status: '',
    createdAt: undefined,
    updatedAt: undefined,
  }
}

const rules = {
  title: {
    type: 'string',
    required: true,
  },
  bio: {
    type: 'string',
    required: true,
  },
  avatar: {
    type: 'string',
    required: true,
  },
  url: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    required: false,
  },
  status: {
    type: 'string',
    required: true,
  },
  screenShot: {
    type: 'string',
    required: true,
  },
}

// @ts-expect-error no error
const { pass, errorFields } = useAsyncValidator(friend, rules)

const optionType = ref<'new' | 'edit' | undefined>(undefined)

function handleModel(option: 'edit' | 'new') {
  optionType.value = option
  if (option === 'new') {
    friend.value = {
      _id: undefined,
      title: '',
      bio: '',
      avatar: '',
      url: '',
      email: '',
      screenShot: '',
      status: '',
      createdAt: undefined,
      updatedAt: undefined,
    }
  } else {
    if (selected.value.length === 0) {
      return
    }
    friend.value = selected.value[0]
  }
  editFriend.value = true
}

async function handleSubmit() {
  if (optionType.value === 'new') {
    const { data, error } = await useFetch<IFriend>('/api/friend/create', {
      method: 'POST',
      body: friend.value,
      headers: {
        'Authorization': localStorage.getItem('token') || '',
      }
    })

    if (error.value) {
      toast.add({ title: error.value?.message })
    }

    if (data.value) {
      toast.add({ title: `create success.` })
      setDefaultFriend()
      editFriend.value = false
    }
  }

  if (optionType.value === 'edit') {
    // update
    const { data, error } = await useFetch<IFriend>('/api/friend/update', {
      method: 'PUT',
      body: friend.value,
      headers: {
        'Authorization': localStorage.getItem('token') || '',
      }
    })

    if (error.value) {
      toast.add({ title: error.value?.message })
    }

    if (data.value) {
      toast.add({ title: `update success.` })
      setDefaultFriend()
      editFriend.value = false
    }
  }
}

const isPending = ref(false)

async function handleGenScreenShot() {
  // gen screenShot
  const url = friend.value.url
  isPending.value = true
  const { data, error } = await useFetch<string>('/api/screenshot', {
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
    friend.value.screenShot = data.value
    toast.add({ title: `gen screenShot success.` })
  }
}

function handleCancel() {
  setDefaultFriend()
  editFriend.value = false
}
</script>
<template>
  <div>
    <NuxtLayout name="admin-home">
      <div class="my-1 flex flex-row">
        <UButton icon="i-ri:edit-fill" class="mr-2" color="violet" @click="handleModel('new')">
          Add New
        </UButton>
        <UButton icon="i-ri:edit-fill" class="mr-2" color="violet" @click="handleModel('edit')">
          Edit
        </UButton>
        <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns"
          @click="handleModel('edit')" class="mr-2" />
        <UInput v-model="q" placeholder="Search data..." />
      </div>
    </NuxtLayout>

    <UTable v-if="data" v-model="selected" :loading="pending" :rows="filteredRows" :columns="selectedColumns"
      @select="select">

      <template #status-data="{ row }">
        <UBadge size="xs" :label="row.status" :color="calcStatusColor(row.status)" variant="subtle" />
      </template>

      <template #avatar-data="{ row }">
        <UPopover mode="hover">
          <UAvatar v-if="row.avatar" img-class="object-cover" :src="`${row.avatar}`" alt="Avatar" />
          <div v-else>
            null
          </div>
          <template #panel>
            <div class="h-full w-full">
              <img :src="`${row.avatar}`" class="object-cover h-50 w-full">
            </div>
          </template>
        </UPopover>
      </template>
      <template #url-data="{ row }">
        <ULink target="_blank" :to="`${row.url}`" class="text-violet-400 transition-all hover:text-violet-600">
          {{ row.url }}
        </ULink>
      </template>
      <template #screenShot-data="{ row }">
        <UPopover mode="hover">
          <UAvatar v-if="row.screenShot" img-class="object-cover" :src="`${row.screenShot}/thumbnail`" alt="Avatar" />
          <div v-else>
            null
          </div>
          <template #panel>
            <div class="h-full w-full">
              <img :src="`${row.screenShot}/compress1600x900`" class="object-cover h-50 w-full">
            </div>
          </template>
        </UPopover>
      </template>
      <template #createdAt-data="{ row }">
        {{ formatZHTime(row.createdAt) }}
      </template>
      <template #updatedAt-data="{ row }">
        {{ formatZHTime(row.updatedAt) }}
      </template>
    </UTable>
    <NuxtLayout name="home">
      <UAccordion :items="metaData" />
    </NuxtLayout>

    <UModal v-model="editFriend" class="z-2000">
      <div class="p-4">
        <UForm :state="friend" class="space-y-4">
          <UFormGroup label="Title" name="title">
            <UInput v-model="friend.title" />
            <div v-if="errorFields?.title?.length" class="text-xs text-red">
              {{ errorFields.title[0].message }}
            </div>
          </UFormGroup>
          <UFormGroup label="Bio" name="bio">
            <UInput v-model="friend.bio" />
            <div v-if="errorFields?.bio?.length" class="text-xs text-red">
              {{ errorFields.bio[0].message }}
            </div>
          </UFormGroup>
          <UFormGroup label="Avatar" name="avatar">
            <UInput v-model="friend.avatar" />
            <div v-if="errorFields?.avatar?.length" class="text-xs text-red">
              {{ errorFields.avatar[0].message }}
            </div>
          </UFormGroup>
          <div v-if="friend.avatar" class="flex flex-row justify-center">
            <img :src="friend.avatar" alt="avatar" class="object-cover rounded-md shadow w-1/4">
          </div>
          <UFormGroup label="Url" name="url">
            <UInput v-model="friend.url" />
            <div v-if="errorFields?.url?.length" class="text-xs text-red">
              {{ errorFields.url[0].message }}
            </div>
          </UFormGroup>
          <UFormGroup label="ScreenShot" name="screenShot">
            <div class="flex flex-row justify-between">
              <UInput class="w-full" v-model="friend.screenShot" :disabled="true" />
              <UButton class="ml-2" color="green" @click="handleGenScreenShot" :loading="isPending"
                :disabled="isPending">
                Gen
                ScreenShot
              </UButton>
            </div>
            <div v-if="errorFields?.screenShot?.length" class="text-xs text-red">
              {{ errorFields.screenShot[0].message }}
            </div>
          </UFormGroup>
          <div v-if="friend.screenShot">
            <img :src="friend.screenShot" alt="screenShot" class="object-cover rounded-md shadow w-full">
          </div>
          <UFormGroup label="Email" name="email">
            <UInput v-model="friend.email" />
            <div v-if="errorFields?.email?.length" class="text-xs text-red">
              {{ errorFields.email[0].message }}
            </div>
          </UFormGroup>
          <UFormGroup label="Status" name="status">
            <USelectMenu v-model="friend.status" :options="['PUBLISHED', 'SAVED', 'DELETED']" />
            <div v-if="errorFields?.status?.length" class="text-xs text-red">
              {{ errorFields.status[0].message }}
            </div>
          </UFormGroup>
          <div class="flex flex-row justify-between">
            <UButton @click="handleCancel" color="red">Cancel</UButton>
            <UButton type="submit" :disabled="!pass" @click="handleSubmit">
              Submit
            </UButton>
          </div>
        </UForm>
      </div>
    </UModal>
  </div>
</template>
