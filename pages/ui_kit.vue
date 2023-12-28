<template>
  <div>
    <UiBaseForm>
      <div class="form-inputs-list">
        <UiBaseInput placeholder="Введите логин" v-model="form.username" />
        <UiBaseInput
          placeholder="Введите почту"
          v-model="form.email"
          :required="true"
          :rules="[required]"
          :is-validate="true"
        />
        <UiBaseCheckbox v-model="checkboxValue" :value="{ new: '123' }" />
        <UiBaseCheckbox v-model="checkboxValue" :value="{ new: '1df23' }" />
        <UiBaseCheckbox v-model="checkboxValue" :value="{ new: '12sd3' }" />
        <UiBaseRadioButton v-model="radioButtonValue" />
      </div>
      <UiBaseButton
        @click="$refs.refBasePopup?.open()"
        type="primary"
        size="big"
      >
        <template #left-icon>
          <font-awesome-icon icon="fa-solid fa-user-astronaut" />
        </template>
        Нажми
      </UiBaseButton>

      <UiBaseButton type="secondary" size="big">
        <template #right-icon>
          <font-awesome-icon icon="fa-solid fa-user-astronaut" />
        </template>
        Базовая кнопка
      </UiBaseButton>

      <UiBaseButton type="primary" size="small">
        <template #left-icon>
          <font-awesome-icon icon="fa-solid fa-user-astronaut" />
        </template>
        Базовая кнопка
      </UiBaseButton>
      <UiBaseButton type="secondary" size="small">
        <template #right-icon>
          <font-awesome-icon icon="fa-solid fa-user-astronaut" />
        </template>
        Базовая кнопка
      </UiBaseButton>
      <UiBaseButton type="link" size="big"> Базовая ссылка </UiBaseButton>
      <UiBaseButton type="link" size="small"> Базовая ссылка </UiBaseButton>
    </UiBaseForm>
    <UiBasePopup ref="refBasePopup">
      <template #header> 123 </template>
      <template #default></template>
      <template #footer></template>
    </UiBasePopup>
  </div>
</template>

<script setup lang="ts">
import { required } from '~/shared/validators'
let form = ref({
  username: '',
  email: '',
})

let checkboxValue = ref(),
  radioButtonValue = ref(false)
</script>

<style scoped lang="scss">
.form-inputs-list {
  display: flex;
  flex-direction: column;
  gap: calc($md - 12px);
}
</style>
