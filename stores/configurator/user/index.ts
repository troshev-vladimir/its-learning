import type { Candidate } from '~/api/configurator/candidate/types'
import { defineStore } from 'pinia'
import candidate from '~/api/configurator/candidate'
import type { CandidateProgressResp } from '~/api/configurator/candidate/types'
const useUserStore = defineStore('user', () => {
  const userId = ref('')
  const userToken = ref('')
  const userPromocode = ref('')

  const userBonus = ref<CandidateProgressResp | null>(null)
  const user = ref<Partial<Candidate>>({})

  function getUserBonus() {
    return candidate
      .candidateCurrentProgress({
        id: userId.value,
        promo: userPromocode.value,
        token: userToken.value,
      })
      .then((responce) => {
        userBonus.value = responce
        return responce
      })
      .catch((e) => {
        throw e
      })
  }

  async function createUser(phone: string, resend = false) {
    const responce = await candidate.candidateCreate(phone, resend)
    user.value = { ...user.value, ...responce }
    userId.value = phone
    localStorage.setItem('userPhone', userId.value) // TODO: replace to controller
  }

  async function confirmUser(pin: string) {
    const newUser = await candidate.сandidateConfirmation(userId.value, pin)
    user.value = { ...user.value, ...newUser }
    userToken.value = newUser.token || ''
    localStorage.setItem('userToken', userToken.value) // TODO: replace to controller
  }

  return {
    userId,
    userToken,
    userBonus,
    userPromocode,
    getUserBonus,
    createUser,
    user,
    confirmUser,
  }
})

export default useUserStore
