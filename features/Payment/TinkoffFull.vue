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
import { useQuasar } from 'quasar'
import type { User } from '~/api/user'
import { api } from '~/api'
import type { TinkoffParams } from '~/api/paymentParams/types'
const $q = useQuasar()

export interface UserData {
  id: string
  email: string
  name: string
}

export interface GoodData {
  description: string
  order: string
}

const props = defineProps<{
  amount: number
  userData: User
  orderData?: GoodData
}>()

const form = ref<HTMLElement>()

async function clickHandler() {
  if (!props.amount || !props.userData.id) return

  try {
    const windowReference = window.open()
    const paramsFromServer: TinkoffParams = await api.payment.getPaymentParams(
      props.userData.id
    )
    const resp = await fetch('https://securepay.tinkoff.ru/v2/Init', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...paramsFromServer,
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
