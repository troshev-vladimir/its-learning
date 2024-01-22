<template>
  <VueDatePicker
    locale="ru"
    v-model="date"
    placeholder="Введите дату"
    cancelText="Отмена"
    selectText="Выбрать"
    :clearable="true"
    menu-class-name="ui-datepicker"
    position="left"
    :enable-time-picker="false"
    :format="format"
  >
    <template #action-row="{ internalModelValue, selectDate }">
      <UiBaseButton size="small" type="secondary" @click="selectDate">
        Применить и продолжить
      </UiBaseButton>
    </template>

    <template #input-icon>
      <client-only>
        <font-awesome-icon color="#0075eb" :icon="['far', 'calendar']" />
      </client-only>
    </template>
  </VueDatePicker>
</template>
<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref()

const format = (date: Date) => {
  let day = String(date.getDate())
  if (day.length === 1) {
    day = '0' + day
  }
  let month = String(date.getMonth() + 1)
  if (month.length === 1) {
    month = '0' + month
  }
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}
</script>
<style lang="scss">
.datepicker {
  display: block;
  width: 200px;
  height: 100px;
}

.dp__input_icon {
  margin-left: 16px;
}

.ui-datepicker {
  width: 100%;
}
.dp__input {
  width: 100%;
  height: 100%;
  padding: 10px 12px;
  border: 1px solid $secondary;
  outline: none;
  border-radius: 8px;
  background: $white;
  font-size: $md;
  transition: 0.2s;
  padding-left: 38px;

  &:hover,
  &:focus,
  &:-webkit-autofill,
  &:-webkit-autofill:focus {
    border-color: $accent;
  }

  &:hover:focus,
  &:-internal-autofill-selected:hover,
  &:hover {
    box-shadow: 0 0 0 2px $light-blue;
  }

  &:focus,
  &:-internal-autofill-selected:focus {
    -webkit-box-shadow: 0 0 0 1px $light-blue;
    box-shadow: 0 0 0 1px $light-blue;
  }
}
</style>
