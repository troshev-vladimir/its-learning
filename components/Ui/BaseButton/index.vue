<template>
  <component
    :is="tagName"
    :to="type === 'link' && to ? to : ''"
    :href="type === 'external-link' && typeof to == 'string' ? to : ''"
    :target="type == 'external-link' ? '_blank' : 'none'"
    class="base-button"
    :class="[type, size, isLoading ? 'loading' : true]"
  >
    <slot name="prev-icon">
      <client-only>
        <font-awesome-icon
          v-if="prevIconName"
          class="base-button__icon"
          :icon="prevIconName"
        />
      </client-only>
    </slot>
    <p class="base-button__text">
      <slot />
    </p>
    <slot name="post-icon">
      <client-only>
        <font-awesome-icon
          v-if="postIcon"
          class="base-button__icon"
          :icon="postIcon"
        />
      </client-only>
    </slot>
    <UiSpinnerIcon
      :style="['primary'].includes(type) ? 'light' : 'accent'"
      class="base-button__spinner"
      v-if="isLoading"
    />
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { RouterLinkProps } from 'vue-router'

const emit = defineEmits(['update:modelValue'])

interface IProps {
  type?: 'primary' | 'secondary' | 'boarded' | 'link' | 'external-link'
  to?: string | RouterLinkProps
  size?: 'big' | 'small'
  modelValue?: boolean
  tag?: string
  prevIcon?: string
  postIcon?: string
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'primary',
  size: 'big',
  tag: 'button',
})

const isLoading = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const prevIconName = computed(() => {
  if (['link', 'external-link'].includes(props.type)) {
    return 'fa-solid fa-up-right-from-square'
  } else {
    return props.prevIcon
  }
})

const tagName = computed(() => {
  if (['link', 'external-link'].includes(props.type)) {
    return 'router-link'
  }
  return props.tag
})
</script>

<style lang="scss" scoped>
.base-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: fit-content;
  position: relative;
  border: none;
  cursor: pointer;
  font-weight: 600;

  &__spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &.loading {
    pointer-events: none;
    .base-button__text {
      visibility: hidden;
    }
  }

  &.primary {
    color: $white;
    background: $accent;

    &:hover {
      background: $cornflower-blue;
    }

    &:active {
      background: $cobalt;
    }

    &.disabled {
      background: $gray !important;
    }
  }

  &.secondary {
    color: $accent;
    background: $white;
    box-shadow: 0px 2px 4px 0px rgba(16, 16, 16, 0.25);

    &:hover {
      color: $cornflower-blue;
    }

    &:active {
      color: $cobalt;
    }

    &.disabled {
      color: $gray !important;
    }
  }

  &.boarded {
    outline: 2px solid $accent;
    outline-offset: -2px;
    color: $accent;
    background: transparent;

    &:hover {
      border-color: $cornflower-blue;
      color: $cornflower-blue;
    }

    &:active {
      border-color: $cobalt;
      color: $cobalt;
    }
  }

  &.link,
  &.external-link {
    padding: 0 !important;
    color: $accent;
    background: transparent;
    font-weight: 400;

    &:hover {
      color: $cornflower-blue;
      text-decoration: underline;
    }
    &:active {
      color: $cobalt;
      text-decoration: underline;
    }
  }

  &.small {
    padding: 8px 16px;
    border-radius: 8px;
    line-height: 20px;
    font-size: 12px;

    @media screen and (min-width: $breakpoint-sm) {
      padding: 12px 24px;
      border-radius: 8px;
      line-height: 20px;
      font-size: 16px;
    }
  }

  &.big {
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 16px;
    line-height: 20px;

    * {
      font-size: 16px;
    }

    @media screen and (min-width: $breakpoint-sm) {
      padding: 16px 32px;
      border-radius: 8px;
      font-size: 20px;
      line-height: 20px;

      * {
        font-size: 20px;
      }
    }
  }
}
</style>
