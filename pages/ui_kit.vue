<template>
  <div>
    <UiBaseForm title="Форма" v-model="form">
      <template #default="{ validators }">
        <UiBaseInput
          :rules="[validators.minMaxLength(1, 4)]"
          name="name12"
          label="Введите имя"
          class="q-mb-xl"
        />

        <UiBaseInput name="email" label="Введите почту" class="q-mb-lg" />
      </template>
    </UiBaseForm>

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
  </div>
</template>

<script setup lang="ts">
const form = ref({})
</script>

<style scoped lang="scss"></style>
