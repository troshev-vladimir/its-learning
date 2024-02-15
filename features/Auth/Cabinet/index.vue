<template>
  <div class="feature-auth-cabinet base-block">
    <div class="feature-auth-cabinet__contaner">
      <p class="text-h2">
        Вход в Личный кабинет <span class="text-blue-600">студента</span>
      </p>
      <UiBaseForm
        title="Резюме"
        class="q-mb-lg"
        :fucked-up="v$.$error"
        :dirty="!!v$.$errors.length"
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
          @update:model-value="v$.value.login.$touch()"
        />
        <UiBaseInput
          v-model="form.password"
          name="password"
          label="пароль"
          required
          :root-class="['q-mb-sm']"
          :validation-result="{
            status: v$.password.$error ? 'error' : 'success',
            message: getErrorMessage(v$.password),
          }"
          @update:model-value="v$.value.password.$touch()"
        />
        <UiBaseButton size="small" class="feature-auth-cabinet__submit-button">
          Отправить
        </UiBaseButton>
      </UiBaseForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'

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
    console.log(form)
  }
}
const getErrorMessage = (field: any) => {
  if (field.$errors && field.$errors.length) {
    return field.$errors[0].$message
  }

  return ''
}
</script>

<style lang="scss" scoped>
.feature-auth-cabinet {
  &__submit-button {
    width: 100%;
    margin-top: 24px;
  }
}
</style>
