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
    <p class="text-body2 text-right">
      Средний балл
      <ClientOnly v-if="hasTip === true">
        <font-awesome-icon
          v-tippy="{
            content: `Балл выпускника определяется из совокупности результатов пройденных тестов.`,
          }"
          class="text-gray-300"
          :icon="['fas', 'info-circle']"
        />
      </ClientOnly>
    </p>
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
}
</style>
