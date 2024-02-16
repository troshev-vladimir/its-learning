<template>
  <div class="page-404">
    <div class="page-404__container">
      <p class="page-404__title text-bold">{{ error?.statusCode }}</p>
      <p class="page-404__message text-body1">{{ error?.message }} 😞</p>
      <NuxtLink to="/cabinet">
        <UiBaseButton class="page-404__button" @click="handleError">
          На главную
        </UiBaseButton>

        <UiBaseButton
          v-if="error?.statusCode === 403 || error?.statusCode === 401"
          class="page-404__button"
          @click="handleUnauthorized"
        >
          Авторизоваться
        </UiBaseButton>
      </NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/cabinet' })
const handleUnauthorized = () => clearError({ redirect: '/cabinet-auth' })
</script>

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
