<script setup lang="ts">
import { getTagByCategory } from '~/server/api/tag'

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

async function getTags() {
  getTagByCategory(props.category).then((res) => {
    const resTag = res.data.value?.data as string[]
    // push res to tags
    resTag.forEach(e => tags.value.push(e))
  })
}

getTags()

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
    <UInput id="search" v-model="searchVal" :loading="isLoading" class="w-full"
      icon="i-heroicons-magnifying-glass-20-solid" size="lg" placeholder="Search..." />
    <USelectMenu v-model="selectVal" class="ml-2" size="lg" :options="options" />
  </div>
  <Transition name="fade">
    <div class="mt-2" v-if="tags.length > 1">
      <span class="mr-2 text-lg">Tags:</span>
      <UBadge v-for="t in tags" :key="t" size="md" color="gray" variant="solid"
        class="m-1 cursor-pointer transition-transform duration-150 hover:scale-108" @click="tagClick(t)">
        {{ t }}
      </UBadge>
    </div>
  </Transition>
</template>
