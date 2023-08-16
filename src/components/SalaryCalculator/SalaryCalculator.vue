<template>
  <div class="salary-calculator column items-center">
    <p class="text-h1 q-mb-sm">{{ formatNumber(income) }} руб./мес.</p>
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
        v-model="selectedStep"
        :min="+range.min"
        :max="+range.max"
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
    <p class="text-h2 q-mb-lg">{{ currentData?.period }}</p>
    <p class="text-body1 q-mb-md text-center">
      Общая сумма инвестиций в твое будущее
    </p>
    <p class="text-h1">{{ formatNumber(currentData?.investments) }}руб.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { formatNumber } from "@/helpers/utils";
import { Tariff } from "@/types/tariff";
const store = useStore();

const selectedStep = computed<Tariff>(
  store.getters["tariff/getCurrentProgramm"]
);

const range = computed(() => {
  return {
    min: 0,
    max: store.state.tariff.programs.length,
  };
});

const income = computed(() => {
  return selectedStep.value.income;
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
