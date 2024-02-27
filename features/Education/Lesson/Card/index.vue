<template>
  <div v-if="!isLoading" class="education-lesson-card">
    <div class="education-lesson-card__container">
      <div v-if="lesson?.video" class="education-lesson-card__video">
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
          v-if="
            !(lesson as LessonWithTest)?.testResult &&
            (lesson as LessonWithTest)?.test
          "
          type="primary"
          size="small"
        >
          Пройти тест
        </UiBaseButton>
        <div
          v-if="(lesson as LessonWithTest)?.testResult"
          class="row justify-between q-gutter-sm"
        >
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
          <p
            v-if="(lesson as LessonWithTask).task.receptDate"
            class="text-body2"
          >
            Задание получено: {{ (lesson as LessonWithTask).task.receptDate }}
          </p>
          <p
            v-if="
              !(lesson as LessonWithTask).task.result &&
              (lesson as LessonWithTask).task.acceptanceDate
            "
            class="text-body2 text-gray-500"
          >
            На проверке у наставника
          </p>
          <p v-if="(lesson as LessonWithTask).task.result" class="text-body2">
            Результат выполнеия:
            <span class="text-blue-600">
              {{ (lesson as LessonWithTask).task.result }}
            </span>
          </p>
          <p
            v-if="(lesson as LessonWithTask).task.acceptanceDate"
            class="text-body2"
          >
            Задание принято:
            {{ (lesson as LessonWithTask).task.acceptanceDate }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <Skeleton v-else />
</template>

<script lang="ts" setup>
import Skeleton from './skeleton.vue'
import type { LessonWithTask, LessonWithTest } from '~/types'

interface Props {
  lesson?: LessonWithTest | LessonWithTask
}

defineProps<Props>()

const isLoading = ref<boolean>(false)
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
      width: auto;
    }
  }

  &__video {
    width: 100%;
    max-height: 100%;

    @include media($bp-md) {
      min-width: 50%;
    }
  }

  .video__player {
    overflow: hidden;
    border-radius: 8px;
    background: $gray-500;
    padding-bottom: 50%;
  }

  &__result-block {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    row-gap: 8px;

    @include media($bp-xs) {
      grid-template-columns: repeat(2, 1fr);

      > *:nth-child(2n) {
        align-self: end;
        text-align: end;
      }
    }
  }
}
</style>
