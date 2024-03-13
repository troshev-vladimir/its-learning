<template>
  <div class="">
    <FeatureChatBaseItem />
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
