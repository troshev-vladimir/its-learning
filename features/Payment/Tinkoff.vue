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

  <slot :full-payment-link="fullPaymentLink">
    <ui-button size="sm" outline :text-class="['text-accent']">
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
const fullPaymentLink = ref<string>('')
const TerminalKey = '1662547243585'

interface OrderData {
  TerminalKey: string
  Amount: string
  Description: string
  OrderId: string | number
  DATA: {
    Phone: string
    Email: string
  }
  Receipt: {
    EmailCompany: string
    Taxation: string
    Email: string
    Phone: string
    Items: {
      Name: string
      Price: string
      Quantity: string | number
      Amount: string
      PaymentMethod: string
      PaymentObject: string
      Tax: string
    }[]
  }
  Token: string
}

const getOrderData = (): OrderData | void => {
  return {
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
    Token: '',
  }
}

const getOrderDataWithToken = async () => {
  const orderData = getOrderData()

  if (!orderData) return

  const { data } = await useFetch<string>('/api/payment/token', {
    method: 'POST',
    body: JSON.stringify(orderData),
  })

  if (!data.value) {
    throw new Error()
  }
  orderData.Token = data.value
  return orderData
}

const getFullPaymentUrl = async (orderData: OrderData) => {
  const responce = await fetch('https://securepay.tinkoff.ru/v2/Init', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      ...orderData,
    }),
  }).then((data) => data.json())

  if (!responce.Success) {
    throw new Error(responce.Message)
  }

  return responce?.PaymentURL
}

onMounted(async () => {
  try {
    const orderData = await getOrderDataWithToken()
    if (!orderData) throw new Error()
    const paymentUrl = await getFullPaymentUrl(orderData)
    if (!paymentUrl) throw new Error()
    fullPaymentLink.value = paymentUrl
  } catch (error: any) {
    $q.notify({
      color: 'negative',
      message: error?.message || 'Что то пошло не так',
    })
  }
})
</script>
<style lang="scss">
.payform-tinkoff-row {
  display: block;
  margin: 1%;
  width: 160px;
}
</style>
