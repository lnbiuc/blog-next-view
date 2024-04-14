<script setup lang="ts">
import { useTagStore } from '~/store/TagStore'

const props = defineProps<{
  category: 'article' | 'short'
  isLoading: boolean
}>()

const emit = defineEmits<{
  paramsChange: [searchVal: string]
  sortByChange: [selectVal: string]
}>()

const { tagCategory } = useTagStore()

const searchVal: Ref<string> = ref('')

const tags: Ref<string[]> = ref(['ALL'])

const options: Ref<string[]> = ref(['Sort by date', 'Sort by view'])

const selectVal: Ref<string> = ref(options.value[0])

tagCategory(props.category).then((data) => {
  if (data) {
    data.forEach((tag) => {
      tags.value.push(tag)
    })
  }
})

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
      id="search" v-model="searchVal" :loading="isLoading" class="w-full" color="gray"
      icon="i-heroicons-magnifying-glass-20-solid" size="lg" placeholder="Search..."
    />
    <USelectMenu v-model="selectVal" class="ml-2 z-1000" size="lg" :options="options" color="gray" />
  </div>
  <!-- <Transition name="fade"> -->
  <div v-if="tags.length > 0" class="mt-2">
    <UBadge
      v-for="t in tags" :key="t" size="md" color="gray" variant="solid"
      class="my-1 mr-2 cursor-pointer transition-transform duration-150 animated animated-fade-in-right animated-faster active:scale-[0.97]"
      @click="tagClick(t)"
    >
      {{ t }}
    </UBadge>
  </div>
  <!-- </Transition> -->
</template>
