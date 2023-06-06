<template>
  <UiAccordionItem v-for="(item, idx) in props.items" :key="idx" :item="item">
  </UiAccordionItem>
</template>

<script setup>
import UiAccordionItem from "./UiAccordionItem.vue";
// eslint-disable-next-line no-undef
const props = defineProps({
  items: Array,
});
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.q-expansion-item {
  margin-bottom: 8px;
}

.q-expansion-item__container {
  border-radius: $radius;
  background-color: var(--q-white);
  overflow: hidden;
}
</style>
