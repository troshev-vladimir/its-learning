<template>
  <div class="rounded bg-white q-mt-lg q-py-lg q-pl-lg q-pr-sm">
    <div class="accent d-flex items-center">
      <h2 class="q-mr-md text-h2" v-html="content.title"></h2>
      <p class="text-body1" v-html="content.description"></p>
    </div>
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
  & > h2 {
    display: block;
    flex: 1 0 auto;
    width: 292px;
  }

  @media screen and (min-width: $breakpoint-md) {
  }
}
</style>
