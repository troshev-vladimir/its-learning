<template>
  <div class="test-component base-block">
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
            :has-hours="false"
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
      text: 'Лишь стремящиеся вытеснить традиционное производство, нанотехнологии являются только методом политического участия и ассоциативно распределены по отраслям. В частности, начало повседневной работы по формированию позиции является качественно новой ступенью первоочередных требований. Не следует, однако, забывать, что новая модель организационной деятельности создаёт предпосылки для благоприятных перспектив. Господа, постоянное информационно-пропагандистское обеспечение нашей деятельности создаёт предпосылки для экономической целесообразности принимаемых решений.',
      image:
        'https://on-desktop.com/wps/2018Animals___Cats_Large_gray_cat_with_a_surprised_look_123712_.jpg',
      id: '1',
      required: true,
      answers: [
        {
          text: 'Противоположная точка зрения подразумевает, что ключевые особенности структуры проекта лишь добавляют фракционных разногласий и разоблачены.',
          id: '1',
        },
        {
          text: 'А также представители современных социальных резервов лишь добавляют фракционных разногласий и объективно рассмотрены соответствующими инстанциями.',
          id: '2',
        },
        {
          text: 'Как уже неоднократно упомянуто, элементы политического процесса освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, указаны как претенденты на роль ключевых факторов.',
          id: '3',
        },
        {
          text: 'Есть над чем задуматься: базовые сценарии поведения пользователей набирают популярность среди определенных слоев населения, а значит, должны быть представлены в исключительно положительном свете.',
          id: '4',
        },
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
  padding-top: 0;
  &__buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    gap: 8px;
    flex-direction: column;

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
