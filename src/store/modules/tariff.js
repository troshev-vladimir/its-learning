const tariff = {
  namespaced: true,
  state: () => ({
    programId: 2,
    programPeriod: 4,
    transh: 9600,
    totalPrice: 88000,
    programValue: {},
    mode: "normal",
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

    setProgramPeriod(state, value) {
      state.programPeriod = value;
    },

    setMode(state, value) {
      state.mode = value;
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

    programCondition(state, getters) {
      const programValues = getters.programValue.values;
      const brakePoints = Object.keys(programValues);
      state.programValue = state.transh;

      brakePoints.every((bp) => {
        if (bp > state.transh) {
          state.programValue = programValues[bp];
          return false;
        } else return true;
      });
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
  1: `
    <div class="col col-grow">
      <p class="text-h2">
        Зарплата <span class="text-accent text-h1"> x3 </span>
      </p>
      <p class="text-h2">
        через 12 месяцев
      </p>
    </div>
    <div class="col">
      <p class="text-body1">Самый быстрый старт твоей карьеры</p>
    </div>
    `,
  2: `
    <div class="column col-grow">
      <p class="text-h2">
        На <span class="text-accent text-h1"> 20% </span>
      </p>
      <p class="text-h2">больше вакансий</p>
    </div>
    <p class="text-body1">Выбирай из лучших работадателей</p>`,
  3: `
    <div class="column col-grow">
      <p class="text-h2">
        <span class="text-accent text-h1"> 812% </span>годовых
      </p>
      <p class="text-h2">Оптимальный КПД</p>
    </div>
    <p class="text-body1">лучшая окупаемость твоих инвестиций</p>`,
  4: `
    <div class="col col-grow">
      <p class="text-h2">
        Уже через <span class="text-accent text-h1"> 6 </span>
      </p>
      <p class="text-h2"> месяцев</p>
    </div>
    <div class="col">
      <p class="text-body1">Стань middle разработчиком спуся погода работы</p>
    </div>`,
  5: `
    <div class="column col-grow">
      <p class="text-h2">
        Войди в <span class="text-accent text-h1"> 12% </span>
      </p>
      <p class="text-h2">лучших</p>
    </div>
    <p class="text-body1">Стань понастоящему крутым специалистом</p>`,
};

export default tariff;
