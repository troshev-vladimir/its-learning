<template>
  <div class="contract-signing-button">
    <UiBaseButton
      type="primary"
      size="small"
      @click="() => (contractSigning = true)"
      class="contract-signing-button__button"
    >
      Подписать договор
    </UiBaseButton>
    <UiBasePopup v-model="contractSigning">
      <template #default>
        <ClientOnly>
          <WidgetContractSigning :docs="[{ name: 'Договор', link: '' }]" />
        </ClientOnly>
      </template>
    </UiBasePopup>
  </div>
</template>

<script lang="ts" setup>
const contractSigning = ref(false)
</script>

<script lang="ts">
export default {}
</script>

<style lang="scss" scoped>
.contract-signing-button {
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
