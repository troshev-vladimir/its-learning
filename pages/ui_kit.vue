<template>
  <div>
    <UiBaseInput
      :rules="[validators.required()]"
      v-model="input"
      name="name"
      label="Отдельно"
      :validation-result="{
        status: 'error',
        message: 'Ошибка на беке',
      }"
    />
    {{ input }}

    <UiBaseForm title="Форма" @submit="sendForm" @check="checkForm">
      <template #default="{ validators }">
        <UiBaseInput
          name="name"
          :rules="[validators.required(), validators.minMaxLength(2, 4)]"
          label="Введите имя"
          required
          class="q-mb-xl"
          v-model="form.name"
          :validation-result="{
            status: 'success',
            message: 'Ошибка на беке',
          }"
          ref="nameInput"
        />
        <UiBaseInput
          name="email"
          label="Введите почту"
          :rules="[validators.required()]"
          class="q-mb-lg"
          v-model="form.email"
          ref="emailInput"
        />
        <!-- <UiBaseCheckbox>asdasd</UiBaseCheckbox> -->
      </template>
    </UiBaseForm>
    <!-- <p>{{ form }}</p> -->

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
    <!-- <UiBasePopup ref="refBasePopup">
      <template #header> 123 </template>
      <template #default>123</template>
      <template #footer>123</template>
    </UiBasePopup>
    <UiBasePopup ref="refBasePopup2">
      <template #header> asdsad </template>
      <template #default>1asdasd23</template>
      <template #footer>asdasd</template>
    </UiBasePopup> -->
  </div>
</template>

<script setup lang="ts">
import * as validators from '~/utils/validators'

const form = reactive<Record<string, string>>({})

const input = ref('1')
const nameInput = ref(null)
const emailInput = ref(null)

const checkForm = () => {
  // @ts-ignore
  nameInput.value.update()
  // @ts-ignore
  emailInput.value.update()
}

const sendForm = (formData: Record<string, any>) => {
  console.log(formData)
}
</script>
