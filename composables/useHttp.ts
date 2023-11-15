import type { FetchResponse } from 'ofetch'
import type { Ref } from 'vue'
import type { UseFetchOptions } from '#app'

export interface ResOptions<T> {
  data?: T
  code?: number
  timestamp?: number
}

type UrlType = string | Request | Ref<string | Request> | (() => string | Request)

export type HttpOption<T> = UseFetchOptions<ResOptions<T>>

function handleError<T>(response: FetchResponse<ResOptions<T>> & FetchResponse<ResponseType>) {
  const err = (text: string) => {
    console.error(text)
  }
  if (!response._data) {
    err('请求超时，服务器无响应！')
    return
  }
  const handleMap: { [key: number]: () => void } = {
    404: () => err('服务器资源不存在'),
    500: () => err('服务器内部错误'),
    403: () => err('没有权限访问该资源'),
  }
  handleMap[response.status] ? handleMap[response.status]() : err('未知错误！')
}

function fetch<T>(url: UrlType, option: UseFetchOptions<ResOptions<T>>) {
  return useFetch<ResOptions<T>>(url, {
    // 请求拦截器
    onRequest({ options }) {
      // 在这里判断错误
      return options
    },
    // 响应拦截
    onResponse({ response }) {
      if (response.headers.get('content-disposition') && response.status === 200)
        return response
      // 在这里判断错误
      if (response._data.code !== 200) {
        handleError<T>(response)
        return Promise.reject(response._data)
      }
      // 成功返回
      return response._data
    },
    // 错误处理
    onResponseError({ response }) {
      handleError<T>(response)
      return Promise.reject(response?._data ?? null)
    },
    // 合并参数
    ...option,
  })
}

// 自动导出
export const useHttp = {
  get: <T>(url: UrlType, params?: any, option?: HttpOption<T>) => {
    return fetch<T>(url, { method: 'get', params, ...option })
  },

  post: <T>(url: UrlType, body?: any, option?: HttpOption<T>) => {
    return fetch<T>(url, { method: 'post', body, ...option })
  },

  put: <T>(url: UrlType, body?: any, option?: HttpOption<T>) => {
    return fetch<T>(url, { method: 'put', body, ...option })
  },

  delete: <T>(url: UrlType, body?: any, option?: HttpOption<T>) => {
    return fetch<T>(url, { method: 'delete', body, ...option })
  },
}
