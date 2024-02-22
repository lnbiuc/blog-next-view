import { useUserStore } from "~/store/UserStore"

export default defineNuxtRouteMiddleware((to, from) => {
  console.log('to', to.path)
  if (to.path.includes('/violet')) {
    const {hasAuth} = useUserStore()

    if (hasAuth()) {
      return navigateTo('/violet/articles')
    }
    return navigateTo('/violet/login')
  }
})
