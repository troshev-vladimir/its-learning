<template>
  <div class="q-mb-xl">
    <span class="text-body1 text-secondary">
      Для тех кто уверен в своих возможностях
    </span>
    <h1 class="text-h1 q-mt-md q-mb-lg">
      Получай знания и навыки
      <br />
      <span class="text-accent">так как удобно тебе</span>
    </h1>
    <FeatureBonusCache class="q-mb-lg q-mt-md" />
    <FeaturePrograms />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Покупка программы',
  ogTitle: 'Покупка программы',
  description: 'Покупка программы',
  ogDescription: 'Покупка программы',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>

<style lang="scss">
.app {
  color: red;
}
</style>
