<template>
  <div class="flex">
    <h2 class="text-h2 q-mb-md">Потратить заработанное</h2>
    <div class="flex wrap items-center full-width q-mb-lg" style="gap: 16px">
      <TimerComponent
        :finalsteptime="userStore.userBonus?.finalsteptime"
        style="flex: 0 0 auto"
        class="shadow-2"
      />
      <p>
        Твой заработок хранится 48 часов.
        <br />Не упусти свой шанс.
      </p>
    </div>
    <div class="flex wrap items-center full-width q-mb-sm" style="gap: 16px">
      <CashCounter
        class="shadow-2"
        :amount="
          userStore.userBonus?.sum + userStore.userBonus?.promodiscount || 0
        "
      />

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
          @enter="sendPromocode"
          @blur="sendPromocode"
          placeholder="Введите промокод"
          class="q-mr-md code-input"
          v-model="codeValue"
          :rules="[minMaxLength(6, 6)]"
        />
        <span v-if="codeSended"> Код неверный </span>
      </div>
    </div>
    <p class="q-mt-lg text-body2 text-secondary">
      Подробней о правилах подсчёта бонусов читай
      <a
        class="text-accent"
        href="https://drive.google.com/file/d/1I51sbMMr48lhJpgzDUVm0dzluxixPB-S/view?usp=sharing"
        target="_blank"
      >
        тут
      </a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue'
import useUserStore from '~/stores/configurator/user'
import { minMaxLength } from '~/shared/validators'

const userStore = useUserStore()
const { userPromocode } = storeToRefs(userStore)

const codeValue = ref('')
const codeSended = ref(false)
// const { data: user, error } = useAsyncData('user', async () => {
//   return await userStore.getUserBonus()
// })

const sendPromocode = async () => {
  if (!codeValue.value.length) return
  codeSended.value = true
  userPromocode.value = codeValue.value
}

watch(userPromocode, () => {
  userStore.getUserBonus()
})

watch(codeValue, () => {
  codeSended.value = false
})

onMounted(() => {
  userStore.getUserBonus() // TODO: How to auth on server
})
</script>

<style lang="scss">
.code-input {
  width: 200px;
}
</style>
