<template>
  <div>
    <UiBaseButton
      class="course-card__button"
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
