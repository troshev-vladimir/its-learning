<template>
  <div class="contract-signing base-block">
    <div v-if="!approved" class="contract-signing__container">
      <p class="text-body1 text-bold q-mb-md">
        <slot name="title"> Подписание договора </slot>
      </p>
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
      <FeatureVerificationCode @send="sendApprove">
        <template #default="{ verifyCode }">
          <UiBaseButton
            :model-value="isLoading"
            type="primary"
            size="small"
            @click="signUp(verifyCode)"
          >
            Подписать договор
          </UiBaseButton>
        </template>
      </FeatureVerificationCode>
    </div>
    <div v-else>
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

const signUp = (verifyCode: Function) => {
  const isValid = formEl.value?.validate()
  console.log(isValid)
  verifyCode()
}
</script>

<style lang="scss" scoped>
.contract-signing {
  padding-bottom: 36px;

  &__docs {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
}
</style>
