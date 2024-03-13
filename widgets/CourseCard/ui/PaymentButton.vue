<template>
  <div class="payment-button">
    <UiBaseButton
      class="payment-button__button"
      type="primary"
      size="small"
      @click="changePaymentPopupOpenStatus"
    >
      Оплатить
    </UiBaseButton>
    <ClientOnly>
      <UiBasePopup v-model="paymentPopup">
        <FeaturePaymentCard ref="paymentCardEl" />
      </UiBasePopup>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { FeaturePaymentCard } from '#components'

const paymentCardEl = ref<InstanceType<typeof FeaturePaymentCard>>()
const paymentPopup = ref(false)

const changePaymentPopupOpenStatus = () => {
  paymentPopup.value = !paymentPopup.value
}
</script>

<script lang="ts">
export default {}
</script>

<style lang="scss" scoped>
.payment-button {
  width: 100%;

  @include media($bp-sm) {
    width: fit-content;
  }

  &__button {
    width: 100%;

    @include media($bp-sm) {
      width: fit-content;
    }
  }
}
</style>
