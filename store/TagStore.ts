import { defineStore } from 'pinia'

export const useTagStore = defineStore('tagStore', () => {
  const tags: Ref<Record<string, string[]>> = ref({})

  async function getTags(category: string) {
    const { data } = await useFetch<string[]>(`/api/tag/${category}`)

    if (data.value)
      tags.value[category] = data.value
  }

  async function tagCategory(category: string): Promise<string[]> {
    if (!tags.value[category])
      await getTags(category)

    return tags.value[category]
  }

  return { tagCategory }
})
