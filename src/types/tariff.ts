export interface Tariff {
  id: string;
  name: string;
  income: number;
  period: number;
  description1: string;
  description2: string;
  price: number;
  offermin: number;
  offermax: number;
  theoryhours: number;
  practicehours: number;
}

export interface Installment {
  offerid?: string;
  offername?: string;
  offerpayment?: number;
  offerperiod?: number | string;
  offerfrombank?: boolean;
}
