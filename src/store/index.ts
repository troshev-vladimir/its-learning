import { createStore } from "vuex";
import tariff from "./modules/tariff";

const store = createStore({
  state: {},
  getters: {},
  mutations: {
    initialiseStore(state) {
      const store = localStorage.getItem("store");
      if (store) {
        this.replaceState(Object.assign(state, JSON.parse(store)));
      }
    },
  },
  actions: {},
  modules: {
    tariff,
  },
});

store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

export default store;
