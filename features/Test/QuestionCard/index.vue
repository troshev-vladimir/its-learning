<template>
  <div class="question-card">
    <div class="question-card__container">
      <p class="question-card__question text-body1">
        {{ question.text }}
        <span
          v-if="question?.required"
          v-tippy="{ content: 'Это обзательный вопрос' }"
          class="text-body1 text-red-400"
        >
          *
        </span>
      </p>
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
