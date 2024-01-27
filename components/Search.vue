<script setup lang="ts">
import { ca } from 'date-fns/locale'
import { getTagByCategory } from '~/server/api/tag'
import { usePreloadCacheStore } from '~/store'

const props = defineProps<{
  category: 'ARTICLE' | 'SHORTS'
  isLoading: boolean
}>()

const emit = defineEmits<{
  paramsChange: [searchVal: string]
  sortByChange: [selectVal: string]
}>()

const searchVal: Ref<string> = ref('')

const tags: Ref<string[]> = ref(['ALL'])

const options: Ref<string[]> = ref(['Sort by date', 'Sort by view'])

const selectVal: Ref<string> = ref(options.value[0])

const { cacheTags, getTagsCache } = usePreloadCacheStore()

async function getTags() {
  getTagByCategory(props.category).then((res) => {
    const resTag = res.data.value?.data as string[]
    // push res to tags
    resTag.forEach(e => tags.value.push(e))
    cacheTags(props.category, tags.value)
  })
}

function loadTags() {
  const res: string[] | undefined = getTagsCache(props.category)
  if (res) {
    tags.value = res
    return
  }
  getTags()
}

loadTags()

const debouncedFn = useDebounceFn(() => {
  if (!tags.value.includes(searchVal.value))
    emit('paramsChange', searchVal.value)
}, 1000, { maxWait: 5000 })

watch(searchVal, () => {
  if (tags.value.includes(searchVal.value))
    emit('paramsChange', searchVal.value)

  else
    debouncedFn()
})

watch(selectVal, () => {
  emit('sortByChange', selectVal.value)
})

async function tagClick(tag: string) {
  searchVal.value = tag
}
</script>

<template>
  <div class="flex flex-row">
    <UInput
      id="search" v-model="searchVal" :loading="isLoading" class="w-full"
      icon="i-heroicons-magnifying-glass-20-solid" size="lg" placeholder="Search..."
    />
    <USelectMenu v-model="selectVal" class="z-1000 ml-2" size="lg" :options="options" />
  </div>
  <Transition name="fade">
    <div v-if="tags.length > 1" class="mt-2">
      <UBadge
        v-for="t in tags" :key="t" size="md" color="gray" variant="solid"
        class="animate-shadow my-1 mr-2 cursor-pointer transition-transform duration-150 active:scale-[0.97]" @click="tagClick(t)"
      >
        {{ t }}
      </UBadge>
    </div>
  </Transition>
</template>
