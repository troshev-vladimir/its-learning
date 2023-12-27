
<template>
  <span
    class="base-checkbox"
    @click="onClickCheckbox"
    :class="{ active: isActiveCheckbox }"
  >
    <span class="base-checkbox__container">
      <font-awesome-icon
        v-if="isActiveCheckbox"
        class="base-chekbox__icon"
        icon="fa-solid fa-check"
      />
    </span>
  </span>
</template>

<script lang="ts" setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
    modelValue: Array,
    value: [String, Array, Number],
  }),
  { modelValue, value } = toRefs(props);

const onClickCheckbox = () => {
  if (isActiveCheckbox.value) {
    emit(
      "update:modelValue",
      modelValue?.value?.filter((item) => item !== value?.value)
    );
    return;
  }
  emit(
    "update:modelValue",
    [modelValue?.value, value?.value].flat().filter((el) => el != null)
  );
};

const isActiveCheckbox = computed(() =>
  modelValue?.value?.includes(value?.value)
);
</script>

<style lang="scss" scoped>
.base-checkbox {
  width: 20px;
  height: 20px;
  border: 1px solid $gray;
  border-radius: 4px;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    border-color: $accent;
    box-shadow: 0 0 0 2px $light-blue;
  }

  &__container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $white;
  }

  &.active {
    background: $accent;
    border-color: $accent;

    .base-checkbox__container {
    }
  }
}
</style>
