<template>
  <div class="payment-calculator">
    <q-slider
      v-model="value"
      :min="program.offermin"
      :max="program.offermax"
      :step="1"
      label
      label-always
      :marker-labels="[program.offermin, program.offermax]"
      color="accent"
      :label-value="formatNumber(value) + ' руб.'"
      switch-marker-labels-side
    >
    </q-slider>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { formatNumber } from "@/helpers/utils";
import { Tariff } from "@/types/tariff";

const store = useStore();

const program = computed<Tariff>(
  () => store.getters["tariff/getCurrentProgramm"] || {}
);
const value = computed({
  get() {
    return store.state.tariff.payment;
  },
  set(value: number) {
    store.commit("tariff/setPayment", value);
  },
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
