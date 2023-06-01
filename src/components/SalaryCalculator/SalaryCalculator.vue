<template>
  <div class="salary-calculator column items-center">
    <p class="text-h1 q-mb-sm">{{ value }} руб./мес.</p>
    <p class="text-body1 q-mb-md">Твоя будущая зарплата</p>
    <div class="salary-calculator-input row items-center full-width q-mb-md">
      <q-btn color="secondary" text-color="primary" @click="reduce"> - </q-btn>
      <q-slider
        v-model="value"
        :min="range.min"
        :max="range.max"
        :step="20000"
        label
        label-always
        color="accent"
      />
      <q-btn color="secondary" text-color="primary" @click="increase">
        +
      </q-btn>
    </div>
    <p class="text-body1 q-mb-sm">Срок обучения</p>
    <p class="text-h2 q-mb-lg">5 месяцев</p>
    <p class="text-body1 q-mb-md">Общая сумма инвестиций в твое будущее</p>
    <p class="text-h1">88 000 руб.</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref(60000);
const range = {
  min: 20000,
  max: 100000,
};

function increase() {
  if (range.max <= value.value) return;
  value.value += 20000;
}

function reduce() {
  if (range.min >= value.value) return;

  value.value -= 20000;
}
</script>

<style lang="scss" scoped>
.salary-calculator-input {
  flex-wrap: nowrap;
}
.q-slider {
  margin: 0 20px;
}
</style>
