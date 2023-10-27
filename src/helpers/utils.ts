import tinkoff from "@tcb-web/create-credit";
interface Installment {
  sum: number;
  period: number;
  title: string;
}

const installmentValues = {
  3: "installment_0_0_3_4",
  6: "installment_0_0_6_6,5",
  12: "installment_0_0_12_11,5",
};

export function formatNumber(number: number) {
  return String(number).replace(/(.)(?=(\d{3})+$)/g, "$1 ");
}

export function emailValidate(email: string) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export function buyViaInstallment({ sum, period, title }: Installment) {
  tinkoff.create(
    {
      sum: sum,
      items: [
        {
          name: title || "",
          price: sum || 0,
          quantity: 1,
        },
      ],
      // demoFlow: DemoFlows.sms,
      promoCode: installmentValues[period as keyof typeof installmentValues],
      shopId: "d7836c7b-d032-493f-a2e3-ce02961930ae",
      showcaseId: "ff69b584-4d85-4ff6-9c44-8572184eaa1d",
    },
    { view: "modal" }
  );
}
