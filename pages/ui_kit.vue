<template>
  <button @click="modal = true">poopup</button>

  <UiBasePopup v-model="modal">
    <FeatureCV></FeatureCV>
  </UiBasePopup>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'cabinet',
})

const modal = ref(false)
</script>

<style></style>
