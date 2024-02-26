<template>
  <UiExpancionItem
    class="education-lesson-accordion base-block base-shadow"
    :model-value="isOpen"
  >
    <template #header>
      <div class="education-lesson-accordion__header" @click="toggleAccordion">
        <div class="header__left-side">
          <ClientOnly>
            <font-awesome-icon
              icon="fas fa-chevron-down"
              class="education-lesson-accordion__toggle-icon"
              :class="{ open: isOpen }"
            />
          </ClientOnly>
        </div>
        <div class="header__right-side">
          <div>
            <p class="text-body1 text-bold">{{ lessonPrewiew.title }}</p>
            <p class="text-body2">
              Пройти урок до: {{ lessonPrewiew.edgeDate }}
            </p>
          </div>
          <!-- <UiBaseAverageScore
            v-if="lessonPrewiew.passed"
            :has-tip="false"
            :value="lessonPrewiew."
            class="education-lesson-accardion__average-score"
          /> -->
          <p v-if="lessonPrewiew.passed">Зачет</p>
        </div>
      </div>
    </template>
    <template #default>
      <div class="education-lesson-accordion__content">
        <slot></slot>
      </div>
    </template>
  </UiExpancionItem>
</template>

<script lang="ts" setup>
import type { LessonPreview } from '~/api/cource'

interface Props {
  lessonPrewiew: LessonPreview
}
const props = withDefaults(defineProps<Props>(), {})

const isOpen = ref(false)

const toggleAccordion = () => {
  isOpen.value = !isOpen.value
}
</script>

<style lang="scss" scoped>
.education-lesson-accordion {
  padding: 0;

  &__header,
  .header {
    display: flex;
    align-items: center;

    &__left-side {
      padding: 24px;

      * {
        color: $gray-300;
        font-size: 24px;
      }
    }

    &__right-side {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 24px 8px 0;
    }
  }

  &__toggle-icon {
    transition: 0.5s;
    &.open {
      transform: rotate(-180deg);
    }
  }

  &__average-score {
    align-items: end;
  }

  &__content {
    padding: 16px;
  }
}
</style>
