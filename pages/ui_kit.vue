<template>
  <FeaturePaymentCard />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'cabinet',
})
const route = useRoute()
route.meta.pageTitle = 'UI -kit'
</script>

<style lang="scss"></style>
