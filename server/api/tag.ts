import { useHttp } from '~/composables/useHttp'

export async function getAllTag() {
  return await useHttp.get('http://127.0.0.1:7070/api/v1/tags/all')
}
