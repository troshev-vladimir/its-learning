<template>
  <UiBaseForm
    title="Резюме"
    class="base-block q-mt-lg q-mb-lg"
    @submit="sendForm"
    :fucked-up="v$.$error"
    :dirty="v$.$errors.length"
  >
    <UiBaseInput
      name="name"
      label="Введите имя"
      required
      :root-class="['q-mb-xl']"
      v-model="v$.name.$model"
      @update="updateValue('name')"
      :validation-result="{
        status: v$.name.$error ? 'error' : 'success',
        message: getErrorMessage(v$.name),
      }"
    />
    <UiBaseInput
      name="email"
      label="Введите почту"
      type="text"
      :root-class="['q-mb-xl']"
      v-model="form.email"
      @update="updateValue('email')"
      :validation-result="{
        status: v$.email.$error ? 'error' : 'success',
        message: getErrorMessage(v$.email),
      }"
    />
    <UiBaseCheckbox
      name="current-work"
      v-model="v$.isCurrent.$model"
      label="По настоящее время"
      @update="updateValue('isCurrent')"
      required
      :validation-result="{
        status: v$.isCurrent.$error ? 'error' : 'success',
        message: getErrorMessage(v$.isCurrent),
      }"
    ></UiBaseCheckbox>
  </UiBaseForm>
</template>

<script setup lang="ts">
import {
  required,
  email,
  minLength,
  helpers,
  sameAs,
} from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const form = reactive<Record<string, any>>({
  name: '',
  email: 'initial',
  isCurrent: false,
})

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Поле обязательно', required),
      email: helpers.withMessage('Не верный email', email),
      $autoDirty: true,
    },
    name: {
      required: helpers.withMessage('Поле обязательно', required),
      minLength: helpers.withMessage(
        ({ $params }: Record<string, any>) => `Минимум ${$params.min} символов`,
        minLength(6)
      ),
      $autoDirty: true,
    },
    isCurrent: {
      sameAs: helpers.withMessage(
        'Надо отметить  обязательно',
        (value: boolean) => {
          console.log(value)
          return value
        }
      ),
    },
  }
})

const v$ = useVuelidate(rules, form)

const getErrorMessage = (field: any) => {
  if (field.$errors && field.$errors.length) {
    return field.$errors[0].$message
  }

  return ''
}

const updateValue = (fieldName: string) => {
  v$.value[fieldName].$touch()
}

const sendForm = async () => {
  // v$.value.$reset()
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    console.log('sendForm')
  }
}
</script>
