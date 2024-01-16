<template>
  <form @submit.prevent="submit" class="base-form">
    <h2 :class="$style.title">{{ title }}</h2>
    <slot :validators="validators"></slot>

    <div :class="$style.actions">
      <UiBaseButton :disabled="!isSuccessfullyFilled" size="small">
        Submit
      </UiBaseButton>
      <span v-if="!isSuccessfullyFilled" :class="$style.errorMessage">{{
        message
      }}</span>
    </div>
  </form>

  {{ localData }}
</template>

<script setup lang="ts">
import * as validators from '~/utils/validators'
import useProvide from './composables/useProvide'
import useValidation from './composables/useValidation'
const props = defineProps<{
  title: string
}>()
const emit = defineEmits(['update:modelValue', 'submit'])
const _lockalData = ref({})
const localData = computed<any>({
  get() {
    return _lockalData.value
  },
  set(value) {
    _lockalData.value = value
    emit('update:modelValue', value)
  },
})

const { checkAllFields, message, isSuccessfullyFilled } =
  useValidation(localData)
const {} = useProvide(localData, isSuccessfullyFilled)

const submit = () => {
  checkAllFields()
  if (isSuccessfullyFilled.value) {
    emit('submit', localData.value)
  }
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
