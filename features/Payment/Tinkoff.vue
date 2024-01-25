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
import { ref, defineProps } from 'vue'
import { useQuasar } from 'quasar'
const $q = useQuasar()

export interface UserData {
  phone: string
  email: string
  name: string
}

export interface GoodData {
  description: string
  order: string
}

export interface Props {
  amount: number
  text?: string
  userData?: UserData
  orderData?: GoodData
}

const props = defineProps<Props>()
const form = ref<HTMLElement>()
const TerminalKey = '1662547243585'

async function clickHandler() {
  if (!props.amount) return

  let orderData = {
    TerminalKey: TerminalKey,
    Amount: props.amount + '00',
    Description: props.orderData?.description || 'Оплата',
    OrderId: String(Math.random()),
    DATA: {
      Phone: localStorage.getItem('userPhone') || '',
      Email: localStorage.getItem('userEmail') || '',
    },
    Receipt: {
      EmailCompany: 'buh@itsportal.ru',
      Taxation: 'osn',
      Email: localStorage.getItem('userEmail') || '',
      Phone: '+79127177910',
      Items: [
        {
          Name: props.orderData?.order || 'Оплата',
          Price: props.amount + '00',
          Quantity: 1.0,
          Amount: props.amount + '00',
          PaymentMethod: 'full_prepayment',
          PaymentObject: 'service',
          Tax: 'none',
        },
      ],
    },
  }

  const responce = await useFetch('api/payment/', {
    method: 'POST',
    body: JSON.stringify(orderData),
  })

  if (responce.data.value) {
    const resp = responce.data.value as { token: string }
    orderData = { ...orderData, ...{ Token: resp.token } }
  }

  try {
    const windowReference = window.open()

    const resp = await fetch('https://securepay.tinkoff.ru/v2/Init', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...orderData,
      }),
    })

    const responce = await resp.json()
    if (!responce.Success) {
      $q.notify({
        color: 'negative',
        message: responce.Message,
      })
    } else {
      // @ts-ignore
      windowReference.location = responce?.PaymentURL
    }
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: 'Что то пошло не так',
    })
  }
}
</script>
<style lang="scss">
.payform-tinkoff-row {
  display: block;
  margin: 1%;
  width: 160px;
}
</style>
