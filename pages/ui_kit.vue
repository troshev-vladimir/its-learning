<template>
  <div>
    <UiBaseButton @click="$refs.refBasePopup?.open()" type="primary" size="big">
      <template #left-icon>
        <client-only>
          <font-awesome-icon icon="fa-solid fa-user-astronaut" />
        </client-only>
      </template>
      Нажми
    </UiBaseButton>

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
    <UiBaseButton type="boarded" size="small">
      <template #right-icon>
        <client-only>
          <font-awesome-icon icon="fa-solid fa-user-astronaut" />
        </client-only>
      </template>
      Базовая кнопка
    </UiBaseButton>
    <UiBaseButton type="link" size="big"> Базовая ссылка </UiBaseButton>
    <UiBaseButton type="link" size="small"> Базовая ссылка </UiBaseButton>
    <UiBasePopup ref="refBasePopup">
      <template #header> 123 </template>
      <template #default>123</template>
      <template #footer>123</template>
    </UiBasePopup>
  </div>
</template>

<script setup lang="ts">
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
