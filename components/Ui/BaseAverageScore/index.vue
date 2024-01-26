<script lang="ts" setup>
defineProps<{
  value?: number | string
}>()
</script>

<template>
  <div class="base-average-score">
    <p class="base-average-score__value text-body1 text-bold" v-if="value">
      {{ value }}
    </p>
    <p class="base-average-score__value text-body1 text-bold" v-else>-</p>
    <p class="text-body2">
      Средний балл
      <ClientOnly>
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
