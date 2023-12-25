import { Program } from "@/types/program";

const programs: Program[] = [
  {
    id: "asd",
    name: "1C: Профессиональный разработчик",
    futureSalary: 12313,
    description:
      "Для, тех кто готов выйти на middle уровень за минимальное время.",
    advantages: [
      "Трудоустройство после успешного прохождения обучения.",
      "Диплом государственного образца",
      "3 коммерческие оплачиваемые задачи.",
      "200,5 часов теории и 88,5 часов практических домашних заданий.",
    ],
    period: 8,
    price: {
      actual: 246000,
      withDiscount: 230000,
    },
    installment: {
      actual: 12344,
      withDiscount: 12343,
    },
    burnout: 123,
    salaryAddition: 123,
    discount: 123,
    discountApplyed: true,
    linkToProgram: "linkToProgram",
    linkToContract: "linkToContract",
    linkToContractAddition: "linkToContractAddition",
  },
];

export default programs;
