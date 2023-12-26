<template>
  <div :class="$style['auth-container']">
    <h1 class="text-h1 q-mb-xs text-center">Авторизуйтесь</h1>
    <p class="q-mb-md text-body2 text-center">
      чтобы мы могли сохранить игровой процесс
    </p>
    <FeatureAuthViaPhoneAndPin />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "empty",
});

useSeoMeta({
  title: "Авторизация",
  ogTitle: "Авторизация",
  description: "Авторизация",
  ogDescription: "Авторизация",
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image",
});
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

<style>
.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s ease-in;
}

.slide-fade-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
