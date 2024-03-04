<template>
  <div class="question-card">
    <div class="question-card__container">
      <div
        class="question-card__question-block"
        :class="{ 'with-image': question.image }"
      >
        <div class="question-card__question-image-container">
          <img
            v-if="question.image"
            :src="question.image"
            alt=""
            class="question-card__question-image"
          />
        </div>
        <div class="question-card__question-container">
          <p class="question-card__question text-body2">
            {{ question.text }}
            <span
              v-if="question?.required"
              v-tippy="{ content: 'Это обзательный вопрос' }"
              class="text-body1 text-red-400"
            >
              *
            </span>
          </p>
        </div>
      </div>
      <div
        v-if="!question.multiple && !Array.isArray(checkedAnswer)"
        class="question-card__answers-block"
      >
        <UiBaseRadio
          v-for="(answer, i) in question.variants"
          :key="i"
          v-model="checkedAnswer"
          :value="answer.id"
          :name="answer.id"
        >
          <p class="text-body2">
            {{ answer.text }}
          </p>
        </UiBaseRadio>
      </div>
      <div v-else class="question-card__answers-block">
        <UiBaseCheckbox
          v-for="(answer, i) in question?.variants"
          :key="i"
          v-model="checkedAnswer"
          :name="answer.id"
        >
          <p class="text-body2">
            {{ answer.text }}
          </p>
        </UiBaseCheckbox>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Question } from '~/api/test'
interface Props {
  question: Question
  modelValue: string | Array<string>
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const checkedAnswer = computed({
  get() {
    if (!Array.isArray(props.modelValue) && props.question.multiple) {
      return []
    }

    if (Array.isArray(props.modelValue) && !props.question.multiple) {
      return props.modelValue[0]
    }

    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>

<style lang="scss" scoped>
.question-card {
  &__question-block {
    margin-bottom: 24px;
    padding: 0 24px;

    &.with-image {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      row-gap: 24px;

      @include media($bp-sm) {
        grid-template-columns: repeat(2, 1fr);
        column-gap: 24px;
      }
    }
  }
  &__question {
    width: 100%;
  }

  &__question-image {
    width: 100%;
    height: auto;
    background: $secondary;
    border-radius: 8px;
  }

  &__answers-block {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    padding: 0 24px;

    @include media($bp-sm) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    * {
      word-wrap: break-word;
      width: 100%;
    }
  }
}
</style>
