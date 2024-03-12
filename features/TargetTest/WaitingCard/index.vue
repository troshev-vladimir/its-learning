<template>
  <div class="test-is-waiting base-block">
    <p class="text-h2">Тест на целевое обучение</p>
    <p class="text-body2 text-center">
      Сейчас мы проверяем ваш тест. Результат теста определит сможете ли вы
      пройти на целевое обучение.
    </p>
    <div class="row items-center q-gutter-md">
      <p class="text-bold text-blue-600">На проверке</p>
      <UiSpinnerIcon :style="`accent`" />
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.test-is-waiting {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
</style>
