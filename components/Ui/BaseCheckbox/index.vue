import type { Value } from 'sass';

<template>
  <label :class="[$style.baseCheckbox]">
    <input
      v-model="value"
      :class="$style.nativeInput"
      type="checkbox"
      :name="name"
    />
    <span :class="[$style.container]">
      <client-only>
        <font-awesome-icon :class="$style.icon" icon="fa-solid fa-check" />
      </client-only>
    </span>
    <slot>
      <span>{{ label }}</span>
    </slot>
  </label>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue?: boolean
  label: string
  name: string
}>()
const { formData, mutateFormData } = inject(dataFromParentForm, {}) as Provide
const currentInput = formData?.value[props.name]

const value = computed({
  get() {
    return props.modelValue
  },
  set(value: boolean) {
    emit('update:modelValue', value)
    mutateFormData(props.name, {
      value: value,
    })
  },
})
</script>

<style lang="scss" module>
.baseCheckbox {
  $root: &;
  transition: 0.2s;
  cursor: pointer;
  display: inline-flex;
  align-items: center;

  &:hover {
    .container {
      border-color: $accent;
      box-shadow: 0 0 0 2px $light-blue;
    }
  }

  .container {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $white;
    border: 1px solid $gray;
    border-radius: 4px;
    position: relative;
    margin-right: 4px;

    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      color: $accent;
      display: none;
    }
  }

  .nativeInput {
    display: none;
    &:checked {
      color: red;
      & ~ .container {
        .icon {
          display: block;
        }
      }
    }
  }
}
</style>
