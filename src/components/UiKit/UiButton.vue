<template>
  <q-btn :class="style">
    <slot></slot>
  </q-btn>
</template>

<script setup>
import { computed } from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  type: {
    type: String,
    default: "",
    validator(value) {
      return ["long"].includes(value);
    },
  },
});

const style = computed(() => {
  return {
    [`q-btn--type-${props.type}`]: props.type,
  };
});
</script>

<style lang="scss" scoped>
.q-btn {
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  border-radius: 16px;
  padding: 16px 20px;

  &--type {
    &-long {
      padding: 20px 100px;
    }
  }
}
</style>
