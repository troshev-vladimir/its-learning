export interface Program {
  id: string;
  name: string;
  futureSalary: number;
  description: string;
  advantages: string[];
  period: number;
  price: {
    actual: number;
    withDiscaunt: number;
  };
  installment: {
    actual: number;
    withDiscaunt: number;
  };
  burnout: number;
  salaryAddition: number;
  discount: number;
  discountApplyed: boolean;
  linkToProgram: string;
  linkToContract: string;
  linkToContractAddition: string;
}
