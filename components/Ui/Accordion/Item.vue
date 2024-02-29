<!-- eslint-disable vue/no-v-html -->
<template>
  <q-expansion-item
    expand-icon="fas fa-plus"
    :label="props.title"
    :caption="props.subtitle"
    header-class="text-body1 text-bold q-pa-lg"
  >
    <q-card class="q-px-lg q-pb-lg q-pt-sm">
      <q-card-section class="q-pa-none">
        <slot />
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss">
.q-expansion-item {
  &--expanded {
    .q-icon {
      transform: rotate(45deg);
      color: $red-12;
    }
  }
}
.q-item {
  &:hover {
    .q-focus-helper,
    .q-focus-helper::before,
    .q-focus-helper::after {
      background-color: #fff !important;
    }
  }
}
</style>
