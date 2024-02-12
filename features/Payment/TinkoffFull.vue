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
      :value="orderData.id"
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
    <UiBaseButton
      size="small"
      outline
      :text-class="['text-accent']"
      @click="clickHandler"
    >
      купить
    </UiBaseButton>
  </slot>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import type { User } from '~/api/user'
import { api } from '~/api'
import type { TinkoffParams } from '~/api/paymentParams/types'
import { useNotification } from '@kyvg/vue3-notification'
const { notify } = useNotification()

export interface UserData {
  id: string
  email?: string
  name?: string
  phone?: string
}

export interface OrderData {
  id: string
  description?: string
}

const props = defineProps<{
  amount: number
  userData: User
  orderData: OrderData
}>()

const form = ref<HTMLElement>()

async function clickHandler() {
  if (!props.amount || !props.userData.id) return

  try {
    const paramsFromServer: TinkoffParams = await api.payment.getPaymentParams({
      userId: props.userData.id,
      orderId: props.orderData.id,
    })

    const resp = await fetch('https://securepay.tinkoff.ru/v2/Init', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...paramsFromServer,
      }),
    })

    const windowReference = window.open()
    const responce = await resp.json()

    if (!responce.Success) {
      notify({
        color: 'negative',
        message: responce.Message,
      })
    } else {
      // @ts-ignore
      windowReference.location = responce?.PaymentURL
    }
  } catch (error: any) {
    console.log(error)

    notify({
      title: error.message,
      text: error.description,
      data: {
        auth: error.statusCode === 401 || error.statusCode === 403,
      },
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
