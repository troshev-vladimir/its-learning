<template>
  <form :class="[$style['base-form']]" @submit.prevent="submit">
    <h2 :class="[$style.title, 'text-h2']">{{ title }}</h2>

    <div :class="[$style['form-content'], 'pretty-scroll']">
      <slot></slot>
    </div>

    <div :class="$style.actions">
      <slot name="actions">
        <UiBaseButton
          native-type="submit"
          :disabled="fuckedUp || dirty"
          size="small"
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
const props = defineProps<{
  title: string
  fuckedUp?: boolean
  dirty?: boolean
  submiText?: string
}>()
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

  .form-content {
    overflow: auto;
    padding: 0 3px; // для теней
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
