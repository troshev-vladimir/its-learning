<template>
  <component
    :is="tag"
    v-bind="$attrs"
    :class="style"
    :color="props.color"
    :type="role"
    class="ui-button"
  >
    <span :class="textClass"><slot /></span>
  </component>
</template>

<script setup>
import { computed } from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  type: {
    type: String,
    default: "",
    validator(value) {
      return ["long", ""].includes(value);
    },
  },

  tag: {
    type: String,
    default: "q-btn",
  },

  role: {
    type: String,
    default: "",
  },

  outline: {
    type: Boolean,
    default: false,
  },

  textClass: {
    type: Array,
    default: () => ["text-bold"],
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
      return ["white", "accent", "secondary"].includes(value);
    },
  },
});

const style = computed(() => {
  return {
    [`q-btn--type-${props.type}`]: props.type,
    [`q-btn--color-${props.color}`]: props.color,
    [`q-btn--size-${props.size}`]: props.size,
    [`q-btn--outline`]: props.outline,
  };
});
</script>

<style lang="scss" scoped>
.q-btn {
  $root: &;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  border-radius: 16px;
  padding: 16px;
  min-height: auto;
  box-sizing: border-box;

  &--type {
    &-long {
      padding: 20px 10px;
    }
  }

  &--color {
    &-accent {
      color: var(--q-accent) !important;
    }

    &-secondary {
      color: var(--q-secondary) !important;
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

  &--outline {
    background: transparent !important;
    border: 3px solid currentColor !important;

    &::before {
      display: none;
    }
  }

  &--size-sm.q-btn--outline {
    padding: 5px 16px;
  }
}
</style>
