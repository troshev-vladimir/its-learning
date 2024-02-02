<template>
  <UiExpancionItem
    class="education-module-accordion base-shadow"
    :model-value="modelValue"
    :class="value.status"
    :disabled="value.status === 'locked'"
  >
    <template #header>
      <div
        ref="accordion"
        class="education-module-accordion__header"
        @click="onClickHeader"
      >
        <div class="header__left-side">
          <span class="header__toggle-icon" :class="{ open: modelValue }">
            <ClientOnly>
              <font-awesome-icon icon="fas fa-chevron-down" />
            </ClientOnly>
          </span>
        </div>
        <div class="header__right-side">
          <p class="text-h2">{{ value.title }}</p>

          <p
            v-if="value.status === 'active'"
            class="text-body2 education-module-accordion__progress"
          >
            1/10 уроков пройдено
          </p>
          <ClientOnly>
            <font-awesome-icon
              v-if="value.status === 'locked'"
              icon="fas fa-lock"
            />
          </ClientOnly>
          <UiBaseAverageScore
            v-if="value.status === 'ended'"
            :has-tip="false"
            class="education-module-accordion__average-score"
          />
        </div>
      </div>
    </template>
    <template #default>
      <div class="education-module-accordion__container">
        <slot></slot>
      </div>
    </template>
  </UiExpancionItem>
</template>

<script lang="ts" setup>
interface EducationModule {
  id?: string
  title?: string
  status?: 'active' | 'locked' | 'ended'
}
interface Props {
  value?: EducationModule
  index?: number
  modelValue?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  value: () => ({
    id: '123',
    title: 'Название модуля',
    status: 'active',
  }),
  modelValue: false,
})

const router = useRouter()
const route = useRoute()
const accordion = ref<HTMLElement | null>(null)

onMounted(async () => {
  setTimeout(() => {
    if (accordion.value && props.modelValue) {
      const element = accordion.value.getBoundingClientRect()
      const top = element.y
      const height = element.height
      window.scroll({ top: top + height, behavior: 'smooth' })
    }
  }, 0)
})

const onClickHeader = () => {
  router.replace({ query: { module: props.value.id } })
}
</script>

<style lang="scss" scoped>
.education-module-accordion {
  border-radius: $radius;
  overflow: hidden;
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
  }
}
</style>
