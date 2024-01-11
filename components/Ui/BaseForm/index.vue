<template>
  <form @submit.prevent="submit" ref="formEl" class="base-form">
    <h2 :class="$style.title">{{ title }}</h2>
    <slot :validators="validators"></slot>

    <div :class="$style.actions">
      <UiBaseButton :disabled="!isSuccessfullyFilled" size="small">
        Submit
      </UiBaseButton>
      <span :class="$style.errorMessage">{{ message }}</span>
    </div>
  </form>

  {{ localData }}
</template>

<script setup lang="ts">
import type { Provide } from './types'
import { dataFromParentForm } from '~/utils/symbols'
import { provide } from 'vue'
import * as validators from '~/utils/validators'

const props = defineProps<{
  title: string
}>()

const emit = defineEmits(['update:modelValue', 'submit'])
const formEl = ref<HTMLFormElement | null>(null)
const message = ref('')
const isSuccessfullyFilled = ref(true)

const _lockalData = ref({})
const localData = computed({
  get() {
    return _lockalData.value
  },
  set(value) {
    _lockalData.value = value
    emit('update:modelValue', value)
  },
})

const checkAllFields = () => {
  // @ts-ignore
  const fields = Object.values(localData.value)
  const values = fields.map((el) => el.status)
  const isExistError = values.includes('error')

  return !isExistError
}

const submit = () => {
  if (!formEl.value) return
  isSuccessfullyFilled.value = checkAllFields()

  if (isSuccessfullyFilled.value) {
    emit('submit', new FormData(formEl.value))
  } else {
    message.value = 'Форма заполенена не верно'
  }
}

const changeFormData = (elName: keyof typeof localData.value, value: any) => {
  if (!localData || !localData.value) return
  localData.value[elName] = value
}

provide(dataFromParentForm, {
  formData: readonly(localData),
  mutateFormData: changeFormData,
} as Provide)
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
