<template>
  <div class="salary-calculator column items-center">
    <p class="text-h1 q-mb-sm">{{ formatNumber(value) }} руб./мес.</p>
    <p class="text-body1 q-mb-md">Твоя будущая зарплата</p>
    <div class="salary-calculator-input row items-center full-width q-mb-md">
      <q-btn
        color="secondary"
        text-color="primary"
        class="button rounded"
        @click="reduce"
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
        @click="increase"
      >
        +
      </q-btn>
    </div>
    <p class="text-body1 q-mb-sm">Срок обучения</p>
    <p class="text-h2 q-mb-lg">{{ currentData.period }}</p>
    <p class="text-body1 q-mb-md text-center">
      Общая сумма инвестиций в твое будущее
    </p>
    <p class="text-h1">{{ formatNumber(currentData.investments) }}руб.</p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import useCalculator from "./useSalaryCalculator";
import { useStore } from "vuex";
import { formatNumber } from "@/helpers/utils";
const { initialState } = useCalculator();
const store = useStore();
const selectedStep = ref(1);
const steps = Object.keys(initialState.value);
const range = computed(() => {
  return {
    min: 0,
    max: steps.length - 1,
  };
});

const value = computed(() => {
  return steps[selectedStep.value];
});

const currentData = computed(() => {
  return initialState.value[value.value];
});

watch(currentData, (value) => {
  store.commit("tariff/setProgramId", value.id);
  store.commit("tariff/setProgramPeriod", value.months);
  store.commit("tariff/setProgramTotalPrice", value.investments);
});

function increase() {
  if (selectedStep.value < steps.length - 1) {
    selectedStep.value += 1;
  }
}

function reduce() {
  if (selectedStep.value > 0) {
    selectedStep.value -= 1;
  }
}
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
