import { Card } from "../types";
import { Ref, computed } from "vue";
export default function useConstants(selectedId: Ref<number | undefined>) {
  const getCurrentInstallment = (term: number): string => {
    return installmentValues[term as keyof typeof installmentValues];
  };

  const currentProgram = computed((): Card | null => {
    if (typeof selectedId.value !== "undefined") {
      return cards[selectedId.value];
    }

    return null;
  });

  return {
    cards,
    instalmentOptions,
    getCurrentInstallment,
    currentProgram,
  };
}

const installmentValues = {
  3: "installment_0_0_3_4",
  6: "installment_0_0_6_6,5",
  12: "installment_0_0_12_11,5",
};

const instalmentOptions = [3, 6, 12];

const cards = [
  {
    id: 0,
    title: "TESLA",
    installmentPeriod: 3,
    price: {
      value: 128000,
      installment: 10666,
      discountInstallment: 9541,
      discount: 13500,
    },
    linkToProgram: "https://itseducation.ru/tesla",
    description:
      "Для тех кто готов выйти на middle уровень за минимальное время.",
    items: [
      "Трудоустройство в случае успешного прохождения обучения.",
      "Диплом государственного образца.",
      "3 коммерческие оплачиваемые задачи.",
      "200,5 часов теории и 88,5 часов практических домашних заданий.",
    ],
    criterias: {
      duration: {
        value: 8,
        dimension: "мес.",
      },
      price: {
        value: 128000,
        dimension: "₽",
      },
      installment: {
        value: 10666,
        dimension: "₽/мес.",
      },
    },
  },
  {
    id: 1,
    title: "VIP",
    installmentPeriod: 3,
    linkToProgram: "https://itseducation.ru/vip",
    price: {
      value: 88000,
      installment: 7333,
      discountInstallment: 6770,

      discount: 6750,
    },
    description:
      "Для тех, кто готов по-настоящему углубиться в сферу программирования 1С.",
    items: [
      "Трудоустройство в случае успешного прохождения обучения.",
      "Диплом государственного образца.",
      "150,5 часов теории и 66,5 часов практических домашних заданий.",
    ],
    criterias: {
      duration: {
        value: 6,
        dimension: "мес.",
      },
      price: {
        value: 88000,
        dimension: "₽",
      },
      installment: {
        value: 7333,
        dimension: "₽/мес.",
      },
    },
  },
  {
    id: 2,
    title: "PRO",
    installmentPeriod: 3,
    linkToProgram: "https://itseducation.ru/pro",
    price: {
      value: 58000,
      installment: 4833,
      discountInstallment: 4608,

      discount: 2700,
    },
    description:
      "5 месяцев, для тех, кто хочет освоить 1С с нуля и получить базовые знания необходимые для трудоустройства.",
    items: [
      "Трудоустройство в случае успешного прохождения обучения.",
      "124,5 часов теории и 59,5 часов практических домашних заданий.",
    ],
    criterias: {
      duration: {
        value: 5,
        dimension: "мес.",
      },
      price: {
        value: 58000,
        dimension: "₽",
      },
      installment: {
        value: 4833,
        dimension: "₽/мес.",
      },
    },
  },
];
