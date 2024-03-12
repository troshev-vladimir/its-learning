<template>
  <div class="target-test-page">
    <Transition name="fade" mode="out-in" :duration="200">
      <div v-if="!isTestLoading" class="target-test-page__container">
        <Transition name="fade" mode="out-in" :duration="200">
          <FeatureTest
            v-if="isTestAvailable && test"
            :timer="true"
            :time="test?.timeToEnd"
            class="target-test-page__target-test"
            :questions="test?.questions"
          />

          <FeatureTargetTestWaitingCard
            v-else-if="test?.status === 'waiting'"
            class="target-test-page__result-card"
          >
            <UiBaseButton
              type="primary"
              size="small"
              :to="`/cabinet`"
              style="width: 100%"
            >
              Перейти на главную
            </UiBaseButton>
          </FeatureTargetTestWaitingCard>

          <FeatureTargetTestResults
            v-else-if="test"
            :is-passed="test?.results.passed"
            comment="Повседневная практика показывает, что постоянный количественный рост и сфера нашей активности однозначно фиксирует необходимость соответствующих условий активизации."
            :results="test?.results.details"
            class="target-test-page__result-card base-block"
          >
            <UiBaseButton
              class="target-training-results-card__button"
              type="primary"
              size="small"
              style="width: 100%"
              :to="`/cabinet?showCourse=true`"
            >
              {{
                test?.results.passed
                  ? 'Приступить к обучению'
                  : 'Все равно хочу учиться'
              }}
            </UiBaseButton>
          </FeatureTargetTestResults>
        </Transition>
      </div>
      <UiBaseSkeleton v-else width="100%" height="50vh" />
    </Transition>
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
const { test, isTestLoading, isTestAvailable } = storeToRefs(testStore)

const { error } = useAsyncData('test', () =>
  testStore.fetchTest('target').then(() => true)
)

const { pending: userPanding, error: userError } = await useAsyncData(
  'user',
  () => userStore.fetchUser().then(() => true)
)

onBeforeRouteLeave((to, from, next) => {
  if (isTestAvailable.value) {
    const confirmMessage = confirm(
      'Вы уверены, что хотите уйти с этой страницы? \nДанные, которые вы ввели не сохранятся. Попытка прохождения теста будет утеряна.'
    )
    if (confirmMessage) {
      return next()
    } else {
      return next(false)
    }
  }
  next()
})

onMounted(() => {
  window.onbeforeunload = function () {
    if (isTestAvailable.value) return false
  }
})
onBeforeUnmount(() => {
  window.onbeforeunload = null
})
</script>

<style lang="scss" scoped>
.target-test-page {
  display: flex;
  align-items: center;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  padding: 24px;

  &__container {
    margin: auto;
    width: 100%;
  }

  &__target-test {
    width: 100%;
  }

  &__result-card {
    margin: auto;
    width: fit-content;
    max-width: 50%;
  }
}
</style>
