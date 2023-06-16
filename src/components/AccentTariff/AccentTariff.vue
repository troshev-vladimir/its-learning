<template>
  <div class="rounded bg-white q-mt-lg q-pa-lg">
    <div
      class="accent row q-col-gutter-md items-center justify-between"
      v-html="content"
    ></div>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();
const content = computed(() => store.getters["tariff/programAccent"]);
const condition = computed(() => store.getters["tariff/programCondition"]);

watch(condition, () => console.log(condition.value));
</script>

<style lang="scss" scoped>
.accent {
  @media screen and (min-width: $breakpoint-md) {
    flex-wrap: nowrap;
  }
}
</style>
