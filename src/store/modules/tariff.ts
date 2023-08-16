import { Tariff } from "@/types/tariff";
import { GetterTree } from "vuex";

interface State {
  selectedProgrammIdx: number;
  programs: Tariff[];
}

const tariff = {
  namespaced: true,
  state(): State {
    return {
      selectedProgrammIdx: 0,
      programs: [
        {
          id: "88cfa11a-383c-11ee-a9b9-a8a1591a7f2b",
          name: "TESLA",
          income: 120000,
          period: 12,
          description:
            "<strong>Войди в 12% лучших\n</strong>Стань по настоящему\nкрутым специалистом",
          price: 128000,
          offermin: 4533,
          offermax: 24533,
          theoryhours: 0,
          practicehours: 0,
        },
        {
          id: "b1b3c049-384b-11ee-a9b9-a8a1591a7f2b",
          name: "VIP",
          income: 60000,
          period: 5,
          description:
            "812% годовых\nОптимальный КПД\nЛучшая окупаемость твоих инвестиций",
          price: 88000,
          offermin: 6233,
          offermax: 25300,
          theoryhours: 0,
          practicehours: 0,
        },
      ],
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
  },

  getters: {
    getCurrentProgramm(state: State) {
      return state;
    },
  },
};

export default tariff;
