<template>
  <div :class="$style['auth-container']">
    <WidgetAuth />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'empty',
})

useSeoMeta({
  title: 'Авторизация',
  ogTitle: 'Авторизация',
  description: 'Авторизация',
  ogDescription: 'Авторизация',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>

<style lang="scss" module>
.auth-container {
  display: flex;
  flex-direction: column;
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
