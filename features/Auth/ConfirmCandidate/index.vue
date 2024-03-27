<template>
  <form
    ref="formPin"
    class="rounded-lg bg-white text-primary q-pa-lg shadow-2 text-center"
    @submit.prevent
  >
    <p class="q-mb-md text-body1">Пароль:</p>
    <div class="d-flex items-center">
      <UiPincodeInput
        ref="pinRef"
        v-model="pin"
        :error="pincodeError"
        :disabled="loadding"
        @completed="logIn"
      >
        <template v-if="userStore.user.alreadyExists" #hint>
          На указанный вами номер телефона, ранее мы отправляли смс с паролем
          для входа в игру. Используйте его для авторизации.
        </template>
        <template v-else #hint>
          На указанный вами номер мы отправили пароль для входа в игру, введите
          его в поле выше
        </template>
      </UiPincodeInput>
    </div>
    <div class="flex q-mt-lg justify-center">
      <div class="" style="position: relative">
        <UiButton
          size="sm"
          outline
          :text-class="['text-body2', 'text-accent', 'text-bold']"
          @click="goBack"
        >
          Назад
        </UiButton>
        <div class="loadder-wrappper">
          <q-spinner
            v-if="loadding"
            class="loadder"
            color="primary"
            size="32px"
          />
        </div>
      </div>
    </div>
    <p
      v-if="userStore.user.alreadyExists && !currentTimeToResend"
      class="remain text-accent text-body2 text-center q-mt-md cursor-pointer"
      @click="resend"
    >
      Напомнить пароль
    </p>

    <div v-if="currentTimeToResend" class="text-body2 q-mt-md">
      Повторная отправка возможна через:
      <span class="text-no-wrap">{{ getTime }}</span>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import useTimer from './composables/useTimer'
import { useQuasar } from 'quasar'
import useUserStore from '~/stores/configurator/user'
import { useRoute } from 'vue-router'
import type { UTMs } from '~/stores/configurator/user'
import axiosN8N from '~/api/axios-n8n'

const route = useRoute()

const userStore = useUserStore()

const { setTimer, getTime, currentTimeToResend } = useTimer()
const emit = defineEmits(['goBack', 'goFurther'])

const pincodeError = ref('')
const pin = ref('')
const pinRef = ref(null)
const form = ref(null)
const loadding = ref(false)
const $q = useQuasar()

const getUtmQuery = () => {
  const query = route.query
  const utmResult: UTMs = {}

  const utms: Array<keyof UTMs> = ['utm_medium', 'utm_campaign', 'utm_source']

  utms.forEach((el) => {
    if (query[el]) {
      utmResult[el] = String(query[el])
    }
  })

  return utmResult
}

const goBack = () => {
  emit('goBack')
}

watch(pin, (value) => {
  if (value) {
    pincodeError.value = ''
  }
})

const resotre = () => {
  pin.value = ''
  pincodeError.value = ''
}

const validatePin = () => {
  if (pin.value.length < 4) {
    pincodeError.value = 'Неправильный пароль'
    return false
  }
  return true
}

const logIn = async () => {
  const nowDate = new Date()

  try {
    const isFormValid = validatePin()
    if (!isFormValid) throw Error('invalid form')
    loadding.value = true
    await userStore.confirmUser(pin.value, getUtmQuery())
    $q.notify({
      color: 'green',
      message: 'Упешно выполнен вход',
    })

    await axiosN8N.post('/manage-authorization', {
      phone: route.query.phone?.toString() || '',
      code: pin.value,
      status: 'success',
      date:
        nowDate.toLocaleDateString() +
        ' ' +
        nowDate.getHours() +
        ':' +
        nowDate.getMinutes() +
        ':' +
        nowDate.getSeconds(),
    })

    emit('goFurther')
  } catch (error: any) {
    await axiosN8N.post('/manage-authorization', {
      phone: route.query.phone?.toString() || userStore.userId || '',
      code: pin.value,
      status: error.message || error,
      date:
        nowDate.toLocaleDateString() +
        ' ' +
        nowDate.getHours() +
        ':' +
        nowDate.getMinutes() +
        ':' +
        nowDate.getSeconds(),
    })
    pin.value = ''
    setTimeout(() => {
      // @ts-ignore
      pinRef.value.clear()
    })

    $q.notify({
      color: 'negative',
      message: 'Неправильный пароль',
    })
  } finally {
    loadding.value = false
  }
}

const resend = async () => {
  try {
    await userStore.createUser(userStore.userId, true)

    $q.notify({
      color: 'green',
      message: 'Пароль отправлен',
    })
    setTimer()
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: 'Что то пошло не так',
    })
    console.log(error)
  }
}

onMounted(() => {
  resotre()
})
</script>

<style></style>
