<template>
  <div class="question-card">
    <div class="question-card__container">
      <p class="question-card__question text-body1">
        {{ question.text }}
        <span
          v-tippy="{ content: 'Это обзательный вопрос' }"
          class="text-body1 text-red-400"
          v-if="question.required"
        >
          *
        </span>
      </p>
      <div class="question-card__answers-block" v-if="!question.multiple">
        <UiBaseRadio
          v-model="checkedAnswer"
          :value="answer.id"
          v-for="(answer, i) in question.answers"
          :key="i"
        >
          <p class="text-body2">
            {{ answer.text }}
          </p>
        </UiBaseRadio>
      </div>
      <div class="question-card__answers-block" v-if="question.multiple">
        <UiBaseCheckbox
          v-model="checkedAnswer"
          :name="answer.id"
          v-for="(answer, i) in question.answers"
          :key="i"
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
import type { IQuestion, IAnswer } from '../model/types'
interface Props {
  question?: IQuestion
  modelValue: IAnswer
}
let props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

let checkedAnswer = computed({
  get() {
    if (props.question?.multiple && !props.modelValue?.answer) {
      return []
    }
    return props.modelValue?.answer
  },
  set(value) {
    emit('update:modelValue', { id: props.question?.id, answer: value })
  },
})
</script>

<style lang="scss" scoped>
.question-card {
  &__question {
    margin-bottom: 24px;
  }
  &__answers-block {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;

    @media screen and (min-width: $breakpoint-xs) {
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
