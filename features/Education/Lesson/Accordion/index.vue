<template>
  <UiExpancionItem
    class="education-lesson-accordion base-shadow"
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
            <p class="text-body1 text-bold">{{ localValue.title }}</p>
            <p class="text-body2">Пройти урок до: {{ localValue.edgeDate }}</p>
          </div>

          <p
            v-if="localValue.status === 'result' && localValue.type === 'task'"
          >
            {{ localValue.result }}
          </p>
          <p
            v-if="localValue.status === 'result' && localValue.type === 'test'"
          >
            Зачет
          </p>
        </div>
      </div>
    </template>
    <template #default>
      <div class="education-lesson-accordion__content">
        <FeatureEducationLessonCard
          :is-loading="isLessonLoadding"
          :lesson="lesson"
        />
      </div>
    </template>
  </UiExpancionItem>
</template>

<script lang="ts" setup>
import type { LessonPreview, CourceLesson } from '~/api/cource'
import { api } from '~/api'

interface Props {
  modelValue: LessonPreview
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const isLessonLoadding = ref(false)
const lesson = ref<CourceLesson>()

const localValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const toggleAccordion = () => {
  isOpen.value = !isOpen.value

  if (isOpen.value && !lesson.value) {
    fetchLesson(localValue.value.id)
  }
}

const fetchLesson = async (id: string) => {
  isLessonLoadding.value = true
  lesson.value = await api.cource.getLesson(id)
  isLessonLoadding.value = false
}
</script>

<style lang="scss" scoped>
.education-lesson-accordion {
  padding: 0;
  border-radius: 8px;

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
