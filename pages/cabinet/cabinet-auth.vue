<template>
  <div class="page-cabinet-auth">cabinet auth</div>
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
<style lang="scss" module></style>
