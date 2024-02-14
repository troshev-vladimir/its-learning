<template>
  <q-form
    v-if="authStage === 'phone'"
    ref="formPhone"
    class="rounded-lg bg-white text-primary q-pa-lg shadow-2 text-center"
    @submit.prevent="requestPin"
  >
    <p class="q-mb-sm text-body1">Номер телефона:</p>
    <q-input
      id="phone"
      v-model="userPhone"
      name="phone"
      mask="+7 (###) ### ## ##"
      placeholder="+7 (___) ___ __ __"
      unmasked-value
      filled
      class="q-mb-md"
      :rules="[
        (val) => !!val || 'Заполните номер телефона',
        (val) => val.length === 10 || 'Введите корректный номер',
      ]"
      lazy-rules
      autofocus
      type="tel"
      @paste="phonePasteEvent"
      no-error-icon
    >
      <template #hint>
        <p style="font-size: 14px">
          Введите номер телефона, и мы отправим вам пароль для входа в игру
        </p>
      </template>
    </q-input>
    <div class="flex justify-center">
      <UiButton
        size="sm"
        class="bg-accent q-mr-md q-mt-md"
        :text-class="['text-body2', 'text-white', 'text-bold']"
        role="submit"
      >
        Далее
      </UiButton>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import useUserStore from '~/stores/configurator/user'
const emit = defineEmits(['goFurther'])

const authStage = ref<'phone' | 'pin'>('phone')
const $q = useQuasar()
const userPhone = ref('')
const route = useRoute()
const userStore = useUserStore()

const phonePasteEvent = (e: ClipboardEvent) => {
  e.preventDefault()
  const { clipboardData } = e
  let paste = clipboardData?.getData('text')
  if (!paste) return
  paste = paste.replace(/[^\d]/g, '')
  const newString = String(paste).substring(String(paste).length - 10)
  userPhone.value = newString
}

const setSavedPhone = () => {
  const savedPhone = localStorage.getItem('userPhone')

  if (savedPhone) {
    userPhone.value = savedPhone.substring(1)
  }
}

const goForward = () => {
  emit('goFurther')
}

const requestPin = async () => {
  const isFormValid = userPhone.value.length === 10
  if (!isFormValid) return

  try {
    await userStore.createUser('7' + userPhone.value)

    if (userStore.user.alreadyExists) {
      $q.notify({
        color: 'green',
        message: 'Введите пароль отправленный вам раннее',
      })
    } else {
      $q.notify({
        color: 'green',
        message: 'Пароль отправлен',
      })
    }
    goForward()
  } catch (error) {
    console.log(error)

    $q.notify({
      color: 'negative',
      message: 'Что то пошло не так',
    })
  }
}

onMounted(() => {
  setSavedPhone()
  if (route.query.unauthorised) {
    $q.notify({
      color: 'negative',
      message: 'Вы не авторизованы или срок действия токена истёк',
    })
  }
})
</script>

<style></style>
