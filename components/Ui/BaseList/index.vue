<template>
  <component :is="tag" class="base-list">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
interface Props {
  tag: 'ul' | 'ol'
}
defineProps<Props>()
</script>

<style lang="scss" scoped>
.base-list {
  margin-top: 8px;
}
</style>
