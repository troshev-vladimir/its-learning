import { computed, reactive, ref } from "vue";
export default function useSteps() {
  const courseStep = ref(1);
  const paySteps = reactive([
    {
      title: "Введение",
      date: "16.05.2023",
      status: "Успешно пройден",
      fulfilld: true,
    },
    {
      title: "asdasdasd",
      date: "16.05.2023",
      status: "Успешно пройден",
      fulfilld: true,
    },
  ]);

  const courseSteps = reactive([
    {
      date: "До 19 июля",
      summ: 2,
      status: "Успешно оплачен",
      payed: true,
    },
    {
      date: "До 19 июля",
      summ: 2,
      status: "Успешно оплачен",
      payed: true,
    },
    {
      date: "До 19 июля",
      summ: 3957,
      status: "Ожидает оплаты",
      payed: false,
    },
    {
      date: "До 19 июля",
      summ: 3957,
      status: "Ожидает оплаты",
      payed: false,
    },
  ]);

  const unpayedSteps = computed(() => {
    return courseSteps.filter((el) => !el.payed);
  });

  const totalSumm = computed(() => {
    const selectedSteps = unpayedSteps.value.slice(0, courseStep.value);
    return selectedSteps.reduce((acc, cur) => {
      return (acc += cur.summ);
    }, 0);
  });

  return {
    courseStep,
    courseSteps,
    paySteps,
    totalSumm,
    unpayedSteps,
  };
}
