<template>
  <form @submit.prevent class="base-form">
    <slot></slot>
    {{ form }}
  </form>
</template>

<script setup lang="ts">
const slots = defineSlots<{
  default(): any
}>()

let form: Ref<any> = ref({})

provide('parentForm', form)
</script>

<style lang="scss">
.base-form {
  padding: 24px;
  background: $white;
  border-radius: 16px;
}
</style>
