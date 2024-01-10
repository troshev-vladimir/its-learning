<template>
  <div>
    <UiBaseButton @click="$refs.refBasePopup?.open()" type="primary" size="big">
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
    <UiBaseButton type="boarded" size="big">
      <template #right-icon>
        <font-awesome-icon icon="fa-solid fa-user-astronaut" />
      </template>
      Базовая кнопка
    </UiBaseButton>
    <UiBaseButton type="boarded" size="small">
      <template #right-icon>
        <font-awesome-icon icon="fa-solid fa-user-astronaut" />
      </template>
      Базовая кнопка
    </UiBaseButton>
    <UiBaseButton type="link" size="big"> Базовая ссылка </UiBaseButton>
    <UiBaseButton type="link" size="small"> Базовая ссылка </UiBaseButton>
    <UiBasePopup ref="refBasePopup">
      <template #header> 123 </template>
      <template #default></template>
      <template #footer></template>
    </UiBasePopup>

    <UiBaseForm>
      <UiBaseInput
        :required="true"
        :rules="[required]"
        name="name"
        placeholder="Введите имя"
      />
      <UiBaseInput name="email" placeholder="Введите почту" />
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
