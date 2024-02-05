<template>
  <div class="education-lesson-card">
    <div class="education-lesson-card__container">
      <div class="education-lesson-card__video">
        <div class="video__player"></div>
      </div>
      <div class="education-lesson-card__right-side">
        <p class="text-body2">
          Но многие известные личности являются только методом политического
          участия и преданы социально-демократической анафеме. Кстати, действия
          представителей оппозиции обнародованы. Высокий уровень вовлечения
          представителей целевой аудитории является четким доказательством
          простого факта: консультация с широким активом не даёт нам иного
          выбора, кроме определения как самодостаточных, так и внешне зависимых
          концептуальных решений.
        </p>
        <UiBaseButton type="link" size="small"> Презентация №1 </UiBaseButton>
        <UiBaseButton type="link" size="small"> Презентация №2 </UiBaseButton>
        <UiBaseButton type="primary" size="small"> Пройти тест </UiBaseButton>
        <UiBaseButton type="primary" size="small">
          Начать выполнение задания
        </UiBaseButton>
        <div class="education-lesson-card__result-block">
          <p class="text-body2">Задание получено: 20.01.2024</p>
          <p class="text-body2">Задание принято: 20.01.2024</p>
          <p class="text-body2">
            Результат выполнеия: <span class="text-blue-600">4</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.education-lesson-card {
  &__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    column-gap: 40px;
    row-gap: 16px;

    @include media($bp-md) {
      flex-direction: row;
    }
  }

  &__right-side {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    width: 100%;

    @include media($bp-md) {
      width: 50%;
    }
  }

  &__video {
    width: 100%;

    @include media($bp-md) {
      width: 50%;
    }
  }

  .video__player {
    overflow: hidden;
    border-radius: 8px;
    background: $gray-500;
    padding-bottom: 50%;
  }
}
</style>
