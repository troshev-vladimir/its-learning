<template>
  <UiExpancionItem
    class="education-module-accordion base-shadow"
    :model-value="isOpen"
    :class="localValue.status"
    :disabled="localValue.status === 'locked'"
  >
    <template #header>
      <div
        ref="accordion"
        class="education-module-accordion__header"
        @click="onClickHeader"
      >
        <div class="header__left-side">
          <span class="header__toggle-icon" :class="{ open: localValue }">
            <UiBaseIcon
              width="24px"
              height="24px"
              font-size="24px"
              radius="4px"
              icon="fas fa-chevron-down"
            />
          </span>
        </div>
        <div class="header__right-side">
          <p class="text-h2">{{ localValue.title }}</p>

          <p
            v-if="localValue.status === 'active'"
            class="text-body2 education-module-accordion__progress"
          >
            {{ localValue.lessonsPreviews.passed }}/{{
              localValue.lessonsPreviews.count
            }}
            уроков пройдено
          </p>
          <ClientOnly>
            <font-awesome-icon
              v-if="localValue.status === 'locked'"
              icon="fas fa-lock"
            />
          </ClientOnly>
          <UiBaseAverageScore
            v-if="localValue.status === 'ended'"
            :has-tip="false"
            :value="localValue.averageScore"
            class="education-module-accordion__average-score"
          />
        </div>
      </div>
    </template>
    <template #default>
      <div class="education-module-accordion__container" @click.prevent>
        <FeatureEducationLessonAccordion
          v-for="(lessonPrewiew, index) in localValue.lessonsPreviews.value"
          :key="index"
          class="accordion-lesson"
          :lesson-prewiew="lessonPrewiew"
        >
        </FeatureEducationLessonAccordion>
      </div>
    </template>
  </UiExpancionItem>
</template>
<script lang="ts" setup>
import type { CourceModule } from '~/api/cource/types'
interface Props {
  modelValue: CourceModule
  isOpen: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
})

const emit = defineEmits(['update:modelValue'])

const router = useRouter()
const accordion = ref<HTMLElement | null>(null)

const localValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

onMounted(async () => {
  setTimeout(() => {
    if (accordion.value && localValue) {
      const element = accordion.value.getBoundingClientRect()
      const top = element.y
      const height = element.height
      window.scroll({ top: top + height, behavior: 'smooth' })
    }
  }, 0)
})

const onClickHeader = () => {
  router.replace({ query: { module: localValue.value.id } })
}
</script>

<style lang="scss" scoped>
.education-module-accordion {
  border-radius: $radius;
  background: $white;

  &__header,
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__toggle-icon {
      display: block;
      padding: 24px;
      transition: 0.5s;

      @include media($bp-xs) {
        padding: 32px;
      }

      * {
        font-size: 24px;
      }

      &.open {
        transform: rotate(-180deg);
      }
    }

    &__left-side {
      display: flex;
      align-items: center;
    }

    &__right-side {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1 1 auto;
      flex-wrap: wrap;
      column-gap: 16px;
      row-gap: 4px;
      padding: 16px;

      @include media($bp-xs) {
        padding-right: 32px;
      }
    }
  }

  &.active &__header * {
    color: $blue-600;
  }

  &.locked &__header * {
    color: $blue-300;
  }

  &.ended &__header * {
    color: $gray-300;

    .education-module-accordion__progress {
      color: $gray-300 !important;
    }
  }

  &__progress {
    color: $gray-900 !important;
    word-wrap: break-word;
    text-align: right;
  }

  &__average-score {
    align-items: flex-end;
  }

  &__container {
    padding: 16px;

    .accordion-lesson {
      &:not(:last-child) {
        margin-bottom: 16px;
      }
    }
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    background: $white;
    border-radius: 8px;
  }
}
</style>
