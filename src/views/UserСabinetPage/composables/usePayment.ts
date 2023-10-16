// import { reactive } from "vue";
// import { useStore } from "vuex";
import tinkoff from "@tcb-web/create-credit";
import useConstants from "@/views/TariffSelectorPage/composables/useConstants";

const { getCurrentInstallment } = useConstants();
export default function usePayment() {
  const pay = (params: any, period: number) => {
    tinkoff.create(
      {
        sum: params.price,
        items: [
          {
            name: params.name || "",
            price: params.price || 0,
            quantity: 1,
          },
        ],
        // demoFlow: DemoFlows.sms,
        promoCode: getCurrentInstallment(period),
        shopId: "d7836c7b-d032-493f-a2e3-ce02961930ae",
        showcaseId: "ff69b584-4d85-4ff6-9c44-8572184eaa1d",
      },
      { view: "modal" }
    );
  };
  return {
    pay,
  };
}
