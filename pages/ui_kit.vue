<template>
  <div>
    <UiBaseButton
      @click="() => (isPopupOpen = !isPopupOpen)"
      type="primary"
      size="big"
    >
      <template #left-icon>
        <client-only>
          <font-awesome-icon icon="fa-solid fa-user-astronaut" />
        </client-only>
      </template>
      Нажми
    </UiBaseButton>
    <UiBasePopup ref="refBasePopup" v-model="isPopupOpen">
      <template #default>123</template>
    </UiBasePopup>

    <UiBaseForm title="Форма" v-model="form">
      <template #default="{ validators }">
        <UiBaseInput
          :rules="[validators.minMaxLength(1, 4)]"
          name="name"
          label="Введите имя"
          class="q-mb-xl"
        />

        <UiBaseInput name="email" label="Введите почту" class="q-mb-lg" />
      </template>
    </UiBaseForm>

    <UiBaseButton type="primary" size="small">
      <template #left-icon>
        <client-only>
          <font-awesome-icon icon="fa-solid fa-user-astronaut" />
        </client-only>
      </template>
      Базовая кнопка
    </UiBaseButton>
    <UiBaseButton type="secondary" size="small">
      <template #right-icon>
        <client-only>
          <font-awesome-icon icon="fa-solid fa-user-astronaut" />
        </client-only>
      </template>
      Базовая кнопка
    </UiBaseButton>
    <UiBaseButton type="boarded" size="big">
      <template #right-icon>
        <client-only>
          <font-awesome-icon icon="fa-solid fa-user-astronaut" />
        </client-only>
      </template>
      Базовая кнопка
    </UiBaseButton>
    <UiBaseButton
      type="boarded"
      size="small"
      prev-icon="fa-up-right-from-square"
    >
      <template #right-icon>
        <client-only>
          <font-awesome-icon icon="fa-solid fa-user-astronaut" />
        </client-only>
      </template>
      Базовая кнопка1
    </UiBaseButton>
    <UiBaseButton
      type="boarded"
      size="small"
      prev-icon="fa-up-right-from-square"
    >
      <template #right-icon>
        <client-only>
          <font-awesome-icon icon="fa-solid fa-user-astronaut" />
        </client-only>
      </template>
      Базовая кнопка2
    </UiBaseButton>
    <UiBaseButton
      type="external-link"
      size="big"
      to="https://yandex.ru/search/?clid=2353835&text=git+stash+delete&lr=46"
    >
      Базовая ссылка
    </UiBaseButton>
    <UiBaseButton type="link" size="small"> Базовая ссылка </UiBaseButton>
  </div>
</template>

<script setup lang="ts">
let isPopupOpen = ref(false)
const form = ref({
  name: {
    value: '1asasdad',
    status: 'error',
    message: 'asdasd',
  },
  email: {
    value: 'asdasd',
    status: null,
    message: 'asdasd',
  },
})
</script>
