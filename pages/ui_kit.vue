<template>
  <div>
    <UiBaseForm>
      <div class="form-inputs-list">
        <UiBaseInput
          placeholder="Введите логин"
          v-model="form.username"
        />
        <UiBaseInput
          placeholder="Введите почту"
          v-model="form.email"
          :required="true"
        />
        <UiBaseCheckbox
          v-model="checkboxValue"
          :value="{ new: '123' }"
        />
        <UiBaseCheckbox
          v-model="checkboxValue"
          :value="{ new: '1df23' }"
        />
        <UiBaseCheckbox
          v-model="checkboxValue"
          :value="{ new: '12sd3' }"
        />
        <UiBaseRadioButton v-model="radioButtonValue" />
      </div>
      <UiBaseButton
        type="primary"
        size="big"
      >
        Отправить
      </UiBaseButton>

      <UiBaseButton
        type="secondary"
        size="big"
      >
        Отправить
      </UiBaseButton>

      <UiBaseButton
        type="primary"
        size="small"
      >
        Отправить
      </UiBaseButton>
      <UiBaseButton
        type="secondary"
        size="small"
      >
        Отправить
      </UiBaseButton>
    </UiBaseForm>
  </div>
</template>

<script setup lang="ts">
let form = ref({
  username: "",
  email: "",
});

let checkboxValue = ref(),
  radioButtonValue = ref(false);
</script>

<style scoped lang="scss">
.form-inputs-list {
  display: flex;
  flex-direction: column;
  gap: calc($md - 12px);
}
</style>