<template>
  <div class="test-component">
    <div class="test-component__container">
      <FeatureTestQuestionCard
        :question="questions[mainQuestionCount]"
        v-model="answers[mainQuestionCount]"
      />
      <div class="test-component__buttons">
        <UiBaseButton
          type="boarded"
          size="small"
          :disabled="!hasPrevQuestion"
          v-if="hasPrevQuestion"
          @click="setPrevQuestionCount"
        >
          Назад
        </UiBaseButton>
        <div></div>
        <UiBaseButton
          type="primary"
          size="small"
          post-icon="fas fa-chevron-right"
          :disabled="hasNotNextQuestion"
          v-if="!isEndQuestion"
          @click="setNextQuestionCount"
        >
          Следующий вопрос
        </UiBaseButton>
        <UiBaseButton
          type="primary"
          size="small"
          :disabled="!isCompletedQuestion"
          v-if="isEndQuestion"
          @click="() => emit('submit', answers)"
        >
          Завершить
        </UiBaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IQuestion, IAnswer } from './model/types'
interface Props {
  questions?: IQuestion[]
}
let props = withDefaults(defineProps<Props>(), {
  questions: () => [
    {
      text: 'Первый вопрос?',
      id: 1,
      required: true,
      answers: [
        { text: 'Первый ответ', id: 1 },
        { text: 'Второй ответ', id: 2 },
        { text: 'Третий ответ', id: 3 },
        { text: 'Четвертый ответ', id: 4 },
      ],
    },
    {
      text: 'Второй вопрос?',
      id: 2,
      multiple: true,
      required: true,
      answers: [
        { text: 'Первый ответ', id: 1 },
        { text: 'Второй ответ', id: 2 },
        { text: 'Третий ответ', id: 3 },
        { text: 'Четвертый ответ', id: 4 },
      ],
    },
    {
      text: 'Третий вопрос?',
      id: 3,
      multiple: true,
      required: true,
      answers: [
        { text: 'Первый ответ', id: 1 },
        { text: 'Второй ответ', id: 2 },
        { text: 'Третий ответ', id: 3 },
        { text: 'Четвертый ответ', id: 4 },
      ],
    },
  ],
})
const emit = defineEmits(['submit'])

let mainQuestionCount = ref(0)
let answers = ref<IAnswer[]>([])

const isCompletedQuestion = computed(() => {
  let mainAnswer = answers.value[mainQuestionCount.value]
  let mainAnswerValue = mainAnswer?.answer
  let mainQuestion = props.questions[mainQuestionCount.value]
  if (mainQuestion.required === true) {
    if (Array.isArray(mainAnswerValue)) {
      return mainAnswerValue.length > 0
    } else {
      return mainAnswerValue != null && mainAnswerValue != ''
    }
  }
  return true
})

const hasNotNextQuestion = computed(() => !hasNextQuestion.value)

const hasNextQuestion = computed(
  () =>
    mainQuestionCount.value < props.questions.length - 1 &&
    isCompletedQuestion.value
)

const hasPrevQuestion = computed(() => mainQuestionCount.value > 0)

const isEndQuestion = computed(
  () => mainQuestionCount.value === props.questions.length - 1
)

const setNextQuestionCount = () => {
  if (hasNextQuestion.value) {
    ++mainQuestionCount.value
  }
}

const setPrevQuestionCount = () => {
  if (hasPrevQuestion.value) {
    --mainQuestionCount.value
  }
}

const emitAnswers = () => {
  emit('submit', answers.value)
}
</script>

<style lang="scss" scoped>
.test-component {
  &__buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    gap: 8px;
    flex-direction: column;

    button {
      width: 100%;
    }

    @media screen and (min-width: $bp-xs) {
      flex-direction: row;

      button {
        width: fit-content;
      }
    }
  }
}
</style>
