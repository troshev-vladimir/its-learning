import { api } from '~/api/bootstrap'
import type { User } from '~/api/user/types'
export const useUserStore = defineStore('userStore', () => {
  const user = ref<User>()
  const hasChanges = ref(true)
  const isUserLoadding = ref(false)

  const fetchUser = async () => {
    const resp = await api.user.get('1')
    user.value = resp
    hasChanges.value = false
  }

  function $reset() {
    user.value = undefined
    hasChanges.value = true
  }

  return { user, isUserLoadding, hasChanges, fetchUser, $reset }
})
