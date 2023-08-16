export interface Tariff {
  id: string;
  name: string;
  income: number;
  period: number;
  description: string;
  price: number;
  offermin: number;
  offermax: number;
  theoryhours: number;
  practicehours: number;
}
