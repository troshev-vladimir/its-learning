<template>
  <form
    ref="form"
    name="TinkoffPayForm"
    style="visibility: hidden; position: absolute"
  >
    <input
      class="payform-tinkoff-row"
      type="hidden"
      name="terminalkey"
      value="1662547243585"
    />
    <input
      class="payform-tinkoff-row"
      type="hidden"
      name="frame"
      value="true"
    />
    <input
      class="payform-tinkoff-row"
      type="hidden"
      name="language"
      value="ru"
    />
    <input
      class="payform-tinkoff-row"
      type="text"
      placeholder="Сумма заказа"
      name="amount"
      :value="props.amount"
      required
    />
    <input
      class="payform-tinkoff-row"
      type="text"
      placeholder="Номер заказа"
      name="order"
      :value="orderData?.order"
    />
    <input
      class="payform-tinkoff-row"
      type="text"
      placeholder="Описание заказа"
      name="description"
      :value="orderData?.description"
    />
    <input
      class="payform-tinkoff-row"
      type="text"
      placeholder="ФИО плательщика"
      name="name"
      :value="userData?.name"
    />
    <input
      class="payform-tinkoff-row"
      type="text"
      placeholder="E-mail"
      name="email"
      :value="userData?.email"
    />
    <input
      class="payform-tinkoff-row"
      type="text"
      placeholder="Контактный телефон"
      name="phone"
      :value="userData?.phone"
    />
  </form>

  <slot :handler="clickHandler">
    <ui-button
      size="sm"
      outline
      :text-class="['text-accent']"
      @click="clickHandler"
    >
      {{ props.text }}
    </ui-button>
  </slot>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import { getSHA256Hash } from "boring-webcrypto-sha256";
import { useQuasar } from "quasar";
const $q = useQuasar();

export interface UserData {
  phone: string;
  email: string;
  name: string;
}

export interface GoodData {
  description: string;
  order: string;
}

export interface Props {
  amount: number;
  text?: string;
  userData?: UserData;
  orderData?: GoodData;
}

const props = defineProps<Props>();
const password = "l8w4z08uhfuj45tt";
const form = ref<HTMLElement>();
const TerminalKey = "1662547243585";

const clickHandler = async () => {
  if (!props.amount) return;

  const orderData = {
    TerminalKey: TerminalKey,
    Amount: props.amount + "00",
    Description: props.orderData?.description || "Оплата",
    OrderId: props.orderData?.order || 1234,
    // Token: token,
    DATA: {
      Phone: localStorage.getItem("userPhone") || "",
      Email: localStorage.getItem("userEmail") || "",
    },
    Receipt: {
      EmailCompany: "buh@itsportal.ru",
      Taxation: "osn",
      Email: localStorage.getItem("userEmail") || "",
      Phone: "+79127177910",
      Items: [
        {
          Name: props.orderData?.description || "Оплата",
          Price: props.amount + "00",
          Quantity: 1.0,
          Amount: props.amount + "00",
          PaymentMethod: "full_prepayment",
          PaymentObject: "service",
          Tax: "none",
        },
      ],
    },
  };

  const dataToToken = [
    { Amount: props.amount + "00" },
    { Description: props.orderData?.description || "Оплата" },
    { OrderId: props.orderData?.order || 1234 },
    { Password: password },
    { TerminalKey: TerminalKey },
  ];

  const tokenString = dataToToken.reduce((acc, el) => {
    return acc + Object.values(el)[0];
  }, "");

  // @ts-ignore
  const token = await getSHA256Hash(tokenString);
  const windowReference = window.open();

  try {
    const resp = await fetch("https://securepay.tinkoff.ru/v2/Init", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...orderData,
        Token: token,
      }),
    });

    const responce = await resp.json();

    // @ts-ignore
    windowReference.location = responce?.PaymentURL;
  } catch (error) {
    $q.notify({
      color: "negative",
      message: "Что то пошло не так",
    });
  }
};
</script>
<style lang="scss">
.payform-tinkoff-row {
  display: block;
  margin: 1%;
  width: 160px;
}
</style>
