import { Program } from "@/types/tariff";
import apiProgram from "@/api/tariff";
import promocode from "@/api/promocode";
import { RootState } from "../index";
import { ActionContext } from "vuex";
interface State {
  programs: Program[];
}

const tariff = {
  namespaced: true,
  state: (): State => {
    return {
      programs: [],
    };
  },

  mutations: {
    setPrograms(state: State, value: Program[]) {
      state.programs = value;
      value.sort((a, b) => {
        if (a.futureSalary < b.futureSalary) return -1;
        if (a.futureSalary > b.futureSalary) return 1;
        return 0;
      }) || [];
    },
  },

  actions: {
    fetchPrograms(
      { commit }: ActionContext<State, RootState>,
      promocode: string
    ) {
      apiProgram.getTariffs(promocode);
      commit("setPrograms");
    },
  },
};

export default tariff;
