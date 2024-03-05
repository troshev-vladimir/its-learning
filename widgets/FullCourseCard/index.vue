<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="!isLoading" class="full-course-card">
        <div class="full-course-card__content">
          <div class="full-course-card__left-side">
            <p class="text-h2">{{ course?.title }}</p>
            <div class="column items-center full-course-card__tracker-block">
              <ClientOnly>
                <UiBaseTracker
                  :value="course?.progress"
                  class="tracker q-mb-sm"
                />
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
          <p v-if="course?.isEnded" class="text-body1 text-bold text-blue-600">
            Завершен
          </p>
          <UiBaseAverageScore
            class="average-score"
            :value="course?.averageScore"
          />
        </div>
        <div class="full-course-card__statistics">
          <MaterialCoveredCard
            v-if="course?.statistics.tests"
            :icon="['fas', 'check-square']"
            :statistic="course?.statistics.tests"
            title="Тесты"
          />
          <MaterialCoveredCard
            v-if="course?.statistics.video"
            :icon="['fas', 'video']"
            :statistic="course?.statistics.video"
            title="Видео"
          />
          <MaterialCoveredCard
            v-if="course?.statistics.tasks"
            :icon="['fas', 'file-code']"
            :statistic="course?.statistics.tasks"
            title="Задания"
          />
        </div>
      </div>
      <Skeleton v-else />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import type { CourceFull } from '~/api/cource/types'
import Skeleton from './skeleton.vue'

interface Props {
  course?: CourceFull
  isLoading?: boolean
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
})
</script>

<style lang="scss" scoped>
.full-course-card {
  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    gap: 16px;

    @media screen and (min-width: $bp-xs) {
      gap: 0;
      flex-direction: row;
    }
  }

  &__left-side {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    @media screen and (min-width: $bp-xs) {
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
    align-items: center;

    @include media($bp-xs) {
      align-items: flex-end;
    }
  }

  &__statistics {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 32px;
    margin-top: 32px;
    flex-wrap: wrap;

    @media screen and (min-width: $bp-xs) {
      justify-content: flex-start;
    }
  }
}
</style>
