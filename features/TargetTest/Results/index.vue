<template>
  <div class="target-training-results-card base-block">
    <div class="target-training-results-card__container">
      <p
        v-if="isPassed"
        class="target-training-results-card__result-title text-h2"
      >
        Тест успешно
        <span class="text-blue-600"> пройден! </span>
      </p>
      <p v-else class="target-training-results-card__result-title text-h2">
        Тест
        <span class="text-blue-600"> НЕ пройден </span>
      </p>

      <p class="text-body2">
        {{ comment }}
      </p>

      <div class="target-training-results-card__results-block">
        <div
          v-for="(resut, idx) in results"
          :key="idx"
          class="results-block__item"
        >
          <p class="text-body1 text-bold q-mb-xs">{{ resut.value }}</p>
          <p>
            <span v-if="resut.satisfyes">Прошёл </span>
            <span class="text-body2"> {{ resut.name }}</span>
          </p>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ResultDetail } from '~/api/test/types'

interface PropsTest {
  results: ResultDetail[]
  comment: string
  isPassed: boolean
}

withDefaults(defineProps<PropsTest>(), {
  comment: 'asdasdasdad',
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
    align-items: flex-start;
    gap: 16px;
    width: 100%;
  }

  &__result-title {
    text-align: left;
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
