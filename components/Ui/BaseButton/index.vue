<template>
  <component
    :is="tagName"
    :to="type === 'link' && to ? to : ''"
    :href="type === 'external-link' && typeof to == 'string' ? to : ''"
    :target="type == 'external-link' ? '_blank' : 'none'"
    class="base-button"
    :class="[
      type,
      size,
      isLoading ? 'loading' : true,
      disabled ? '_disabled' : null,
    ]"
    :type="nativeType"
  >
    <slot name="prev-icon">
      <UiBaseIcon
        v-if="prevIconName"
        width="16px"
        height="16px"
        font-size="16px"
        radius="4px"
        class="base-button__icon"
        :icon="prevIconName"
        :background="type === 'primary' ? '#a1c4e7' : undefined"
      />
    </slot>
    <p class="base-button__text" :class="{ small: size == 'small' }">
      <slot />
    </p>
    <slot name="post-icon">
      <UiBaseIcon
        v-if="postIcon"
        width="16px"
        height="16px"
        font-size="16px"
        radius="4px"
        class="base-button__icon"
        :icon="postIcon"
        :background="type === 'primary' ? '#a1c4e7' : undefined"
      />
    </slot>
    <UiSpinnerIcon
      v-if="isLoading"
      :style="['primary'].includes(type) ? 'light' : 'accent'"
      class="base-button__spinner"
    />
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { RouterLinkProps } from 'vue-router'

const emit = defineEmits(['update:modelValue'])

interface IProps {
  postIcon?: string
  prevIcon?: string
  size?: 'big' | 'small'
  tag?: string
  type?: 'primary' | 'secondary' | 'boarded' | 'link' | 'external-link'
  to?: string | RouterLinkProps
  modelValue?: boolean
  nativeType?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'primary',
  size: 'big',
  tag: 'button',
  disabled: false,
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
    return props.prevIcon || 'fa-solid fa-up-right-from-square'
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

  &.disabled,
  &._disabled {
    color: $gray !important;
    cursor: not-allowed;
    pointer-events: none;
  }

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

    * {
      color: $white;
    }

    &:hover {
      background: $blue-400;
    }

    &:active {
      background: $blue-900;
    }

    &.disabled,
    &._disabled {
      background: $gray !important;
    }
  }

  &.secondary {
    color: $accent;
    background: $white;
    box-shadow: 0px 2px 4px 0px rgba(16, 16, 16, 0.25);

    * {
      color: $accent;
    }

    &:hover * {
      color: $blue-400;
    }

    &:active {
      * {
        color: $blue-900;
      }

      box-shadow: none !important;
    }

    &.disabled,
    &._disabled * {
      color: $gray;
    }
  }

  &.boarded {
    outline: 2px solid $accent;
    outline-offset: -2px;
    color: $accent;
    background: transparent;

    * {
      color: $accent;
    }

    &:hover {
      outline: 2px solid $blue-400;
      color: $blue-400;

      * {
        color: $blue-400;
      }
    }

    &:active {
      outline: 2px solid $blue-900;
      color: $blue-900;
      * {
        color: $blue-900;
      }
    }
    &._disabled {
      outline-color: $gray !important;
      * {
        color: $gray !important;
      }
    }
  }

  &.link,
  &.external-link {
    padding: 0 !important;
    color: $accent;
    background: transparent;
    font-weight: 400;

    * {
      color: $accent;
    }

    &:hover {
      color: $blue-400;
      text-decoration: underline;

      * {
        color: $blue-400;
      }
    }
    &:active {
      color: $blue-900;
      text-decoration: underline;

      * {
        color: $blue-900;
      }
    }

    &._disabled * {
      color: $gray;
    }
  }

  &.small {
    padding: 8px 16px;
    border-radius: 8px;
    line-height: 20px;
    font-size: 12px;

    @media screen and (min-width: $bp-sm) {
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

    @media screen and (min-width: $bp-sm) {
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
