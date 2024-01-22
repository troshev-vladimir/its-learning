<script lang="ts" setup></script>

<template>
  <div class="base-average-score">
    <p class="base-average-score__value text-body1 text-bold">4.59</p>
    <p
      class="text-body2"
      v-tippy="
        `Балл выпускника определяется из совокупности результатов пройденных тестов.`
      "
    >
      Средний балл
    </p>
  </div>
</template>

<style lang="scss" scoped>
.base-average-score {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  &__value {
    font-size: 30px !important;
  }
}
</style>
