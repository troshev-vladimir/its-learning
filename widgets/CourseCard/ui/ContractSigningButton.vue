<template>
  <div>
    <UiBaseButton
      type="primary"
      size="small"
      @click="() => (contractSigning = true)"
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
