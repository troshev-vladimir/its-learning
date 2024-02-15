<script lang="ts" setup>
withDefaults(
  defineProps<{
    value?: number | string
    hasTip?: boolean
  }>(),
  {
    hasTip: true,
  }
)
</script>

<template>
  <div class="base-average-score">
    <p v-if="value" class="base-average-score__value text-body1 text-bold">
      {{ value }}
    </p>
    <p v-else class="base-average-score__value text-body1 text-bold">-</p>
    <div class="base-average-score__description">
      <p class="text-body2 text-right">Средний балл</p>
      <UiBaseIcon
        v-if="hasTip === true"
        v-tippy="{
          content: `Балл выпускника определяется из совокупности результатов пройденных тестов.`,
        }"
        width="16px"
        height="16px"
        font-size="16px"
        radius="999px"
        class="text-gray-300 q-ml-xs"
        :icon="['fas', 'info-circle']"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-average-score {
  display: flex;
  flex-direction: column;
  width: fit-content;

  &__value {
    font-size: 30px !important;
  }

  &__description {
    display: flex;
    align-items: center;
    column-gap: 8px;
  }
}
</style>
