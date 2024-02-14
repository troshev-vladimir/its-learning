<template>
  <div class="test-component">
    <div class="test-component__container">
      <FeatureTestQuestionCard
        v-model="answers[mainQuestionCount].answer"
        :question="activeQuestion"
        :question-count="mainQuestionCount + 1"
      >
        <template #timer>
          <TimerComponent
            v-if="timer === true"
            v-once
            class="test-component__timer base-shadow"
            :expiration-date="getTestTime"
            @time-is-gone="emitAnswers"
          />
        </template>
      </FeatureTestQuestionCard>
      <div class="test-component__buttons">
        <UiBaseButton
          v-if="hasPrevQuestion"
          type="boarded"
          size="small"
          :disabled="!hasPrevQuestion"
          @click="setPrevQuestionCount"
        >
          Назад
        </UiBaseButton>
        <div></div>
        <UiBaseButton
          v-if="!isEndQuestion"
          type="primary"
          size="small"
          post-icon="fas fa-chevron-right"
          :disabled="!hasNextQuestion"
          @click="setNextQuestionCount"
        >
          Следующий вопрос
        </UiBaseButton>
        <UiBaseButton
          v-if="isEndQuestion"
          type="primary"
          size="small"
          :disabled="!isCompletedQuestion"
          @click="emitAnswers"
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
  timer?: boolean
  time?: number | string
}
const props = withDefaults(defineProps<Props>(), {
  questions: () => [
    {
      text: 'Первый вопрос?',
      image:
        'https://on-desktop.com/ru/images/wp.php?path=/wps/Animals___Cats_White_kitten_in_a_basket_071062_.jpg',
      id: '1',
      required: true,
      answers: [
        { text: 'Первый ответ', id: '1' },
        { text: 'Второй ответ', id: '2' },
        { text: 'Третий ответ', id: '3' },
        { text: 'Четвертый ответ', id: '4' },
      ],
    },
    {
      text: 'Второй вопрос?',
      id: '2',
      multiple: true,
      required: true,
      answers: [
        { text: 'Первый ответ', id: '1' },
        { text: 'Второй ответ', id: '2' },
        { text: 'Третий ответ', id: '3' },
        { text: 'Четвертый ответ', id: '4' },
      ],
    },
    {
      text: 'Третий вопрос?',
      id: '3',
      multiple: true,
      required: true,
      answers: [
        { text: 'Первый ответ', id: '1' },
        { text: 'Второй ответ', id: '2' },
        { text: 'Третий ответ', id: '3' },
        { text: 'Четвертый ответ', id: '4' },
      ],
    },
  ],
  time: 10 * 60 * 1000,
  timer: true,
})
const emit = defineEmits(['submit'])

const getTestTime = computed(() => {
  if (typeof props.time === 'string') {
    return props.time
  }
  if (typeof props.time === 'number') {
    return Date.now() + props.time
  }
})

const mainQuestionCount = ref(0)
const answers = ref<IAnswer[] | []>([])

const isCompletedQuestion = computed(() => {
  const mainAnswer = answers.value[mainQuestionCount.value]
  const mainAnswerValue = mainAnswer?.answer
  const mainQuestion = props.questions[mainQuestionCount.value]
  if (mainQuestion.required === true) {
    if (Array.isArray(mainAnswerValue)) {
      return mainAnswerValue.length > 0
    } else {
      return mainAnswerValue != null && mainAnswerValue != ''
    }
  }
  return true
})

const activeQuestion = computed(() => props.questions[mainQuestionCount.value])

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

const emitAnswers = async () => {
  emit('submit', answers.value)
}

watch(
  mainQuestionCount,
  (value) => {
    if (answers.value[value]) return
    if (activeQuestion.value?.multiple === true) {
      answers.value[value] = { id: activeQuestion.value.id, answer: [] }
    } else {
      answers.value[value] = { id: activeQuestion.value.id, answer: '' }
    }
  },
  { immediate: true }
)
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

  &__timer {
    width: fit-content;
    margin-left: auto;
  }
}
</style>
