<template>
  <div class="page-cabinet-auth">
    <FeatureAuthCabinet />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'empty',
})

const route = useRoute()
route.meta.pageTitle = 'Вход в личный кабинет'

useSeoMeta({
  title: 'Вход ',
})
</script>
<style lang="scss" scoped>
.page-cabinet-auth {
  width: 100%;
  height: 100vh;
  margin: auto;
}
</style>
