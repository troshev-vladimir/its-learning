import { defineStore } from "pinia";
import candidate from "~/api/candidate";
import type { CandidateProgressResp } from "~/api/candidate/types";
const useUserStore = defineStore("user", () => {
  const userId = ref("79048628369");
  const userToken = ref("7XC01SB53055e9rIvT0kyIHCL7JsLcN3");
  const userPromocode = ref("");

  const userBonus = ref<CandidateProgressResp | null>(null);

  function getUserBonus() {
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

  return { userId, userBonus, getUserBonus };
});

export default useUserStore;
