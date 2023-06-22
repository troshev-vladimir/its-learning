import { createStore } from "vuex";
import tariff from "./modules/tariff";

const store = createStore({
  state: {},
  getters: {},
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        );
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
