import { Program } from "@/types/program";
import apiProgram from "@/api/program";
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
      // value.sort((a, b) => {
      //   if (a.futureSalary < b.futureSalary) return -1;
      //   if (a.futureSalary > b.futureSalary) return 1;
      //   return 0;
      // }) || [];
    },
  },

  actions: {
    async fetchPrograms(
      { commit, rootState }: ActionContext<State, RootState>,
      promocode = ""
    ) {
      try {
        const programs = await apiProgram.getPrograms(
          promocode,
          rootState.userPhone,
          rootState.userToken
        );

        commit("setPrograms", programs);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default tariff;
