import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import tariff from "./modules/tariff";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    tariff,
  },
  plugins: [vuexLocal.plugin],
});
