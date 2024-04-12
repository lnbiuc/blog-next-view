import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const currUser: Ref<{ _id: string, nickname: string }> = ref({ _id: '', nickname: '' })

  function getUser() {
    if (currUser.value._id !== '' && currUser.value.nickname !== '') {
      return currUser.value
    }
    else {
      if (window) {
        const user = window.localStorage.getItem('user')
        if (user) {
          const { _id, nickname } = JSON.parse(user)
          if (_id && nickname)
            currUser.value = { _id, nickname }
        }
      }
    }
  }

  function hasAuth(): boolean {
    getUser()
    return currUser.value._id !== '' && currUser.value.nickname !== ''
  }

  function logout() {
    currUser.value._id = ''
    currUser.value.nickname = ''
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  function getToken() {
    if (window) {
      const token = window.localStorage.getItem('token')
      if (token)
        return token
    }
    return ''
  }

  return { getUser, hasAuth, logout, getToken }
})
