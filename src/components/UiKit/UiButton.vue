<template>
  <q-btn :class="style" :color="color" class="ui-button text-body1">
    <span :class="textClass"><slot /></span>
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

  textClass: {
    type: Array,
    default: () => ["text-body1", "text-bold"],
  },

  size: {
    type: String,
    default: "md",
    validator(value) {
      return ["md", "sm"].includes(value);
    },
  },

  color: {
    type: String,
    default: "accent",
    validator(value) {
      return ["white", "accent"].includes(value);
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
      font-size: 16px;
    }
  }
}
</style>
