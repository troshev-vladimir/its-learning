<template>
  <div v-if="test" class="target-test-page">
    <FeatureTest
      v-if="isTestAwailabel"
      :timer="true"
      time="Fri Mar 01 2024 17:24:02 GMT+0300"
      class="target-test-page__target-test"
      :questions="test.questions"
    />

    <div
      v-else-if="test.status === 'waiting'"
      class="test-is-waiting base-block"
    >
      <p class="target-training-results-card__result-title text-h2">
        Тест на целевое обучение
      </p>
      <p class="text-body2 text-center">
        Сейчас мы проверяем ваш тест. Результат теста определит сможете ли вы
        пройти на целевое обучение.
      </p>
      <div class="row items-center q-gutter-md">
        <p class="text-bold text-blue-600">На проверке</p>
        <UiSpinnerIcon :style="`accent`" />
      </div>
    </div>

    <FeatureTargetTestResults
      v-else
      :is-passed="test.results.passed"
      comment="Комментарий"
      :results="test.results.details"
      class="target-test-page__target-test base-block"
    />
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '~/stores/user'
import { useTestStore } from '~/stores/test'
definePageMeta({
  layout: 'empty',
})
useSeoMeta({
  title: 'Тест на целевое обучение',
})
const userStore = useUserStore()
const testStore = useTestStore()

const { user } = storeToRefs(userStore)
const { test } = storeToRefs(testStore)

const { error } = useAsyncData('test', () =>
  testStore.fetchTest('target').then(() => true)
)

const { pending: userPanding, error: userError } = await useAsyncData(
  'user',
  () => {
    return userStore.fetchUser().then(() => true)
  }
)

const isTestAwailabel = computed(() => {
  if (!test.value) return false
  return ['clear', 'in_process'].includes(test.value.status)
})
</script>

<style lang="scss" scoped>
.test-is-waiting {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.target-test-page {
  margin-left: 0;
  min-height: 100vh;
  margin-left: 0 !important;
  padding: 24px;
  max-height: 100vh;

  &__target-test {
    margin: auto;
    width: 100%;
  }
}
</style>
