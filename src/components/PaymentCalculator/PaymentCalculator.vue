<template>
  <div class="payment-calculator">
    <q-slider
      v-model="value"
      :min="program.range.min"
      :max="program.range.max"
      :step="1"
      label
      label-always
      :marker-labels="[program.range.min, program.range.max]"
      color="accent"
      :label-value="formatNumber(value) + ' руб.'"
      switch-marker-labels-side
    >
    </q-slider>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { formatNumber } from "@/helpers/utils";
const store = useStore();

const program = computed(() => store.getters["tariff/programValue"]);

const value = computed({
  get() {
    return store.state.tariff.transh;
  },
  set(value) {
    tariffChoice(value);
  },
});

onMounted(() => {
  tariffChoice(value.value);
});

function tariffChoice(value) {
  console.log(value);
  const programValues = program.value.values;
  const brakePoints = Object.keys(programValues);
  brakePoints.every((bp) => {
    if (bp > value) {
      store.commit("tariff/setProgram", programValues[bp]);
      console.log(programValues[bp]);
      return false;
    } else return true;
  });
  store.commit("tariff/setTransh", value);
}

watch(program, (val) => {
  tariffChoice(value.value);
  console.log(val);
  if (value.value > val.range.max) {
    value.value = val.range.max;
  }

  if (value.value < val.range.min) {
    value.value = val.range.min;
  }
});
</script>

<style lang="scss">
@import "@/styles/main.scss";

.payment-calculator {
  .q-slider__text-container {
    background-color: #fff;
    padding: 16px;
    border-radius: $radius * 2;
  }

  .q-slider__text {
    font-weight: 700;
    font-size: 20px;
    color: #101010;
    line-height: 27px;
  }

  .q-slider__pin {
    &::before {
      display: none;
    }
  }

  .q-slider__marker-labels--h-ltr {
    transform: none;
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
    color: #101010;
    &:last-child {
      left: initial !important;
      right: 0 !important;
    }
  }

  .q-slider__label {
    bottom: 16px;
  }
}
</style>
