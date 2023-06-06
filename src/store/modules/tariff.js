const tariff = {
  namespaced: true,
  state: () => ({
    programId: 2,
    transh: 9600,
    programValue: {},
    mode: "normal",
  }),

  mutations: {
    setProgramId(state, value) {
      state.programId = value;
    },

    setTransh(state, value) {
      state.transh = value;
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
        time: 12,
        bank: true,
        price: 4800,
      },
      15467: {
        time: 6,
        bank: true,
        price: 9666,
      },
      19334: {
        time: 6,
        bank: true,
        price: 9666,
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
      },
      17600: {
        months: 6,
        bank: true,
        price: 14666,
      },
      22001: {
        months: 4,
        bank: true,
        price: 22000,
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
      },
      17067: {
        months: 12,
        bank: true,
        price: 10666,
      },
      21334: {
        months: 6,
        bank: false,
        price: 21333,
      },
    },
  },
};

const programAccents = {
  1: `
    <div class="column ">
      <p class="text-h2">
        Зарплата <span class="text-accent text-h1"> x3 </span> через 12 месяцев
      </p>
    </div>
    <p class="text-body1">Самый быстрый старт твоей карьеры</p>`,
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
    <div class="column col-grow">
      <p class="text-h2">
        Уже через
      </p>
      <p class="text-h2"><span class="text-accent text-h1"> 6 </span> месяцев</p>
    </div>
    <p class="text-body1">Стань middle разработчиком спуся погода работы</p>`,
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
