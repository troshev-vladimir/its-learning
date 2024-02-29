<template>
  <div class="">
    <UiBaseButton
      type="primary"
      size="big"
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

<script setup lang="ts">
definePageMeta({
  layout: 'cabinet',
})
const route = useRoute()
route.meta.pageTitle = 'UI-kit'

const contractSigning = ref(false)
</script>
