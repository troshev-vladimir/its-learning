import { ref } from "vue";
export default function useSalaryCalculator() {
  const initialState = ref(data);

  return { initialState };
}

const data = {
  30000: {
    period: "3 месяцa",
    months: 3,
    investments: 58000,
    programm: "pro",
    id: 1,
  },

  40000: {
    period: "4 месяцa",
    months: 4,
    investments: 88000,
    programm: "vip",
    id: 2,
  },

  60000: {
    period: "5 месяцев",
    months: 5,
    investments: 88000,
    programm: "vip",
    id: 3,
  },

  80000: {
    period: "6 месяцев",
    months: 6,
    investments: 128000,
    programm: "tesla",
    id: 4,
  },

  120000: {
    period: "12 месяцев",
    months: 12,
    investments: 128000,
    programm: "tesla",
    id: 5,
  },
};
