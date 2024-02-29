<template>
  <div class="accordion">
    <slot />
  </div>
</template>

<script setup></script>

<style lang="scss">
  .q-expansion-item {
    margin-bottom: 8px;
  }

  .q-expansion-item__container {
    border-radius: $radius;
    background-color: var(--q-white);
    overflow: hidden;
  }
</style>
