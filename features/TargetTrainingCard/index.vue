<template>
  <div class="target-training-card base-block">
    <div class="target-training-card__container">
      <p class="text-h2">Тест на целевое обучение</p>
      <p class="text-body2">
        Пройдите тестирование и получите возможность бесплатного целевого
        обучения на курсе. Тестирование состоит из двух онлайн тестов и
        персонального интервью, дата которого будет назначена вашим менеджером
        после обработки результатов онлайн теста.
      </p>
      <NuxtLink to="/target-test">
        <UiBaseButton type="primary" size="big">
          Пройти тестирование
        </UiBaseButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.target-training-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: $md;
  flex-wrap: wrap;

  @media screen and (min-width: $bp-xs) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  &__results-block {
    display: flex;
    align-items: center;
    column-gap: 40px;
  }
}
</style>
