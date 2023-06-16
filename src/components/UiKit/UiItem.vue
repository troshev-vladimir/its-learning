<template>
  <div class="ui-item d-flex items-center">
    <div
      class="lablel rounded-lg bg-secondary col-grow d-flex justify-between items-center q-px-md text-body2"
    >
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

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.ui-item {
  flex-direction: column;
  row-gap: $md;

  .lablel {
    height: 43px;
    width: 100%;
  }

  .ui-button {
    width: 100%;
  }

  @media screen and (min-width: $breakpoint-sm) {
    flex-direction: row;
    align-items: stretch;

    .lablel {
      width: auto;
      margin-right: -24px;
      padding-right: 24px + 16px;
    }
    .ui-button {
      width: auto;
    }
  }
}
</style>
