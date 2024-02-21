<template>
  <div class="">
    <FeatureVerificationCode />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'cabinet',
})
const route = useRoute()
route.meta.pageTitle = 'UI-kit'
</script>
