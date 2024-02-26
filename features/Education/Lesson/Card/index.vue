<template>
  <div class="education-lesson-card">
    <div class="education-lesson-card__container">
      <div class="education-lesson-card__video">
        <div class="video__player"></div>
      </div>
      <div class="education-lesson-card__right-side">
        <p class="text-body2">
          {{ lesson?.description }}
        </p>
        <UiBaseButton
          v-for="(doc, i) in lesson?.presentations"
          :key="i"
          type="link"
          size="small"
        >
          {{ doc.name }}
        </UiBaseButton>
        <UiBaseButton
          v-if="!(lesson as LessonWithTest)?.testResult"
          type="primary"
          size="small"
        >
          Пройти тест
        </UiBaseButton>
        <div v-else class="row justify-between q-gutter-sm">
          <p class="">
            Тестирование пройдено:
            {{ (lesson as LessonWithTest)?.comletionDate }}
          </p>
          <p class="">
            Результат теста:
            <span class="text-blue">
              {{ (lesson as LessonWithTest)?.testResult }}
            </span>
          </p>
        </div>
        <UiBaseButton
          v-if="(lesson as LessonWithTask)?.task"
          type="primary"
          size="small"
        >
          Начать выполнение задания
        </UiBaseButton>

        <div
          v-if="(lesson as LessonWithTask)?.task"
          class="education-lesson-card__result-block"
        >
          <p class="text-body2">
            Задание получено: {{ (lesson as LessonWithTask)?.task.receptDate }}
          </p>
          <p class="text-body2">
            Задание принято:
            {{ (lesson as LessonWithTask)?.task.acceptanceDate }}
          </p>
          <p class="text-body2">
            Результат выполнеия:
            <span class="text-blue-600">
              {{ (lesson as LessonWithTask)?.task.result }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LessonWithTask, LessonWithTest } from '~/types'

interface Props {
  lesson?: LessonWithTest | LessonWithTask
}

defineProps<Props>()
</script>

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
