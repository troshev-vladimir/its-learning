import { api } from '~/api/bootstrap'
import type { User } from '~/api/user/types'
export const useUserStore = defineStore('userStore', () => {
  const user = ref<User>()
  const hasChanges = ref(true)
  const isUserLoadding = ref(false)
  const accessToken = ref('')

  const fetchUser = async () => {
    isUserLoadding.value = true
    const resp = await api.user.get('1')
    user.value = resp
    hasChanges.value = false
    isUserLoadding.value = false
  }

  function $reset() {
    user.value = undefined
    hasChanges.value = true
    accessToken.value = ''
  }

  return { user, isUserLoadding, hasChanges, fetchUser, accessToken, $reset }
})
