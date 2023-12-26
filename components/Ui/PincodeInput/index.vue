<template>
  <div :class="$style.pin">
    <div class="d-flex">
      <q-input
        v-for="i in 6"
        :key="i"
        ref="inputs"
        v-model="userPin[i - 1]"
        filled
        mask="#"
        unmasked-value
        class="q-pb-none"
        :class="[{ 'q-mr-xs q-mr-sm-md': i !== 6 }, $style['pin-input']]"
        :error="!!error"
        no-error-icon
        :disable="disabled"
        :autofocus="i === 1"
        inputmode="numeric"
        @update:model-value="nextInput"
        @click="onFocus()"
        @keydown.delete="userPin = []"
        @paste="pasteEvent"
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

<script setup lang="ts">
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
  disabled: {
    type: Boolean,
    default: false,
  },
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["update:modelValue", "completed"]);
const { onFocus, nextInput, userPin, inputs, clear, pasteEvent } =
  usePincode(emit);

onMounted(() => {
  inputs.value.forEach((input) => {
    // @ts-expect-error
    input?.resetValidation();
  });
});

userPin.value = props.modelValue.split("");

defineExpose({
  clear,
});
</script>
<style module>
.q-field__messages {
  text-align: center;
}

.pin p {
  text-align: center;
}
</style>
<style lang="scss" module>
.pin {
  .q-field__control {
    padding-left: 16px;
  }
}

.loadder-wrappper {
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translate(100%, -50%);
}

.content {
  max-width: 360px;
  margin-top: 50vh;
  transform: translateY(-50%);
}

.remain {
  cursor: pointer;
}

.pin-input {
  width: 43px;
}
</style>
