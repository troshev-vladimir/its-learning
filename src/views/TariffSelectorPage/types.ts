export interface Card {
  id: number;
  title: string;
  price: {
    value: number;
    installment: number;
  };
  linkToProgram: string;
  description: string;
  items: string[];
  criterias: Array<{
    name: string;
    value: string;
  }>;
}
