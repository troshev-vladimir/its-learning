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
        <template #default>
          <FeaturePaymentCard v-if="paymentPopup" />
        </template>
      </UiBasePopup>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
const paymentPopup = ref(false)
const changePaymentPopupOpenStatus = () => {
  paymentPopup.value = !paymentPopup.value
}
</script>
