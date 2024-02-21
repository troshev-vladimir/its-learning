<template>
  <div v-if="codeStatus != 'verified'" class="feature-verification-code">
    <UiBaseInput
      v-model="code"
      label="Введите код"
      :validation-result="codeValidation"
      class="feature-verification-code__input"
      @enter="verifyCode"
    />
    <p v-if="timer" class="text-gray-300">
      Отправить повторно через {{ timer }}
    </p>
    <UiBaseButton v-if="!timer" type="boarded" size="small" @click="sendCode">
      Получить код
    </UiBaseButton>
    <slot :verify-code="verifyCode">
      <UiBaseButton
        :model-value="isLoading"
        type="primary"
        size="small"
        @click="verifyCode"
      >
        Отправить код
      </UiBaseButton>
    </slot>
  </div>
  <p v-else class="text-green">Подтверждено</p>
</template>
<script lang="ts" setup>
import { useNotification } from '@kyvg/vue3-notification'
import type { ValidatorResp } from '~/utils/validators/types'

interface Props {
  phone?: string
  codeLength?: number
  intervalLifetime?: number
}

const props = withDefaults(defineProps<Props>(), {
  codeLength: 6,
  intervalLifetime: 2 * 60 * 1000,
})

const emit = defineEmits(['verified'])
const { notify } = useNotification()

const code = ref('')
const codeStatus = ref<'none' | 'sended' | 'verified' | 'unverified'>('none')
const timeEnd = ref<number | null>(null)
const interval = ref<ReturnType<typeof setInterval> | null>(null)

const isLoading = computed(() => codeStatus.value === 'sended')

const timer = computed(() => {
  if (timeEnd.value != null && interval.value) {
    return new Intl.DateTimeFormat('ru-RU', {
      minute: 'numeric',
      second: 'numeric',
    }).format(timeEnd.value - Date.now() + 100)
  }
  return null
})

const validateCodeLength = computed(() => {
  if (
    (code.value.length > 0 && code.value.length < props.codeLength) ||
    code.value.length > props.codeLength
  ) {
    return false
  }
  return true
})

const codeValidation = computed(() => {
  if (validateCodeLength.value === false) {
    return {
      status: 'warn',
      message: `Код должен состоять из ${props.codeLength} символов`,
    } as ValidatorResp
  }

  if (codeStatus.value === 'unverified') {
    return {
      status: 'error',
      message: 'Вы отправили неверный код',
    } as ValidatorResp
  }

  return { status: 'none', message: '' } as ValidatorResp
})

const clearCodeTimer = () => {
  if (interval.value) {
    clearInterval(interval.value)
    interval.value = null
  }
  localStorage.removeItem('codeTimer')
  timeEnd.value = null
}

const setCodeTimer = () => {
  if (!timeEnd.value || timeEnd.value - Date.now() <= 0)
    timeEnd.value = Date.now() + props.intervalLifetime

  if (!interval.value) {
    interval.value = setInterval(() => {
      if (timeEnd.value) {
        timeEnd.value -= 1
        localStorage.codeTimer = timeEnd.value
      }
      if (timeEnd.value && timeEnd.value - Date.now() < 1 && interval.value)
        clearCodeTimer()
    }, 1000)
  }
}

const sendCode = () => {
  setCodeTimer()
  notify({
    title: 'На телефон +79562563542 отправлен код',
    type: 'info',
  })
}

const verifyCode = () => {
  if (code.value.length === 0 || validateCodeLength.value === false) {
    notify({
      title: 'Заполните верно поле для ввода кода',
      type: 'warn',
    })
  } else {
    codeStatus.value = 'sended'
    if (code.value == '123456') {
      setTimeout(() => {
        codeStatus.value = 'verified'
        emit('verified')
        if (interval.value) clearCodeTimer()
      }, 1000)
    } else {
      setTimeout(() => {
        codeStatus.value = 'unverified'
      }, 1000)
    }
  }
}

onMounted(() => {
  if (localStorage.codeTimer) {
    timeEnd.value = parseInt(localStorage.codeTimer)
    setCodeTimer()
  }
})

watch(code, () => {
  codeStatus.value = 'none'
})
</script>
<style lang="scss" scoped>
.feature-verification-code {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  column-gap: 16px;
  row-gap: 8px;

  &__input {
    padding: 0;
  }
}
</style>
