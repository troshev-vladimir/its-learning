<template>
  <form @submit.prevent="submit" class="base-form">
    <h2 :class="$style.title">{{ title }}</h2>
    <slot></slot>

    <div :class="$style.actions">
      <UiBaseButton :disabled="fuckedUp" size="small"> Submit </UiBaseButton>
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
}>()
const emit = defineEmits(['submit'])

const submit = () => {
  if (props.fuckedUp) return
  emit('submit')
}
</script>

<style lang="scss" module>
.base-form {
  padding: 24px;
  background: $white;
  border-radius: 16px;
}

.title {
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 30px;
}

.actions {
  display: flex;
  gap: 20px;
  align-items: center;
  border-top: 1px solid $secondary;
  padding-top: $lg;
}

.errorMessage {
  color: $error;
}
</style>
