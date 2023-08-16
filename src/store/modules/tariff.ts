import { Installment } from "./../../types/tariff";
import { Tariff } from "@/types/tariff";
import { GetterTree } from "vuex";

interface State {
  selectedProgrammIdx: number;
  programs: Tariff[];
  payment: number;
  installment: Installment;
}

const tariff = {
  namespaced: true,
  state: (): State => {
    return {
      selectedProgrammIdx: 0,
      payment: 0,
      programs: [],
      installment: {},
    };
  },

  mutations: {
    increase(state: State) {
      if (state.selectedProgrammIdx < state.programs.length - 1) {
        state.selectedProgrammIdx += 1;
      }
    },

    reduce(state: State) {
      if (state.selectedProgrammIdx > 0) {
        state.selectedProgrammIdx -= 1;
      }
    },

    setPayment(state: State, value: number) {
      state.payment = value;
    },

    setPrograms(state: State, value: Tariff[]) {
      state.programs = value;
    },

    setInstallment(state: State, value: Installment) {
      state.installment = value;
    },
  },

  getters: {
    getCurrentProgramm(state: State) {
      return state.programs[state.selectedProgrammIdx];
    },
  },
};

export default tariff;
