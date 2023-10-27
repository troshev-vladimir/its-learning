<template>
  <div class="pin">
    <div class="d-flex">
      <q-input
        v-for="i in 6"
        :key="i"
        ref="inputs"
        v-model="userPin[i - 1]"
        filled
        placeholder="#"
        mask="#"
        unmasked-value
        class="pin-input q-pb-none"
        :class="{ 'q-mr-md': i !== 6 }"
        standout
        :error="!!error"
        no-error-icon
        :autofocus="i === 1"
        @update:model-value="nextInput"
        @click="onFocus(i)"
        @keydown.delete="userPin = []"
      >
      </q-input>
    </div>

    <div v-if="!!error" class="q-field--error q-mt-sm">
      <span class="q-field__bottom">{{ error }}</span>
    </div>
    <p v-else class="q-mt-sm q-ml-sm" style="font-size: 14px; color: #999">
      <slot name="hint"></slot>
    </p>
  </div>
</template>

<script setup>
import { watch, onMounted } from "vue";
import usePincode from "./composables/usePincode";
// eslint-disable-next-line no-undef
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["update:modelValue", "completed"]);
const { onFocus, nextInput, pin, userPin, inputs, defineExpose, clear } =
  usePincode(emit);

watch(pin, (value) => {
  emit("update:modelValue", value);
});

onMounted(() => {
  inputs.value.forEach((input) => {
    input?.resetValidation();
  });
});

userPin.value = props.modelValue.split("");

defineExpose({
  clear,
});
</script>

<style></style>
