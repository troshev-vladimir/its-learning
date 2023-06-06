<template>
  <q-expansion-item
    expand-icon="fa-solid fa-plus"
    :label="props.item.title"
    :caption="props.item.subtitle"
    header-class="text-body1 text-bold q-pa-lg"
  >
    <q-card class="q-px-lg q-pb-lg q-pt-sm">
      <q-card-section class="q-pa-none">{{
        props.item.content
      }}</q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
  item: Object,
});
</script>

<style lang="scss">
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
