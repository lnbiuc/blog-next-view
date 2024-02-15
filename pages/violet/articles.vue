<script setup lang="ts">
import type { IArticle } from '~/server/types'
import { formatZHTime } from '~/composables/formatTime'

const { data, pending } = useFetch<IArticle[]>('/api/article/all', {
  method: 'GET',
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

const router = useRouter()

function handleEdit() {
  if (selected.value.length === 0)
    return
  router.push(`/violet/edit/${selected.value[0].shortLink}`)
}
</script>

<template>
  <div>
    <NuxtLayout name="admin">
      <div class="my-1 flex flex-row">
        <UButton icon="i-ri:edit-fill" class="mr-2" color="violet" @click="handleEdit">
          Edit
        </UButton>
        <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" class="mr-2" />
        <UInput v-model="q" placeholder="Search data..." />
      </div>

      <UTable v-if="data" v-model="selected" :loading="pending" :rows="filteredRows" :columns="selectedColumns"
        @select="select">
        <template #shortLink-data="{ row }">
          <ULink target="_blank" :to="`/article/${row.shortLink}`"
            class="text-violet-400 transition-all hover:text-violet-600">
            {{ row.shortLink }}
          </ULink>
        </template>
        <template #status-data="{ row }">
          <UBadge size="xs" :label="row.status" :color="calcStatusColor(row.status)" variant="subtle" />
        </template>

        <template #cover-data="{ row }">
          <UPopover mode="hover">
            <UAvatar v-if="row.cover" img-class="object-cover" :src="`${row.cover}/thumbnail`" alt="Avatar" />
            <div v-else>
              null
            </div>
            <template #panel>
              <div class="h-full w-full">
                <img :src="`${row.cover}/comporess1600x900`" class="object-cover h-50 w-full">
              </div>
            </template>
          </UPopover>
        </template>

        <template #tags-data="{ row }">
          <div class="flex flex-row">
            <UBadge v-for="t in row.tags" :key="t" color="gray" variant="solid" class="ml-2 opacity-90" :tag="t">
              {{ t }}
            </UBadge>
          </div>
        </template>

        <template #ogImage-data="{ row }">
          <UPopover mode="hover">
            <UAvatar v-if="row.ogImage" :src="`${row.ogImage}/thumbnail`" alt="Avatar" />
            <div v-else>
              null
            </div>
            <template #panel>
              <div class="h-full w-full">
                <img :src="`${row.ogImage}/comporess1600x900`" class="object-cover h-50 w-full">
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
      <UAccordion :items="metaData" class="mt-2" />
    </NuxtLayout>
  </div>
</template>
