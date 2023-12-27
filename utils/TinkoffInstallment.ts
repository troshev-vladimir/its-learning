import tinkoff from "@tcb-web/create-credit";

interface Installment {
  sum: number;
  period: number | string;
  title: string;
}

const installmentValues = {
  3: "installment_0_0_3_4",
  6: "installment_0_0_6_6,5",
  // 12: "installment_0_0_12_11,5",
};

export default function buyViaInstallment({ sum, period, title }: Installment) {
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
