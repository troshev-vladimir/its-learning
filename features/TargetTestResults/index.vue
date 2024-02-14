<template>
  <div class="target-training-results-card base-block">
    <div class="target-training-results-card__container">
      <template v-if="status == 'waiting'">
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
      </template>

      <template v-if="status == 'result'">
        <p
          v-if="value.result?.allowance === true"
          class="target-training-results-card__result-title text-h2"
        >
          Тест успешно
          <span class="text-blue-600"> пройден! </span>
        </p>
        <p
          v-if="value.result?.allowance === false"
          class="target-training-results-card__result-title text-h2"
        >
          Тест
          <span class="text-blue-600"> НЕ пройден </span>
        </p>

        <p class="text-body2">
          Небольшой текст небольшой текст небольшой текст небольшой текст
          небольшой текст небольшой текст небольшой текст
        </p>

        <div class="target-training-results-card__results-block">
          <div class="results-block__item">
            <p class="text-body1 text-bold q-mb-xs">{{ value.result?.iq }}</p>
            <p class="text-body2">Тест IQ</p>
          </div>
          <div class="results-block__item">
            <p class="text-body1 text-bold q-mb-xs">
              {{ value.result?.score }}
            </p>
            <p class="text-body2">Другие задачи</p>
          </div>
          <div class="results-block__item">
            <p class="text-body1 text-bold q-mb-xs">
              {{ value.result?.score }}
            </p>
            <p class="text-body2">Другие задачи</p>
          </div>
          <div class="results-block__item">
            <p class="text-body1 text-bold q-mb-xs">
              {{ value.result?.score }}
            </p>
            <p class="text-body2">Другие задачи</p>
          </div>
        </div>
        <p class="text-blue-600 text-bold">
          Ваши результаты приняты. Ожидайте звонка менеджера
        </p>
        <NuxtLink to="cabinet" class="target-training-results-card__button">
          <UiBaseButton
            v-if="value.result?.allowance === true"
            class="target-training-results-card__button"
            size="small"
          >
            Приступить к обучению
          </UiBaseButton>
        </NuxtLink>
        <UiBaseButton
          v-if="value.result?.allowance === false"
          class="target-training-results-card__button"
          size="small"
        >
          Все равно хочу учиться
        </UiBaseButton>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TargetTestStatus, ITestResult } from './model/types'

interface PropsTest {
  status: TargetTestStatus
  value: ITestResult
}

withDefaults(defineProps<PropsTest>(), {
  status: 'waiting',
  value: () => ({
    result: {
      iq: 120,
      score: 120,
      allowance: true,
    },
  }),
})
</script>

<style lang="scss" scoped>
.target-training-results-card {
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
    align-items: center;
    gap: 16px;
    width: 100%;
  }

  &__result-title {
    text-align: center;
    width: 100%;
  }

  &__results-block {
    display: flex;
    align-items: center;
    column-gap: 40px;
  }

  &__button {
    width: 100%;
  }
}
</style>
