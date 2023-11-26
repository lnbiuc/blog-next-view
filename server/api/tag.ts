import { useHttp } from '~/composables/useHttp'

export async function getAllTag() {
  return await useHttp.get('/api/v1/tags/all')
}

export async function getTagByCategory(category: string) {
  return await useHttp.get(`/api/v1/tags/category/${category}`)
}
