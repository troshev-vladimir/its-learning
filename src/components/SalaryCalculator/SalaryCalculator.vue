<template>
  <div class="salary-calculator column items-center">
    <p class="text-h1 q-mb-sm">
      {{ formatNumber(currentProgramm.income) }} руб./мес.
    </p>
    <p class="text-body1 q-mb-md">Твоя будущая зарплата</p>

    <div class="salary-calculator-input row items-center full-width q-mb-md">
      <q-btn
        color="secondary"
        text-color="primary"
        class="button rounded"
        @click="store.commit('tariff/reduce')"
      >
        -
      </q-btn>
      <q-slider
        :model-value="selectedStep"
        :min="0"
        :max="range"
        readonly
        color="accent"
      />
      <q-btn
        color="secondary"
        class="button rounded"
        text-color="primary"
        @click="store.commit('tariff/increase')"
      >
        +
      </q-btn>
    </div>
    <p class="text-body1 q-mb-sm">Срок обучения</p>
    <p class="text-h2 q-mb-lg">{{ currentProgramm.period }} месяцев</p>
    <p class="text-body1 q-mb-md text-center">
      Общая сумма инвестиций в твое будущее
    </p>
    <p class="text-h1">{{ formatNumber(currentProgramm.price) }} руб.</p>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { formatNumber } from "@/helpers/utils";
import { Tariff } from "@/types/tariff";
import { computed } from "vue";

const store = useStore();

const currentProgramm = computed<Tariff>(() => {
  return store.getters["tariff/getCurrentProgramm"] || {};
});

const selectedStep = computed(() => {
  return store.state.tariff.selectedProgrammIdx;
});

const range = computed(() => {
  return store.state.tariff.programs
    ? store.state.tariff.programs.length - 1
    : 0;
});
</script>

<style lang="scss" scoped>
.salary-calculator-input {
  flex-wrap: nowrap;
}
.q-slider {
  margin: 0 20px;
}

.button {
  padding: 0;
  width: 85px;
  min-height: 60px;

  font-weight: 400;
  font-size: 45px;
  line-height: 45px;
}
</style>
