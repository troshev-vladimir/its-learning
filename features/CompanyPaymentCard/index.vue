<template>
  <div class="company-payment-card base-block">
    <div class="company-payment-card__container">
      <div class="company-payment-card__left-block">
        <p class="text-h2">Оплата курса</p>
        <div class="column">
          <p class="text-body2 q-mb-sm">Задолженность за период: 2973 ₽</p>
          <p class="text-body2">Оплатить до: 21.04.24</p>
        </div>
      </div>
      <div class="company-payment-card__right-block">
        <p class="text-body2">Общая задолженность:</p>
        <p class="text-h2">89 342 ₽</p>
      </div>
    </div>
    <div class="row q-mt-xs q-md-mt-md q-gutter-md">
      <UiBaseButton type="primary" size="small" class="q-mr-md">
        Оплатить текущий период
      </UiBaseButton>
      <UiBaseButton type="boarded" size="small">
        Перейти к рассрочке от банка
      </UiBaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.company-payment-card {
  &__container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &__left-block {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__right-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 8px;
    gap: 16px;

    @media acreen and (mi-width: $bp-xs) {
      margin-top: 0px;
      align-items: flex-end;
    }
  }
}
</style>
