import type { Candidate } from '~/api/candidate/types';
import { defineStore } from "pinia";
import candidate from "~/api/candidate";
import type { CandidateProgressResp } from "~/api/candidate/types";
const useUserStore = defineStore("user", () => {
  const userId = ref("");//79048628369
  const userToken = ref("");//7XC01SB53055e9rIvT0kyIHCL7JsLcN3
  const userPromocode = ref("");

  const userBonus = ref<CandidateProgressResp | null>(null);
  const user = ref<Partial<Candidate>>({})

  function getUserBonus() {
    console.log(userId.value, userToken.value);

    return candidate
      .candidateCurrentProgress({
        id: userId.value,
        promo: userPromocode.value,
        token: userToken.value,
      })
      .then((responce) => {
        userBonus.value = responce;
        return responce
      })
      .catch((e) => {
        console.log('error', e)
        return []
      });
  }

  async function createUser(phone: string) {
    try {
      const responce = await candidate.candidateCreate(phone);
      user.value = { ...user.value, ...responce }
      userId.value = phone
      localStorage.setItem("userPhone", userId.value); // TODO: replace to controller

    } catch (error) {
      console.log(error);
    }
  }

  async function confirmUser(pin: string) {
    try {
      const newUser = await candidate.сandidateConfirmation(userId.value, pin);
      user.value = { ...user.value, ...newUser }
      userToken.value = newUser.token || ''
      localStorage.setItem("userToken", userToken.value); // TODO: replace to controller
    } catch (error) {
      console.log(error);
    }
  }

  return { userId,userToken, userBonus, getUserBonus, createUser, user, confirmUser};
});

export default useUserStore;
