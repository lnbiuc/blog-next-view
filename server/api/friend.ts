import { useHttp } from '~/composables/useHttp'

export async function getFriendsList() {
  return await useHttp.get('/api/v1/friend/get')
}
