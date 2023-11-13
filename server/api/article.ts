import { useHttp } from '~/composables/useHttp'

export async function getAllArticle(pageNumber: number, pageSize: number) {
  return await useHttp.post('/api/v1/articles/page', { "pageNumber": pageNumber, "pageSize": pageSize })
}
