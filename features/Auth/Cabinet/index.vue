<template>
  <UiBaseForm
    title="Вход в Личный кабинет Студента"
    :fucked-up="v$.$error"
    :dirty="!!v$.$errors.length"
    submi-text="Войти"
    @submit="sendForm"
  >
    <UiBaseInput
      v-model="form.login"
      name="login"
      label="Логин"
      required
      :root-class="['q-mb-sm']"
      :validation-result="{
        status: v$.login.$error ? 'error' : 'success',
        message: getErrorMessage(v$.login),
      }"
      @update="v$.value.login.$touch()"
    />
    <UiBaseInput
      v-model="form.password"
      name="password"
      label="Пароль"
      type="password"
      required
      :root-class="['q-mb-sm']"
      :validation-result="{
        status: v$.password.$error ? 'error' : 'success',
        message: getErrorMessage(v$.password),
      }"
      @update="v$.value.password.$touch()"
    />
  </UiBaseForm>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
const router = useRouter()
const form = reactive({ login: '', password: '' })

const rules = computed(() => {
  return {
    login: {
      required: helpers.withMessage('Поле обязательно', required),
    },

    password: {
      required: helpers.withMessage('Поле обязательно', required),
    },
  }
})
const v$ = useVuelidate(rules, form)
const sendForm = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    router.push({ path: '/cabinet/' })
  }
}
const getErrorMessage = (field: any) => {
  if (field.$errors && field.$errors.length) {
    return field.$errors[0].$message
  }

  return ''
}
</script>
