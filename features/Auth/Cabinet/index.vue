<template>
  <UiBaseForm
    title="Вход в Личный кабинет Студента"
    :fucked-up="v$.$error"
    :dirty="!!v$.$errors.length"
    submi-text="Войти"
    :loadding="formLoadding"
    @submit="sendForm"
  >
    <UiBaseInput
      v-model="v$.login.$model"
      name="login"
      label="Логин"
      required
      :root-class="['q-mb-sm']"
      :validation-result="{
        status: v$.login.$error ? 'error' : 'none',
        message: getErrorMessage(v$.login),
      }"
    />
    <UiBaseInput
      v-model="v$.password.$model"
      name="password"
      label="Пароль"
      type="password"
      required
      :root-class="['q-mb-sm']"
      :validation-result="{
        status: v$.password.$error ? 'error' : 'none',
        message: getErrorMessage(v$.password),
      }"
    />
  </UiBaseForm>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
const router = useRouter()
const form = reactive({ login: '', password: '' })
const formLoadding = ref(false)
const $externalResults = ref({})
const userSotre = useUserStore()
const { accessToken } = storeToRefs(userSotre)
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
const v$ = useVuelidate(rules, form, { $externalResults })
const sendForm = async () => {
  const isFormCorrect = await v$.value.$validate()

  if (isFormCorrect) {
    formLoadding.value = true
    const { data: token, error } = await useFetch('/api/auth/login', {
      body: JSON.stringify(form),
      method: 'POST',
    })
    formLoadding.value = false

    $externalResults.value = error.value?.data.data
    if (token.value) {
      accessToken.value = token.value
      router.push({ path: '/cabinet/' })
    }
  }
}
const getErrorMessage = (field: any) => {
  if (field.$errors && field.$errors.length) {
    return field.$errors[0].$message
  }

  return ''
}
</script>
