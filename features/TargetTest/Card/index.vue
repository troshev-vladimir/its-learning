<template>
  <Transition name="fade" mode="out-in" :duration="200">
    <div v-if="!isTestLoadding" class="target-training-card base-block">
      <div class="target-training-card__container">
        <p class="text-h2">Тест на целевое обучение</p>
        <p class="text-body2">
          Пройдите тестирование и получите возможность бесплатного целевого
          обучения на курсе. Тестирование состоит из двух онлайн тестов и
          персонального интервью, дата которого будет назначена вашим менеджером
          после обработки результатов онлайн теста.
        </p>
        <UiBaseButton
          v-model="isTestLoadding"
          type="primary"
          to="/target-test"
          size="big"
        >
          Пройти тестирование
        </UiBaseButton>
      </div>
    </div>
    <Skeleton v-else class="target-training-card__skeleton" />
  </Transition>
</template>

<script lang="ts" setup>
import Skeleton from './skeleton.vue'
import { useTestStore } from '~/stores/test'
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
const testStore = useTestStore()
const { isTestLoadding } = storeToRefs(testStore)
const isLoading = ref(false)

const showResult = computed(
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

  @media screen and (min-width: $bp-xs) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    width: 100%;
  }

  &__results-block {
    display: flex;
    align-items: center;
    column-gap: 40px;
  }
}
</style>
