<template>
  <i v-html="svg" />
</template>

<script setup>
import { computed } from "vue";

// eslint-disable-next-line no-undef
const props = defineProps(["icon", "src"]);
const path = props.src ? props.src : "";
const file = `${path}icon-${props.icon}`;
const modules = import.meta.glob("../../assets/icons/**/*.svg", { as: "raw" });

const svg = computed(() => {
  return modules["../../assets/icons/" + file + ".svg"];
});
</script>

<style lang="scss" scoped></style>
