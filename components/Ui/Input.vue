<template>
  <input v-model="value" v-bind="$attrs" />
</template>

<script setup>
import { computed } from "vue";

// eslint-disable-next-line no-undef
const props = defineProps(["modelValue"]);

// eslint-disable-next-line no-undef
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<style lang="scss">
.ui-input.q-field--outlined .q-field__control {
  border-radius: 16px;
}
</style>
