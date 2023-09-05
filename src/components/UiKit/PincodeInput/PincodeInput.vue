<template>
  <div class="pin">
    <div class="d-flex">
      <q-input
        v-for="i in 4"
        :key="i"
        ref="inputs"
        v-model="userPin[i - 1]"
        filled
        placeholder="#"
        mask="#"
        unmasked-value
        class="pin-input q-pb-none"
        :class="{ 'q-mr-md': i !== 4 }"
        standout
        :error="!!error"
        no-error-icon
        @update:model-value="nextInput"
        @click="onFocus(i)"
        @update:modelValue="onInput"
      />
    </div>

    <div v-if="!!error" class="q-field--error q-mt-sm">
      <span class="q-field__bottom">{{ error }}</span>
    </div>
  </div>
</template>

<script setup>
import { watch } from "vue";
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
const emit = defineEmits(["update:modelValue"]);
const { onFocus, nextInput, onInput, pin, userPin, inputs } = usePincode();

watch(pin, (value) => {
  emit("update:modelValue", value);
});

userPin.value = props.modelValue.split("");
</script>

<style></style>
