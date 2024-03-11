import { api } from '~/api/bootstrap'
import type { User } from '~/api/user/types'
export const useUserStore = defineStore('userStore', () => {
  const user = ref<User>()
  const hasChanges = ref(true)
  const isUserLoadding = ref(false)
  const accessToken = ref('')

  const fetchUser = async () => {
    if (!hasChanges.value || isUserLoadding.value) return

    isUserLoadding.value = true
    try {
      const resp = await api.user.get()
      user.value = resp
    } finally {
      hasChanges.value = false
      isUserLoadding.value = false
    }
  }

  function $reset() {
    user.value = undefined
    hasChanges.value = true
    accessToken.value = ''
  }

  return { user, isUserLoadding, hasChanges, fetchUser, accessToken, $reset }
})
