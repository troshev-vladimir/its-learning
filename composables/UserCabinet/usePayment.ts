import { buyViaInstallment } from "@/helpers/utils";

export default function usePayment() {
  const pay = (params: any, period: number) => {
    buyViaInstallment({ sum: params.price, title: params.name, period });
  };
  return {
    pay,
  };
}
