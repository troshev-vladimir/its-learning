<template>
  <div class="accent-container rounded bg-white q-pa-lg q-pa-lg-xl">
    <div class="accent wrap d-flex items-start">
      <h2 class="q-mr-md q-mb-lg text-h2" v-html="content.description1"></h2>
      <p class="text-body1" v-html="content.description2"></p>
    </div>
    <div class="space"></div>
    <img src="@/assets/img/front/ann.png" alt="ann" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Tariff } from "@/types/tariff";
import { useStore } from "vuex";
const store = useStore();
const content = computed<Tariff>(
  () => store.getters["tariff/getCurrentProgramm"] || {}
);
</script>

<style lang="scss" scoped>
.accent-container {
  display: flex;
  position: relative;

  img {
    height: 250px;
    position: absolute;
    right: 0;
    bottom: 0;

    @media screen and (min-width: $breakpoint-xs) {
      height: 200px;
    }

    @media screen and (min-width: $breakpoint-sm) {
      height: 300px;
    }

    @media screen and (min-width: $breakpoint-md) {
      height: 336px;
    }
  }

  .space {
    width: 90%;
  }
}
.accent {
  & > h2 {
    display: block;
    flex: 1 1 auto;
  }

  flex-direction: column;
  align-items: flex-start;

  @media screen and (min-width: $breakpoint-xs) {
    flex-direction: row;
  }

  @media screen and (min-width: $breakpoint-sm) {
    flex-direction: column;
    min-height: 130px;
  }

  @media screen and (min-width: $breakpoint-md) {
    flex-direction: column;
  }
}
</style>
