<template>
  <div class="row auth">
    <div class="col-6">
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
.auth {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
