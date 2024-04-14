<script setup lang="ts">
import type { IArticle } from '~/server/types'
import { formatZHTime } from '~/composables/formatTime'
import { useUserStore } from '~/store/UserStore'

const toast = useToast()

const router = useRouter()

const { getToken } = useUserStore()

const articles = ref<IArticle[]>([])

const { data, pending, error, refresh } = await useFetch<IArticle[]>('/api/article/all', {
  method: 'GET',
  server: false,
  headers: {
    Authorization: getToken(),
  },
})

if (error.value) {
  if (error.value.statusCode === 401) {
    toast.add({ title: 'Error', description: 'Unauthorized' })
    router.push('/violet/login')
  }
  else {
    toast.add({ title: 'Error', description: error.value.message })
  }
}

watchEffect(() => {
  if (data.value) {
    articles.value = []

    data.value?.sort((a, b) => {
      // @ts-expect-error - createdAt is a string
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    data.value?.forEach((article) => {
      articles.value.push(article)
    })
  }
})

const columns = [
  { key: '_id', label: 'ID' },
  { key: 'shortLink', label: 'Short Link' },
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description' },
  { key: 'cover', label: 'Cover' },
  { key: 'category', label: 'Category' },
  { key: 'tags', label: 'Tags' },
  { key: 'authorId', label: 'Author ID' },
  { key: 'status', label: 'Status' },
  { key: 'views', label: 'Views', sortable: true },
  { key: 'likes', label: 'Likes', sortable: true },
  { key: 'ogImage', label: 'OG Image' },
  { key: 'link', label: 'Link' },
  { key: 'createdAt', label: 'Created At', sortable: true },
  { key: 'updatedAt', label: 'Updated At', sortable: true },
]

const selectedColumns = ref([...columns])

// 要取消选择的列
const columnsToRemove = ['_id', 'description', 'authorId', 'likes', 'link']

// 遍历要取消选择的列
columnsToRemove.forEach((columnKey) => {
  // 找到对应的列在选定的列数组中的索引
  const index = selectedColumns.value.findIndex(col => col.key === columnKey)
  // 如果找到了该列，则从选定的列数组中移除它
  if (index !== -1)
    selectedColumns.value.splice(index, 1)
})

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

const selected: Ref<IArticle[]> = ref([])

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

function handleEdit() {
  if (selected.value.length === 0)
    return
  router.push(`/violet/edit/${selected.value[0].shortLink}`)
}

function handleDelete() {
  if (selected.value.length === 0)
    return
  const { data, error } = useFetch<{ acknowledged: boolean, deletedCount: number }>(`/api/article/${selected.value[0].shortLink}`, {
    method: 'DELETE',
    headers: {
      Authorization: getToken(),
    },
  })

  if (data.value)
    toast.add({ title: 'Success', description: 'Deleted' })

  if (error.value)
    toast.add({ title: 'Error', description: error.value.message })
}
</script>

<template>
  <div>
    <NuxtLayout name="admin-home">
      <div class="my-1 flex flex-row">
        <UButton icon="i-ri:edit-fill" class="mr-2" color="violet" @click="handleEdit">
          Edit
        </UButton>
        <UButton icon="i-ri:delete-back-2-fill" class="mr-2" color="red" @click="handleDelete">
          Delete
        </UButton>
        <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" class="mr-2" />
        <UInput v-model="q" placeholder="Search data..." />
      </div>
    </NuxtLayout>

    <UTable
      v-if="articles" v-model="selected" :loading="pending" :rows="filteredRows" :columns="selectedColumns"
      @select="select"
    >
      <template #shortLink-data="{ row }">
        <ULink
          target="_blank" :to="`/article/${row.shortLink}`"
          class="text-violet-400 transition-all hover:text-violet-600"
        >
          {{ row.shortLink }}
        </ULink>
      </template>
      <template #status-data="{ row }">
        <UBadge size="xs" :label="row.status" :color="calcStatusColor(row.status)" />
      </template>
      <template #category-data="{ row }">
        <UBadge v-if="row.category === 'article'" size="xs" :label="row.category" color="blue" />
        <UBadge v-if="row.category === 'short'" size="xs" :label="row.category" color="orange" />
        <UBadge v-if="row.category === 'project'" size="xs" :label="row.category" color="green" />
      </template>
      <template #cover-data="{ row }">
        <UPopover mode="hover">
          <UAvatar v-if="row.cover" img-class="object-cover" :src="`${row.cover}/thumbnail`" alt="Avatar" />
          <div v-else>
            null
          </div>
          <template #panel>
            <div class="h-full w-full">
              <img :src="`${row.cover}/compress1600x900`" class="object-cover h-50 w-full">
            </div>
          </template>
        </UPopover>
      </template>

      <template #tags-data="{ row }">
        <div class="flex flex-row">
          <UBadge v-for="t in row.tags" :key="t" color="gray" class="ml-2 opacity-90" :tag="t">
            {{ t }}
          </UBadge>
        </div>
      </template>

      <!-- <template #ogImage-data="{ row }">
        <UPopover mode="hover">
          <UAvatar :src="`/__og-image__/image/article/${row.shortLink}/og.png`" alt="Avatar" />
          <template #panel>
            <div class="h-full w-full">
              <img :src="`/__og-image__/image/article/${row.shortLink}/og.png`" class="object-cover h-50 w-full">
            </div>
          </template>
        </UPopover>
      </template> -->
      <template #createdAt-data="{ row }">
        {{ formatZHTime(row.createdAt) }}
      </template>
      <template #updatedAt-data="{ row }">
        {{ formatZHTime(row.updatedAt) }}
      </template>
      <template #html-data="{ row }">
        <UBadge v-if="row.html" color="green">
          Generated
        </UBadge>
        <UBadge v-else color="red">
          Null
        </UBadge>
      </template>
    </UTable>
    <NuxtLayout name="home">
      <UAccordion :items="metaData" />
    </NuxtLayout>
  </div>
</template>
