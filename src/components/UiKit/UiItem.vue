<template>
  <div class="ui-item d-flex items-center">
    <div
      class="lablel bg-secondary col-grow d-flex justify-between items-center q-px-md text-body2"
    >
      <span>
        <slot />
      </span>
      <span>
        <slot name="lableRight" />
      </span>
    </div>
    <ui-button size="sm" color="accent" text-class="text-white"
      >{{ props.buttonText }}
    </ui-button>
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

  .lablel {
    padding: 8px;
    width: 100%;
    border-radius: 8px;
  }

  .ui-button {
    width: 100%;
    border-radius: 8px;
  }

  @media screen and (max-width: $breakpoint-sm) {
    background-color: var(--q-secondary);
    border-radius: 8px;
    overflow: hidden;
  }

  @media screen and (min-width: $breakpoint-sm) {
    flex-direction: row;
    align-items: stretch;

    .lablel {
      width: auto;
      margin-right: -24px;
      padding-right: 24px + 16px;
      border-radius: 16px;
    }
    .ui-button {
      width: auto;
      border-radius: 16px;
    }
  }
}
</style>
