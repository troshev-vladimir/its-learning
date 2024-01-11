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

    <UiBaseButton
      @click="$refs.refBasePopup2?.open()"
      type="primary"
      size="big"
    >
      <template #left-icon>
        <client-only>
          <font-awesome-icon icon="fa-solid fa-user-astronaut" />
        </client-only>
      </template>
      Нажми 2
    </UiBaseButton>

    <UiBaseForm title="Форма" @submit="sendForm">
      <template #default="{ validators }">
        <UiBaseInput
          :rules="[validators.minMaxLength(1, 4)]"
          name="name"
          label="Введите имя"
          class="q-mb-xl"
        />

        <UiBaseInput name="email" label="Введите почту" class="q-mb-lg" />
        <UiBaseInput name="user" label="Введите почту" class="q-mb-lg" />
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
    <UiBasePopup ref="refBasePopup2">
      <template #header> asdsad </template>
      <template #default>1asdasd23</template>
      <template #footer>asdasd</template>
    </UiBasePopup>
  </div>
</template>

<script setup lang="ts">
const sendForm = (formData: FormData) => {
  for (var pair of formData.entries()) {
    console.log(pair[0] + ', ' + pair[1])
  }
}
</script>
