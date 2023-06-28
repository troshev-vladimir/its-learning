const tariff = {
  namespaced: true,
  state: () => ({
    programId: 2,
    programPeriod: 4,
    transh: 9600,
    totalPrice: 80000,
    mode: "normal",
    program: {},
    salaryStep: 1,
  }),

  mutations: {
    setProgramId(state, value) {
      state.programId = value;
    },

    setProgramTotalPrice(state, value) {
      state.totalPrice = value;
    },

    setTransh(state, value) {
      state.transh = value;
    },

    setProgram(state, value) {
      state.program = value;
    },

    setProgramPeriod(state, value) {
      state.programPeriod = value;
    },

    setMode(state, value) {
      state.mode = value;
    },
    setSalaryStep(state, value) {
      state.salaryStep = value;
    },
  },

  getters: {
    programName(state) {
      return programNames[state.programId];
    },

    programValue(state, getters) {
      return programs[getters.programName];
    },

    programAccent(state) {
      return programAccents[state.programId];
    },
  },
};

const programNames = {
  1: "pro",
  2: "vip",
  3: "vip",
  4: "tesla",
  5: "tesla",
};

const programs = {
  pro: {
    range: {
      min: 4800,
      max: 19333,
    },
    values: {
      8670: {
        months: 12,
        bank: true,
        price: 4800,
        id: 0,
      },
      15467: {
        months: 6,
        bank: true,
        price: 9666,
        id: 1,
      },
      19334: {
        months: 3,
        bank: false,
        price: 19333,
        id: 2,
      },
    },
  },
  vip: {
    range: {
      min: 7333,
      max: 22000,
    },
    values: {
      13200: {
        months: 12,
        bank: true,
        price: 7333,
        id: 3,
      },
      17600: {
        months: 6,
        bank: true,
        price: 14666,
        id: 4,
      },
      22001: {
        months: 4,
        bank: true,
        price: 22000,
        id: 5,
      },
    },
  },
  tesla: {
    range: {
      min: 5333,
      max: 21333,
    },
    values: {
      9600: {
        months: 24,
        bank: true,
        price: 5333,
        id: 6,
      },
      17067: {
        months: 12,
        bank: true,
        price: 10666,
        id: 7,
      },
      21334: {
        months: 6,
        bank: false,
        price: 21333,
        id: 8,
      },
    },
  },
};

const programAccents = {
  1: {
    title: `
        Зарплата <span class="text-accent"> x3 </span> уже через год`,
    description: `Самый быстрый старт твоей карьеры`,
  },
  2: {
    title: `
        На <span class="text-accent"> 20% </span> больше вакансий`,
    description: "Выбирай из лучших работадателей",
  },
  3: {
    title: `
      <span class="text-accent"> 812% </span>годовых Оптимальный КПД`,
    description: `лучшая окупаемость твоих инвестиций`,
  },
  4: {
    title: `
        Уже через <span class="text-accent"> 8 месяцев </span> работы`,
    description: `Стань middle разработчиком`,
  },
  5: {
    title: `
        Войди в <span class="text-accent"> 12% </span> лучших на рынке`,
    description: `Стань крутым специалистом`,
  },
};

export default tariff;
