import { createStore } from "vuex";
import tariff from "./modules/tariff";

const store = createStore({
  state: () => ({
    userToken: "asasd",
    userPhone: null,
  }),
  getters: {
    getUserToken(state) {
      return state.userToken;
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
      state.userPhone = value;
    },

    setUserToken(state, value) {
      state.userToken = value;
    },
  },
  actions: {},
  modules: {
    tariff,
  },
});

store.subscribe((mutation, state) => {
  // TODO: вырезать токен
  localStorage.setItem("store", JSON.stringify(state));
});

export default store;
