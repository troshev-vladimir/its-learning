import { Installment } from "./../../types/tariff";
import { Tariff } from "@/types/tariff";

type SpendManyType = "salary" | "learning";
interface State {
  selectedProgrammIdx: number;
  programs: Tariff[];
  payment: number;
  installment: Installment;
  spendManyType: SpendManyType;
}

const tariff = {
  namespaced: true,
  state: (): State => {
    return {
      selectedProgrammIdx: 0,
      payment: 0,
      programs: [],
      installment: {},
      spendManyType: "salary",
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
      state.programs = value || [];
    },

    setInstallment(state: State, value: Installment) {
      state.installment = value;
    },

    setSpendManyType(state: State, value: SpendManyType) {
      state.spendManyType = value;
    },
  },

  getters: {
    getCurrentProgramm(state: State) {
      return state.programs[state.selectedProgrammIdx];
    },
  },
};

export default tariff;
