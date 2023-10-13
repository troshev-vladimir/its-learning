export interface Card {
  id: number;
  title: string;
  installmentPeriod: number;
  price: {
    value: number;
    installment: number;
    discount: number;
    discountInstallment: number;
  };
  linkToProgram: string;
  description: string;
  items: string[];
  criterias: {
    duration: Creteria;
    price: Creteria;
    installment: Creteria;
  };
}

export type Creteria = {
  value: number;
  dimension: string;
};
