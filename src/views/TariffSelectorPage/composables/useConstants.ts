import { Card } from "../types";
import { Ref, computed } from "vue";
export default function useConstants(selectedId?: Ref<number | undefined>) {
  const currentProgram = computed((): Card | null => {
    if (typeof selectedId?.value !== "undefined") {
      return cards[selectedId.value];
    }

    return null;
  });

  return {
    cards,
    instalmentOptions,
    currentProgram,
  };
}

const instalmentOptions = [3, 6, 24];

const cards = [
  {
    id: 0,
    title: "TESLA",
    installmentPeriod: 6,
    price: {
      value: 128000,
      installment: 10666,
      discountInstallment: 9541,
      discount: 13500,
    },
    linkToProgram: "https://itseducation.ru/tesla",
    description:
      "<p class='text-body2'>Твоя будущая зарплата:<p /> <p class='text-h2 q-mb-md'>120&nbsp;000</p> <p class='text-h2'><span class='text-accent'>MIDDLE</span> уровень</p> <p class='text-body2'>Уже через пол года работы</p>",
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
    documents: {
      contractLink:
        "https://drive.google.com/file/d/1ZNHZx2x22b3iPrefR64JgQxJyruz9M3b/view?usp=share_link",
      contractAditionOneLink:
        "https://drive.google.com/file/d/1idYpXZ8xf3wNQbkAORbsFeHTs1rqWqqE/view?usp=share_link",
      contractAditionTwoLink:
        "https://drive.google.com/file/d/1Dzm_SQZyGkEM7uAp1zcUEwYylmrhn-nw/view?usp=share_link",
    },
  },
  {
    id: 1,
    title: "VIP",
    installmentPeriod: 12,
    linkToProgram: "https://itseducation.ru/vip",
    price: {
      value: 88000,
      installment: 7333,
      discountInstallment: 6770,

      discount: 6750,
    },
    description:
      "<p class='text-body2'>Твоя будущая зарплата:<p /> <p class='text-h2 q-mb-md'>60&nbsp;000</p> <p class='text-h2'>На <span class='text-accent'>20%</span> больше</p> <p class='text-body2'>Вакансий на рынке труда</p>",
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
    documents: {
      contractLink:
        "https://drive.google.com/file/d/1ZNHZx2x22b3iPrefR64JgQxJyruz9M3b/view?usp=share_link",
      contractAditionOneLink:
        "https://drive.google.com/file/d/1F410CskezoFnWhrB_PILiKGb0Z8vOyg9/view?usp=share_link",
      contractAditionTwoLink:
        "https://drive.google.com/file/d/1Dzm_SQZyGkEM7uAp1zcUEwYylmrhn-nw/view?usp=share_link",
    },
  },
  {
    id: 2,
    title: "PRO",
    installmentPeriod: 12,
    linkToProgram: "https://itseducation.ru/pro",
    price: {
      value: 58000,
      installment: 4833,
      discountInstallment: 4608,

      discount: 2700,
    },
    description:
      "<p class='text-body2'>Твоя будущая зарплата:<p /> <p class='text-h2 q-mb-md'>30&nbsp;000</p> <p class='text-h2'>Зарплата <span class='text-accent'>Х3</span></p> <p class='text-body2'>Уже через год после обучения</p>",
    items: ["124,5 часов теории и 59,5 часов практических домашних заданий."],
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
    documents: {
      contractLink:
        "https://drive.google.com/file/d/1ZNHZx2x22b3iPrefR64JgQxJyruz9M3b/view?usp=share_link",
      contractAditionOneLink:
        "https://drive.google.com/file/d/1NRgZXZgoMgT6xds7bbetHNlPre5nUrCN/view?usp=share_link",
      contractAditionTwoLink:
        "https://drive.google.com/file/d/1Dzm_SQZyGkEM7uAp1zcUEwYylmrhn-nw/view?usp=share_link",
    },
  },
];
