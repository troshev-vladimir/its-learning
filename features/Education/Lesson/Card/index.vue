<template>
  <transition name="fade" mode="out-in" :duration="{ enter: 0, leave: 200 }">
    <div v-if="!isLoading" class="education-lesson-card">
      <div class="education-lesson-card__container">
        <div v-if="lesson?.videoLink" class="education-lesson-card__video">
          <video class="video__player" controls>
            <source :src="lesson.videoLink" type="video/mp4" />
          </video>
        </div>
        <div class="education-lesson-card__right-side">
          <p class="text-body2">
            {{ lesson?.text }}
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
            v-if="lesson?.status === 'studying' && lesson?.testID"
            type="primary"
            size="small"
            @click="isTest = true"
          >
            Пройти тест
          </UiBaseButton>
          <UiBaseButton
            v-if="lesson?.status === 'studying' && lesson?.taskID"
            type="primary"
            size="small"
          >
            Начать выполнение задания
          </UiBaseButton>
          <div class="row justify-between q-gutter-sm">
            <p
              v-for="(item, index) in lesson?.legend"
              :key="index"
              class="text-body2"
            >
              {{ item.title }} : {{ item.date }}
            </p>

            <p
              v-if="lesson?.status === 'result' && lesson?.result"
              class="text-body2"
            >
              Результат выполнеия:
              <span class="text-blue-600">
                {{ lesson?.result }}
              </span>
            </p>
            <p v-if="lesson?.status === 'exam'">
              Вы приступили к выполнению задания, время ограничено
            </p>
            <p v-if="lesson?.status === 'verification'">
              Задание на проверке. Ожидайте
            </p>
          </div>
        </div>

        <!-- <UiBasePopup v-model="isTest">
          <template #default>
            <FeatureTest
              class="education-lesson-card__test"
              @submit="() => (isTest = false)"
            />
          </template>
        </UiBasePopup> -->
      </div>
    </div>
    <Skeleton v-else />
  </transition>
</template>

<script lang="ts" setup>
import type { CourceLesson } from '~/api/cource/types'
import Skeleton from './skeleton.vue'

defineProps<{
  lesson?: CourceLesson
  isLoading: boolean
}>()

const isTest = ref(false)
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
    max-height: 100%;

    @include media($bp-md) {
      width: 50%;
    }
  }

  .video__player {
    display: block;
    width: 100%;
    border-radius: 8px;
    background: $gray-500;
  }

  &__test {
    overflow: auto;
    max-height: inherit;
  }
}
</style>
