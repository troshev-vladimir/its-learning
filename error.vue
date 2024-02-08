<template>
  <div class="page-404">
    <div class="page-404__container">
      <p class="page-404__title text-bold">404</p>
      <p class="page-404__message text-body1">
        Такой страницы не существует 😞
      </p>
      <NuxtLink to="/cabinet">
        <UiBaseButton class="page-404__button"> На главную </UiBaseButton>
      </NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup></script>

<style lang="scss" scoped>
.page-404 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  &__title {
    font-size: 124px;
    margin: auto;
    width: fit-content;
  }

  &__message {
    margin: 32px 0;
  }

  &__button {
    margin: auto;
  }
}
</style>
