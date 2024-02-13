import { defineStore } from 'pinia'
import type { IFriend } from '~/server/types'

export const useFriendStore = defineStore('friendStore', () => {
  const friends: Ref<IFriend[]> = ref([])

  async function getAll() {
    const { data } = await useFetch<IFriend[]>('/api/friend')

    if (data.value)
      friends.value = data.value
  }

  async function get() {
    if (friends.value.length === 0)
      await getAll()

    return friends.value
  }

  return { get }
})
