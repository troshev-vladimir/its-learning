<template>
  <span
    class="base-radio-button"
    @click="$emit('update:modelValue', !modelValue)"
    :class="{ active: modelValue }"
  >
    <span class="base-radio-button__dot"> </span>
  </span>
</template>

<script lang="ts" setup>
defineEmits(["update:modelValue"]);
defineProps({
  modelValue: { type: Boolean, default: false },
});
</script>

<style lang="scss" scoped>
.base-radio-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 10000px;
  border: 1px solid $gray;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    border-color: $accent;
    box-shadow: 0 0 0 2px $light-blue;
  }

  &.active {
    background: $accent;
    border-color: $accent;

    .base-radio-button__dot {
      display: block;
      width: 10px;
      height: 10px;
      border-radius: 10000px;
      background: $white;
    }
  }
}
</style>


