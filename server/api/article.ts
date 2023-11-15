import { useHttp } from '~/composables/useHttp'

export async function getAllArticle(pageNumber: number, pageSize: number) {
  return await useHttp.post('/api/v1/articles/page', { pageNumber, pageSize })
}

export async function searchArticle(keyword: string, pageNumber: number, pageSize: number) {
  return await useHttp.post(`/api/v1/articles/search/${keyword}`, { pageNumber, pageSize })
}

export async function getArticleByTag(tag: string, pageNumber: number, pageSize: number) {
  return await useHttp.post(`/api/v1/articles/tag/${tag}`, { pageNumber, pageSize })
}
