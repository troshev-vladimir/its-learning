<template>
  <div class="rounded bg-white q-mt-lg q-py-lg q-pl-lg q-pr-sm">
    <div class="accent wrap d-flex items-center">
      <h2 class="q-mr-md q-mb-sm text-h2" v-html="content.name"></h2>
      <p class="text-body1" v-html="content.description"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const content = computed(() => store.state["tariff"]);
</script>

<style lang="scss" scoped>
.accent {
  & > h2 {
    display: block;
    flex: 1 0 auto;
  }

  flex-direction: column;
  align-items: flex-start;

  @media screen and (min-width: $breakpoint-xs) {
    flex-direction: row;
    align-items: center;
  }

  @media screen and (min-width: $breakpoint-sm) {
    flex-direction: column;
    align-items: flex-start;
  }

  @media screen and (min-width: $breakpoint-md) {
    flex-direction: column;
  }
}
</style>
