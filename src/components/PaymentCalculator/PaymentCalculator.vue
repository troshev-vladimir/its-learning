<template>
  <div class="payment-calculator">
    <q-slider
      v-model="value"
      :min="range.min"
      :max="range.max"
      :step="100"
      label
      label-always
      :marker-labels="['2800', '22000']"
      color="accent"
      :label-value="'px'"
      switch-marker-labels-side
    >
    </q-slider>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref(9600);
const range = {
  min: 2800,
  max: 22000,
};
</script>

<style lang="scss" scoped>
.q-slider__label {
}
</style>
