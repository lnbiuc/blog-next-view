import { useHttp } from '~/composables/useHttp'

export async function login(account: string, password: string) {
  return await useHttp.post('/api/v1/user/identify', { account, password })
}
