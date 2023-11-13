import { merge } from 'lodash'

type FetchType = typeof $fetch
type ReqType = Parameters<FetchType>[0]
type FetchOptions = Parameters<FetchType>[1]

export function post<T = unknown>(
  request: ReqType,
  body?: any,
  opts?: FetchOptions,
) {
  const token = useCookie('token')
  const router = useRouter()
  const route = useRoute()

  const defaultOpts = {
    method: 'post',
    // baseURL: '/api',
    headers: { token: token.value } as any,
    body,
    onRequestError() {
      console.error('请求出错，请重试！')
    },
    onResponseError({ response }) {
      switch (response.status) {
        case 400:
          console.error('参数错误')
          break
        case 401:
          console.error('没有访问权限')
          router.push(`/login?callback=${route.path}`)
          break
        case 403:
          console.error('服务器拒绝访问')
          break
        case 404:
          console.error('请求地址错误')
          break
        case 500:
          console.error('服务器故障')
          break
        default:
          console.error('网络连接故障')
          break
      }
    },
  } as FetchOptions

  return $fetch<T>(request, merge(defaultOpts, opts))
}
