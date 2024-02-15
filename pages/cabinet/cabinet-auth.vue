<template>
  <div class="cabinet-authorization-page row auth">
    <div class="cabinet-authorization-page__content col-6">
      <div class="base-block">
        <FeatureAuthCabinet />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'empty',
})

useSeoMeta({
  title: 'Вход ',
})
</script>
<style lang="scss" scoped>
.cabinet-authorization-page {
  height: 100vh;
  margin: auto;

  &__content {
    margin: auto;
  }
}
</style>
