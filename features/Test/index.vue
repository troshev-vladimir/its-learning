<template>
  <div class="test-component">
    <div class="test-component__container">
      <div class="header">
        <div class="question-card__header">
          <p class="text-body2">Вопрос №{{ currentQuestionCount + 1 }}</p>
        </div>
        <TimerComponent
          v-if="timer"
          :has-hours="false"
          class="test-component__timer base-shadow"
          :expiration-date="getTestTime"
          @time-is-gone="sendAnswers"
        />
      </div>
      <Transition name="fade" mode="out-in" :duration="200">
        <FeatureTestQuestionCard
          :key="currentQuestionCount"
          v-model="answers[activeQuestion.id]"
          :question="activeQuestion"
        >
        </FeatureTestQuestionCard>
      </Transition>
      <div class="test-component__buttons">
        <div>
          <UiBaseButton
            v-if="hasPrevQuestion"
            type="boarded"
            size="small"
            :disabled="!hasPrevQuestion"
            @click="setPrevQuestionCount"
          >
            Назад
          </UiBaseButton>
        </div>
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
          v-model="isTestLoadding"
          type="primary"
          size="small"
          :disabled="!isCompletedQuestion"
          @click="sendAnswers"
        >
          Завершить
        </UiBaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Question, Answers } from '~/api/test'
import { useTestStore } from '~/stores/test'
const props = defineProps<{
  questions: Question[]
  timer?: boolean
  time?: number | string
}>()
const emit = defineEmits(['submit'])

const getTestTime = computed(() => {
  if (typeof props.time === 'string') {
    return props.time
  }
  if (typeof props.time === 'number') {
    return Date.now() + props.time
  }
})
const testStore = useTestStore()
const { isTestLoadding } = storeToRefs(testStore)
const currentQuestionCount = ref(0)
const answers = ref<Answers>({})
const activeQuestion = computed(
  () => props.questions[currentQuestionCount.value]
)

const isCompletedQuestion = computed(() => {
  return answers.value[activeQuestion.value.id]
})

const hasNextQuestion = computed(
  () =>
    currentQuestionCount.value < props.questions.length - 1 &&
    isCompletedQuestion.value
)

const hasPrevQuestion = computed(() => currentQuestionCount.value > 0)

const isEndQuestion = computed(
  () => currentQuestionCount.value === props.questions.length - 1
)

const setNextQuestionCount = () => {
  if (hasNextQuestion.value) {
    ++currentQuestionCount.value
  }
}

const setPrevQuestionCount = () => {
  if (hasPrevQuestion.value) {
    --currentQuestionCount.value
  }
}

const sendAnswers = async () => {
  testStore.sendResults(answers.value)
}
</script>

<style lang="scss" scoped>
.test-component {
  border-radius: $radius;
  background: $white;

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    row-gap: 16px;
    position: sticky;
    top: -1px;
    padding: 24px 24px 24px 24px;
    border-radius: $radius;
    background: $white;

    @include media($bp-sm) {
      align-items: flex-end;
      flex-direction: row;
    }
  }

  &__buttons {
    padding: 0 24px 24px 24px;
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 8px;
    margin-top: 24px;
    border-radius: $radius;
    background: $white;

    button {
      width: 100%;
    }

    @include media($bp-xs) {
      flex-direction: row;

      button {
        width: fit-content;
      }
    }
  }

  &__timer {
    width: fit-content;
  }
}
</style>
