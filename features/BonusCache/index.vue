<template>
  <div class="flex">
    <h2 class="text-h2 q-mb-md">Потратить заработанное</h2>
    <div class="flex wrap items-center full-width q-mb-lg" style="gap: 16px">
      <TimerComponent
        :expiration-date="userStore.userBonus?.finalsteptime"
        style="flex: 0 0 auto"
        class="shadow-2"
      />
      <p>
        Твой заработок хранится 24 часa.
        <br />Не упусти свой шанс.
      </p>
    </div>
    <div class="flex wrap items-center full-width q-mb-sm" style="gap: 16px">
      <CashCounter class="shadow-2" :amount="userStore.userBonus?.sum || 0" />

      <q-chip
        v-if="userStore.userBonus?.promodiscount"
        outline
        color="green"
        text-color="white"
        icon="fas fa-chevron-down"
        class="q-mt-sm self-center"
      >
        Промокод принят
      </q-chip>
      <div class="d-flex items-center" v-else>
        <UiBaseInput
          ref="refPromocodeInput"
          @blur="({ status }) => sendPromocode(status)"
          placeholder="Введите промокод"
          class="q-mr-md"
          v-model="codeValue"
          :rules="[minMaxLength(6, 6)]"
          :message="
            codeValue.length != 6 && validate
              ? 'Промокод состоит из 6 символов'
              : ''
          "
          :is-validate="validate"
        />

        <span v-if="codeSended"> Не правильно </span>
      </div>
    </div>
    <p class="text-body2 text-secondary">
      Подробней о правилах подсчёта бонусов читай
      <a
        class="text-accent"
        href="https://drive.google.com/file/d/1plR7AYYlzmD26AJ-P_nxkmjeiHzirqol/view?usp=share_link"
        target="_blank"
        >тут</a
      >
    </p>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue'
import useUserStore from '~/stores/user'
import { minMaxLength } from '~/shared/validators'

const userStore = useUserStore()
const { userPromocode } = storeToRefs(userStore)

const codeValue = ref('')
const validate = ref(false)
const codeSended = ref(false)
// const { data: user, error } = useAsyncData('user', async () => {
//   return await userStore.getUserBonus()
// })

const sendPromocode = async (status: string) => {
  validate.value = true
  if (status && ['error', 'warning'].includes(status)) return
  codeSended.value = true
  userStore.userPromocode = codeValue.value
}

watch(userPromocode, () => {
  userStore.getUserBonus()
})

onMounted(() => {
  userStore.getUserBonus() // TODO: How to auth on server
})
</script>

<style></style>
