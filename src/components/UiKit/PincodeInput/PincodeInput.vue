<template>
  <div class="pin d-flex q-mb-xl">
    <q-input
      v-for="i in 4"
      :key="i"
      ref="inputs"
      v-model="userPin[i - 1]"
      filled
      placeholder="#"
      mask="#"
      unmasked-value
      class="pin-input"
      :class="{ 'q-mr-md': i !== 4 }"
      standout
      @update:model-value="nextInput"
      @click="onFocus(i)"
      @update:modelValue="onInput"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
// eslint-disable-next-line no-undef
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["update:modelValue"]);

const inputs = ref([]);
const currentInput = ref(0);

const userPin = ref([]);

const pin = computed(() => {
  return userPin.value.reduce((acc, cur) => {
    if (!cur) return acc;
    return acc + cur;
  }, "");
});

const onInput = (value) => {
  if (value.split("").length > 1) {
    const val = value.split("").pop();
    value = "";
    value = val;
    console.log(val);
    userPin.value[currentInput.value] = "";
    userPin.value[currentInput.value] = val;
  }
};

const nextInput = (value) => {
  if (!value) {
    onClear();
    return;
  }
  if (currentInput.value === 3) return;
  currentInput.value += 1;
  inputs.value[currentInput.value].focus();
};

const onFocus = () => {
  userPin.value = [];
  inputs.value[0].focus();
};

const onClear = () => {
  if (currentInput.value === 0) return;
  currentInput.value -= 1;
  inputs.value[currentInput.value].focus();
};

watch(pin, (value) => {
  emit("update:modelValue", value);
});

userPin.value = props.modelValue.split("");
</script>

<style></style>
