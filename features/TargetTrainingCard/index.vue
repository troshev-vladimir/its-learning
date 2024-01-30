<template>
  <div class="target-training-card base-block">
    <div class="target-training-card__container">
      <p class="text-h2">Тест на целевое обучение</p>
      <p class="text-body2" v-if="!showResult">
        Пройдите тестирование и получите возможность бесплатного целевого
        обучения на курсе. Тестирование состоит из двух онлайн тестов и
        персонального интервью, дата которого будет назначена вашим менеджером
        после обработки результатов онлайн теста.
      </p>
      <UiBaseButton
        type="primary"
        size="big"
        v-if="value.status === 'start' && !showResult"
        @click="() => emit('startTest')"
      >
        Пройти тестирование
      </UiBaseButton>
      <p
        class="text-body1 text-bold text-blue-600"
        v-if="value.status === 'waiting' && !showResult"
      >
        Идет проверка. Ожидайте ответа менеджера.
      </p>
      <div class="target-training-card__results-block" v-if="showResult">
        <div class="results-block__item">
          <p class="text-body1 text-bold q-mb-xs">{{ value.result?.iq }}</p>
          <p class="text-body2">Тест IQ</p>
        </div>
        <div class="results-block__item">
          <p class="text-body1 text-bold q-mb-xs">{{ value.result?.score }}</p>
          <p class="text-body2">Другие задачи</p>
        </div>
      </div>
    </div>

    <p
      class="result-block__status text-blue-600 text-bold"
      v-if="showResult && value.result?.allowance === true"
    >
      Вы приняты на целевое обучение
    </p>
    <p
      class="result-block__status text-blue-600 text-bold"
      v-if="showResult && value.result?.allowance === false"
    >
      Вы приняты на платное обучение
    </p>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['startTest'])
interface Test {
  status: 'start' | 'waiting' | 'result'
  result?: {
    iq?: number
    score?: number
    allowance?: boolean
  }
}

interface PropsTest {
  value: Test
}

const props = withDefaults(defineProps<PropsTest>(), {
  value: () => ({
    status: 'start',
    result: {
      iq: 120,
      score: 120,
      allowance: false,
    },
  }),
})

let showResult = computed(
  () =>
    props.value.status === 'result' &&
    props.value.result?.iq !== null &&
    props.value.result?.allowance !== null &&
    props.value.result?.score !== null
)
</script>

<style lang="scss">
.target-training-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: $md;
  flex-wrap: wrap;

  @media screen and (min-width: $breakpoint-xs) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  &__results-block {
    display: flex;
    align-items: center;
    column-gap: 40px;
  }
}
</style>
