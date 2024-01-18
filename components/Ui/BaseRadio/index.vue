<template>
  <label :class="$style.uiRadio">
    <input
      type="radio"
      :id="name"
      :name="name"
      :value="value"
      :class="$style.nativeInput"
      v-model="modelValue"
    />
    <div :class="$style.radioContainer"></div>
    <slot>
      <span :class="[$style.label, 'text-body2']">{{ label }}</span>
    </slot>
  </label>
</template>

<script setup lang="ts">
import type { ValidatorResp } from '~/utils/validators/types'

const props = defineProps<{
  label?: string
  name: string
  value: string
  modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])

const { value: modelValue, isError, update } = useFormItem(props, emit)
</script>

<style lang="scss" module>
.uiRadio {
  display: inline-flex;
  align-items: center;
  width: max-content;
  gap: 8px;
  cursor: pointer;

  &:hover {
    .radioContainer {
      border-color: $accent;
      box-shadow: 0 0 0 2px $light-blue;
    }
  }

  .radioContainer {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex: 0 0 auto;
    border-radius: 100000px;
    border: 1px solid var(--q-secondary, #ccc);

    &::after {
      display: none;
      content: '';
      border-radius: 10000px;
      background: var(--q-white, #fff);
      width: 10px;
      height: 10px;
    }
  }

  .nativeInput {
    display: none;

    &:checked ~ .radioContainer {
      background: var(--q-accent, #0075eb);
      border: 1px solid var(--q-accent, #0075eb);

      &::after {
        display: block;
      }
    }
  }
}
</style>
