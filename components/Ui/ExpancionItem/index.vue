<template>
  <div class="expansion-item" :class="{ _disabled: disabled }">
    <div class="expansion-item__header">
      <slot name="header">
        <div class="row items-center q-gutter-md" @click="toggleOpenStatus">
          <span class="expansion-item__toggle-icon" :class="{ open: isOpen }">
            <slot name="toggleIcon">
              <ClientOnly> <font-awesome-icon :icon="icon" /> </ClientOnly>
            </slot>
          </span>
          <p class="text-body1 text-bold">{{ title }}</p>
        </div>
      </slot>
    </div>
    <div class="expansion-item__content" :class="{ open: isOpen }" @click.stop>
      <div class="inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title?: string
  icon?: string | string[]
  modelValue: boolean
  disabled?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const isOpen = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const toggleOpenStatus = () => {
  isOpen.value = !isOpen.value
}
</script>

<style lang="scss">
.expansion-item {
  &._disabled {
    opacity: 1 !important;
    cursor: not-allowed !important;
    pointer-events: none;
  }
  &__header {
    cursor: pointer;
  }
  &__content {
    grid-template-rows: 0fr;
    display: grid;
    overflow: hidden;
    transition: grid-template-rows 500ms;

    &.open {
      grid-template-rows: 1fr;
    }

    .inner {
      min-height: 0;
    }
  }

  &__toggle-icon {
    display: block;
    transition: 500ms;
    &.open {
      transform: rotate(180deg);
    }
  }
}
</style>
