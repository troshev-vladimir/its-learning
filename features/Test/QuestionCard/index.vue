<template>
  <div class="question-card">
    <div class="question-card__container">
      <div class="question-card__header">
        <p class="text-body2">Вопрос №{{ questionCount }}</p>
        <slot name="timer"></slot>
      </div>
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
        v-if="!question?.multiple && !Array.isArray(checkedAnswer)"
        class="question-card__answers-block"
      >
        <UiBaseRadio
          v-for="(answer, i) in question.answers"
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
      <div
        v-if="question?.multiple && Array.isArray(question?.answers)"
        class="question-card__answers-block"
      >
        <UiBaseCheckbox
          v-for="(answer, i) in question?.answers"
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
import type { IQuestion, TypeAnswer } from '../model/types'
interface Props {
  question: IQuestion
  questionCount: number
  modelValue: TypeAnswer | TypeAnswer[]
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const checkedAnswer = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>

<style lang="scss" scoped>
.question-card {
  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 24px;
    flex-direction: column;
    row-gap: 16px;
    position: sticky;
    top: 0px;
    background: $white;
    padding-top: 24px;

    @include media($bp-sm) {
      align-items: flex-end;
      flex-direction: row;
    }
  }

  &__question-container {
  }

  &__question-block {
    margin-bottom: 24px;

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
