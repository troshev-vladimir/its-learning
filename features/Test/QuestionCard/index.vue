<template>
  <div v-if="question" class="question-card">
    <div class="question-card__container">
      <p class="question-card__question text-body1">
        {{ question.text }}
        <span
          v-if="question.required"
          v-tippy="{ content: 'Это обзательный вопрос' }"
          class="text-body1 text-red-400"
        >
          *
        </span>
      </p>
      <div v-if="!question.multiple" class="question-card__answers-block">
        <UiBaseRadio
          v-for="(answer, i) in question.answers"
          :key="i"
          v-model="checkedAnswer"
          :value="`${answer.id}`"
        >
          <p class="text-body2">
            {{ answer.text }}
          </p>
        </UiBaseRadio>
      </div>
      <div v-else class="question-card__answers-block">
        <UiBaseCheckbox
          v-for="(answer, i) in question.answers"
          :key="i"
          v-model="checkedAnswer"
          :name="`${answer.id}`"
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
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const checkedAnswer = computed({
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

    @media screen and (min-width: $bp-xs) {
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
