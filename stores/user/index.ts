import { api } from '~/api/bootstrap'
import type { User } from '~/api/user/types'
export const useUserStore = defineStore('userStore', () => {
  const user = ref<User>()

  const fetchUser = async () => {
    const resp = await api.user.get('1')
    user.value = resp
  }

  function $reset() {
    user.value = {}
  }

  // await useAsyncData('user', () => store.fetchUser().then(() => true))
  // const { data, pending, error, refresh } = await useAsyncData('user', () => store.fetchUser())
  // An occured error will be passed to 'error' of useAsyncData's return object
  // callOnce Что тут запрашивать

  return { user, fetchUser, $reset }
})
