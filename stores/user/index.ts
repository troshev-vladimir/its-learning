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

  return { user, fetchUser, $reset }
})
