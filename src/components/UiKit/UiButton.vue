<template>
  <q-btn :class="style" class="ui-button">
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

  size: {
    type: String,
    default: "md",
    validator(value) {
      return ["md", "sm"].includes(value);
    },
  },
});

const style = computed(() => {
  return {
    [`q-btn--type-${props.type}`]: props.type,
    [`q-btn--size-${props.size}`]: props.size,
  };
});
</script>

<style lang="scss" scoped>
.q-btn {
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  border-radius: 16px;
  padding: 16px;
  min-height: auto;

  &--type {
    &-long {
      padding: 20px 100px;
    }
  }

  &--size {
    &-sm {
      padding: 8px 16px;
      font-weight: 700;
      font-size: 20px;
      line-height: 135%;
      border-radius: 16px;
    }
  }
}
</style>
