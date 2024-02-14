<template>
  <div class="feature-auth-cabinet base-block">
    <div class="feature-auth-cabinet__contaner">
      <p class="text-h2">
        Вход в Личный кабинет <span class="text-blue-600">студента</span>
      </p>
      <UiBaseInput v-model="form.login" placeholder="Введите логин" />
      <UiBaseInput v-model="form.password" placeholder="Введите пароль" />
      <UiBaseButton size="small" class="feature-auth-cabinet__submit-button">
        Отправить
      </UiBaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const form = ref({ login: undefined, password: undefined })
</script>

<style lang="scss" scoped>
.feature-auth-cabinet {
  &__submit-button {
    width: 100%;
    margin-top: 24px;
  }
}
</style>
