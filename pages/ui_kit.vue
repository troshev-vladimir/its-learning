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
      <UiBaseButton type="primary" size="big"> Базовая кнопка </UiBaseButton>

      <UiBaseButton type="secondary" size="big"> Базовая кнопка </UiBaseButton>

      <UiBaseButton type="primary" size="small"> Базовая кнопка </UiBaseButton>
      <UiBaseButton type="secondary" size="small">
        Базовая кнопка
      </UiBaseButton>
    </UiBaseForm>
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
