<template>
  <div class="contract-signing">
    <div v-if="!approved" class="contract-signing__container">
      <div class="contract-signing__header">
        <p class="text-h2 text-bold">
          <slot name="title"> Подписание договора </slot>
        </p>
      </div>
      <div class="contract-signing__content">
        <FeatureContractForm
          ref="formEl"
          v-model="form"
          :is-loadding="false"
        ></FeatureContractForm>
        <div class="contract-signing__docs">
          <UiBaseButton
            v-for="(doc, i) in docs"
            :key="i"
            type="link"
            tag="a"
            :href="doc.link"
            target="_blank"
            size="small"
          >
            {{ doc.name }}
          </UiBaseButton>
        </div>
        <UiBaseCheckbox
          v-model="approvContract"
          class="q-mt-sm q-mb-lg"
          label="Я прочитал договор и согласен со всем в нем"
        />
      </div>

      <FeatureVerificationCode
        class="contract-signing__footer"
        @send="sendApprove"
      >
        <template #default="{ verifyCode, className }">
          <UiBaseButton
            :model-value="isLoading"
            type="primary"
            size="small"
            :class="className"
            @click="signUp(verifyCode)"
          >
            Подписать договор
          </UiBaseButton>
        </template>
      </FeatureVerificationCode>
    </div>
    <div v-else class="contract-signing__success">
      <p class="text-h2 text-blue q-mb-md">Договор подписан!</p>
      <p class="text-body1">Спасибо, что вы с нами 🤗</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNotification } from '@kyvg/vue3-notification'
import type { IDoc } from '~/types'

interface Props {
  docs?: IDoc[]
}
defineProps<Props>()

const form = reactive({
  name: '',
  surname: '',
  lastname: '',
  birthdate: '',
  birthplace: '',
  snils: '',
  pasport: '',
  departmentCode: '',
  extradition: '',
})

const formEl = ref<any>(null)
const { notify } = useNotification()
const approvContract = ref<boolean>(false)
const approved = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const sendApprove = async (code: number | string) => {
  try {
    isLoading.value = true
    if (approvContract.value === false)
      throw {
        type: 'warn',
        title: 'Подтвердите свои действия',
      }
    console.log(code)
    approved.value = true
  } catch (error) {
    notify(error)
  } finally {
    isLoading.value = false
  }
}

const signUp = async (verifyCode: Function) => {
  const isValid = await formEl.value?.validate()
  console.log(isValid)
  if (!isValid) {
    notify({ type: 'warn', title: 'Заполните форму верно' })
    return
  }
  verifyCode()
}
</script>

<style lang="scss" scoped>
.contract-signing {
  padding-bottom: 36px;
  overflow: auto;
  max-height: inherit;
  background: $white;
  border-radius: 8px;

  &__header {
    position: sticky;
    top: 0;
    z-index: 2;
    background: $white;
    padding: 24px 24px 8px 24px;
  }

  &__content {
    padding: 0 24px;
  }

  &__footer {
    background: $white;
    padding: 0px 24px;
  }

  &__docs {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 24px;
  }

  &__success {
    padding: 24px 24px 0 24px;
  }
}
</style>
