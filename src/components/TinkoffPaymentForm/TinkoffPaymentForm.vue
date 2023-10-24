<template>
  <form
    ref="form"
    name="payform-tinkoff"
    style="visibility: hidden; position: absolute"
  >
    <input
      class="payform-tinkoff-row"
      type="hidden"
      name="terminalkey"
      value="24926751"
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

const form = ref<HTMLElement>();

const clickHandler = () => {
  if (!props.amount) return;

  // @ts-ignore
  const { description, amount, email, phone, receipt } = form.value;

  if (receipt) {
    if (!email.value && !phone.value)
      return alert("Поле E-mail или Phone не должно быть пустым");
    // @ts-ignore
    form.value.receipt.value = JSON.stringify({
      EmailCompany: "mail@mail.com",
      Taxation: "patent",
      Items: [
        {
          Name: description.value || "Оплата",
          Price: amount.value + "00",
          Quantity: 1.0,
          Amount: amount.value + "00",
          PaymentMethod: "full_prepayment",
          PaymentObject: "service",
          Tax: "none",
        },
      ],
    });
  }

  // @ts-ignore
  window.pay(form.value);
};
</script>
<style lang="scss">
.payform-tinkoff-row {
  display: block;
  margin: 1%;
  width: 160px;
}
</style>
