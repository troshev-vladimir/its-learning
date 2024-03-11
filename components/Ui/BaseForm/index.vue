<template>
  <form
    :class="[
      $style['base-form'],
      { [$style['base-form--loadding']]: loadding },
    ]"
    @submit.prevent="submit"
  >
    <h2 :class="[$style.title, 'text-h2']">{{ title }}</h2>

    <div
      :class="[
        $style['form-content'],
        'pretty-scroll',
        isLoading ? 'disabled' : '',
      ]"
    >
      <slot></slot>
    </div>

    <div :class="$style.actions">
      <slot name="actions">
        <UiBaseButton
          native-type="submit"
          :disabled="fuckedUp || dirty"
          size="small"
          :model-value="isLoading"
        >
          {{ submiText || 'Отправить' }}
        </UiBaseButton>
      </slot>

      <span v-if="fuckedUp" :class="$style.errorMessage">
        Форма заполнена не верно
      </span>
    </div>
  </form>
</template>

<script setup lang="ts">
interface Props {
  title: string
  fuckedUp?: boolean
  dirty?: boolean
  loadding?: boolean
  submiText?: string
  isLoading?: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['submit'])

const submit = () => {
  if (props.fuckedUp) return
  emit('submit')
}
</script>

<style lang="scss" module>
.base-form {
  width: 100%;
  height: 100%;
  max-height: inherit;
  // padding: 24px;
  display: flex;
  flex-direction: column;
  position: relative;

  .form-content {
    position: relative;
    overflow: auto;
    padding: 5px 3px; // для теней

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  &--loadding {
    &:after {
      content: 'Отправка...';
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #fff;
      opacity: 0.6;
    }
  }
}

.title {
  padding-bottom: 16px;
  // border-bottom: 1px solid $secondary;
}

.actions {
  display: flex;
  gap: 20px;
  align-items: center;
  // border-top: 1px solid $secondary;
  padding-top: 24px;
}

.errorMessage {
  color: $error;
}
</style>
