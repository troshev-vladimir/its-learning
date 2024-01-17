<script lang="ts" setup></script>

<template>
  <div class="course-card base-block">
    <div class="course-card__container">
      <div class="course-card__left-side">
        <p class="text-h2">1С:Профессиональный разработчик</p>
        <p class="text-body2 text-gray-600">Бесплатный период на 31 день</p>
        <p class="text-body2 text-gray-600">
          Предоставлен академический отпуск до 27.12.2024
        </p>
        <p>
          Средний балл
          <span class="text-body1 text-bold"> 4.00 </span>
        </p>
      </div>
      <div class="course-card__right-side">
        <UiBaseButton class="course-card__button" type="primary" size="small">
          Приступить к обучению
        </UiBaseButton>
        <UiBaseButton class="course-card__button" type="boarded" size="small">
          Запросить академический отпуск
        </UiBaseButton>
        <div class="course-card__link-list">
          <UiBaseButton type="external-link" size="small">
            Договор
          </UiBaseButton>
          <UiBaseButton type="external-link" size="small">
            Приложение 1
          </UiBaseButton>
          <UiBaseButton type="external-link" size="small">
            Приложение 2
          </UiBaseButton>
          <UiBaseButton type="external-link" size="small">
            Приложение 3
          </UiBaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.course-card {
  &__container {
    @media (min-width: 820px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__right-side,
  &__left-side {
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (min-width: 820px) {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }

  &__right-side {
    margin-top: 16px;
    @media (min-width: 820px) {
      align-items: flex-end;
    }
  }

  &__link-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;

    @media (min-width: $breakpoint-xs) {
      justify-content: flex-end;
    }
  }

  &__button {
    width: 100% !important;

    @media (min-width: $breakpoint-xs) {
      width: fit-content !important;
    }
  }
}
</style>
