<template>
  <UiBaseForm title="Форма" @submit="sendForm" :fucked-up="v$.$error">
    <UiBaseInput
      name="name"
      label="Введите имя"
      required
      :root-class="['q-mb-xl']"
      v-model="form.name"
      @update:modelValue="updateValue('name')"
      :validation-result="{
        status: v$.name.$error ? 'error' : 'success',
        message: 'Не правильно',
      }"
    />
    <UiBaseInput
      name="email"
      label="Введите почту"
      type="text"
      :root-class="['q-mb-xl']"
      v-model="form.email"
      @update:modelValue="updateValue('email')"
      :validation-result="{
        status: v$.email.$error ? 'error' : 'success',
        message: 'Не правильно',
      }"
    />
    <!-- <UiBaseCheckbox>asdasd</UiBaseCheckbox> -->
  </UiBaseForm>
</template>

<script setup lang="ts">
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const form = reactive<Record<string, any>>({
  name: '',
  email: 'initial',
})

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Поле обязательно', required),
      email: helpers.withMessage('Не верный email', email),
    },
    name: {
      required,
      minLength: helpers.withMessage('Минимум 6 символов', minLength(6)),
    },
  }
})

const updateValue = (name: string) => {
  v$.$reset()
  v$[name].touch
}

const v$ = useVuelidate(rules, form)

const sendForm = () => {
  v$.value.$validate()
  if (!v$.value.$error) {
    console.log('sendForm')
  }
}
</script>
