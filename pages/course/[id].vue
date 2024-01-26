<template>
  <div class="course-page">
    <div class="course-page__container">
      <div class="course-page__header">
        <div class="header__left-side">
          <p class="text-h2">1С:Профессиональный разработчик</p>
          <div class="column items-center header__tracker-block">
            <ClientOnly>
              <UiBaseTracker class="tracker q-mb-sm" />
            </ClientOnly>
            <UiBaseButton
              type="link"
              size="small"
              prev-icon="fas fa-chart-line"
            >
              Трекер успеваемости
            </UiBaseButton>
          </div>
        </div>
        <p class="text-body1 text-bold text-blue-600">Завершен</p>
        <UiBaseAverageScore class="average-score" />
      </div>
      <div class="course-page__course-statistics-block">
        <MaterialCoveredCard
          :icon="['fas', 'check-square']"
          :statistic="statistics.tests"
          title="Тесты"
        />
        <MaterialCoveredCard
          :icon="['fas', 'video']"
          :statistic="statistics.tests"
          title="Видео"
        />
        <MaterialCoveredCard
          :icon="['fas', 'file-code']"
          :statistic="statistics.tests"
          title="Задания"
        />
      </div>
      <p class="course-page__access-mentor text-body2 text-gray-400">
        Доступ к наставнику до 20.08.2024
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'cabinet',
})

let statistics = {
  tests: {
    score: 1,
    total: 2,
  },
  video: {
    score: 1,
    total: 2,
  },
  tasks: {
    score: 1,
    total: 2,
  },
}
</script>

<style lang="scss">
.course-page {
  &__header,
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    gap: 16px;

    @media screen and (min-width: $breakpoint-xs) {
      gap: 0;
      flex-direction: row;
    }

    &__left-side {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;

      @media screen and (min-width: $breakpoint-xs) {
        align-items: start;
        width: 65%;
      }
    }

    &__tracker-block {
      width: 100%;
    }

    .tracker {
      width: 100%;
    }

    .average-score {
      align-items: flex-end;
    }
  }

  &__course-statistics-block {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 32px;
    margin-top: 32px;
    flex-wrap: wrap;

    @media screen and (min-width: $breakpoint-xs) {
      justify-content: flex-start;
    }
  }

  &__access-mentor {
    margin-top: 32px;
  }
}
</style>
