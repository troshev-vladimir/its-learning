import { reactive } from "vue";
import { useStore } from "vuex";
export default function usePayment() {
  const store = useStore();

  const paymentParams = reactive({
    email: "troshevvladimir@gmail.com",
    expirationDate: "2023-06-28T14:28:26.045622+03:00",
    invId: 10017,
    isTest: 0,
    merchantLogin: "mmcflash.ru", //Идентификатор магазина
    outSum: "12300.00",
    receipt:
      "%7b%22sno%22%3a%22patent%22%2c%22items%22%3a%5b%7b%22name%22%3a%22Usb+%d0%9a%d0%bb%d1%8e%d1%87+MmcFlash%22%2c%22quantity%22%3a1%2c%22sum%22%3a12300.0%2c%22nomenclatureCode%22%3anull%2c%22payment_method%22%3a%22full_payment%22%2c%22payment_object%22%3a%22service%22%2c%22tax%22%3a%22none%22%7d%2c%7b%22name%22%3a%22106+%d0%9c%d0%be%d0%b4%d1%83%d0%bb%d1%8c%2c+Denso+Gen2+MPC5746R+(1N83M)+test%22%2c%22quantity%22%3a1%2c%22sum%22%3a12300.0%2c%22nomenclatureCode%22%3anull%2c%22payment_method%22%3a%22full_payment%22%2c%22payment_object%22%3a%22service%22%2c%22tax%22%3a%22none%22%7d%5d%2c%22TotalPrice%22%3a24600.0%7d",
    signatureValue: "752e7c90a1a4c54c104a1233dc927c8a",
    // Description: "Оплата заказа в Тестовом магазине ROBOKASSA",
    // Shp_Item: "1",
    // Culture: "ru",
    // Encoding: "utf-8",
    // SignatureValue: "3925b771e47d405cbcbb492daa936824",
  });

  const getPaymentParams = (type) => {
    // fetchfromBack()
    console.log({
      id: store.state.tariff.program.id,
      type,
    });
  };
  const payAll = () => {
    getPaymentParams("all");
    window.Robokassa.StartPayment(paymentParams);
  };

  const pay = () => {
    getPaymentParams("split");
    window.Robokassa.StartPayment(paymentParams);
  };
  return {
    payAll,
    pay,
    getPaymentParams,
  };
}
