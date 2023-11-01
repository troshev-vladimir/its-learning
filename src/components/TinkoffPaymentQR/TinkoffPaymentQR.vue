<template>
  <form
    ref="form"
    name="TinkoffPayForm"
    style="visibility: hidden; position: absolute"
  >
    <input
      class="tinkoffPayRow"
      type="hidden"
      name="terminalkey"
      :value="TerminalKey"
    />
    <input class="tinkoffPayRow" type="hidden" name="language" value="ru" />
    <input
      class="tinkoffPayRow"
      type="text"
      placeholder="Сумма заказа"
      name="amount"
      :value="props.amount"
      required
      min="10.00"
    />
    <input
      class="tinkoffPayRow"
      type="text"
      placeholder="Номер заказа"
      name="order"
      :value="orderData?.order"
    />
    <input
      class="tinkoffPayRow"
      type="text"
      placeholder="Описание заказа"
      :value="orderData?.description"
      name="description"
    />
    <input
      class="tinkoffPayRow"
      type="text"
      placeholder="ФИО плательщика"
      :value="userData?.name"
      name="name"
    />
    <input
      class="tinkoffPayRow"
      type="text"
      placeholder="E-mail"
      :value="userData?.email"
      name="email"
    />
    <input
      class="tinkoffPayRow"
      type="text"
      placeholder="Контактный телефон"
      :value="userData?.phone"
      name="phone"
    />
  </form>
  <div id="tinkoffWidgetContainer1">
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
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";

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

// const password = "l8w4z08uhfuj45tt";
const form = ref<HTMLElement>();
const TerminalKey = "1662547243585";

const clickHandler = async () => {
  const widgetParameters = {
    terminalKey: TerminalKey,
    paymentItems: [
      {
        container: document.getElementById("tinkoffWidgetContainer1"),
        paymentInfo: function () {
          return {
            paymentData: form.value,
          };
        },
      },
    ],
    paymentSystems: { TinkoffFps: {} },
  };
  // @ts-ignore
  // eslint-disable-next-line no-undef
  initPayments(widgetParameters);

  // const orderData = {
  //   TerminalKey: TerminalKey,
  //   Amount: props.amount + "00",
  //   Description: props.orderData?.description || "Оплата",
  //   OrderId: props.orderData?.order || 1234,
  //   // Token: token,
  //   DATA: {
  //     Phone: localStorage.getItem("userPhone") || "",
  //     Email: localStorage.getItem("userEmail") || "",
  //   },
  //   Receipt: {
  //     EmailCompany: "buh@itsportal.ru",
  //     Taxation: "osn",
  //     Email: localStorage.getItem("userEmail") || "",
  //     Phone: "+79127177910",
  //     Items: [
  //       {
  //         Name: props.orderData?.description || "Оплата",
  //         Price: props.amount + "00",
  //         Quantity: 1.0,
  //         Amount: props.amount + "00",
  //         PaymentMethod: "full_prepayment",
  //         PaymentObject: "service",
  //         Tax: "none",
  //       },
  //     ],
  //   },
  // };
  // const resp = await fetch("https://securepay.tinkoff.ru/v2/InitPayments", {
  //   method: "post",
  //   headers: {
  //     "content-type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     container: "tinkoffWidgetContainer1",
  //     TerminalKey: TerminalKey,
  //     paymentInfo: orderData,
  //     paymentItems: [],
  //     paymentSystems: { TinkoffPay: {} },
  //   }),
  // });

  // console.log(await resp.json());
};
</script>

<style></style>
