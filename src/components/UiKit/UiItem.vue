<template>
  <div class="rounded-lg bg-secondary d-flex items-center">
    <div class="lablel col-grow d-flex justify-between q-px-md text-body2">
      <span>
        <slot />
      </span>
      <span>
        <slot name="lableRight" />
      </span>
    </div>
    <ui-button size="sm" color="accent">{{ props.buttonText }} </ui-button>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
  buttonText: {
    type: String,
    default: "",
  },
});
</script>

<style></style>
