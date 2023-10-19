import { createStore } from "vuex";
import tariff from "./modules/tariff";
import apiCandidate from "@/api/candidate";
const store = createStore({
  state: () => ({
    userToken: "",
    userPhone: "",
    userCache: 0,
    usersDiscounts: [],
    userPromoBonus: 0,
    expirationDate: "",
  }),
  getters: {
    getUserToken(state) {
      return state.userToken;
    },

    getCurrentProgramDicounts(state) {
      return (programId: string) => {
        return state.usersDiscounts.find((el: any) => {
          return el.programid === programId;
        });
      };
    },
  },
  mutations: {
    initialiseStore(state) {
      const store = localStorage.getItem("store");
      if (store) {
        this.replaceState(Object.assign(state, JSON.parse(store)));
      }
    },

    setUserPhone(state, value) {
      state.userPhone = "7" + value;
      localStorage.setItem("userPhone", "7" + value);
    },

    setUserToken(state, value) {
      state.userToken = value;
      localStorage.setItem("userToken", value);
    },

    setUserCashe(state, value) {
      state.userCache = value || 0;
    },

    setExpirationDate(state, value) {
      state.expirationDate = value || 0;
    },

    setUsersBonuss(state, { discounts, promoBonus }) {
      state.usersDiscounts = discounts || [];
      state.userPromoBonus = promoBonus || 0;
    },
  },
  actions: {
    async getUsersCash({ commit, state }, promo) {
      // if (!state.userPhone || !state.userToken) return;

      try {
        const progress = await apiCandidate.candidateCurrentProgress(
          state.userPhone,
          state.userToken,
          promo
        );
        commit("setExpirationDate", progress[0].finalsteptime);
        commit("setUserCashe", progress[0].sum);
        commit("setUsersBonuss", {
          discounts: progress[0].currentdiscounts,
          promoBonus: progress[0].promodiscount,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {
    tariff,
  },
});

store.subscribe((mutation, state) => {
  // TODO: вырезать токен
  localStorage.setItem("store", JSON.stringify(state));
});

export default store;
