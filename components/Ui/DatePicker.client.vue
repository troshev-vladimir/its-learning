<template>
  <div
    class="ui-datepicker"
    :class="[
      `ui-datepicker--${validationResult.status}`,
      {
        'ui-datepicker--disabled': disabled,
      },
    ]"
  >
    <VueDatePicker
      locale="ru"
      v-model="date"
      :placeholder="label"
      cancelText="Отмена"
      selectText="Выбрать"
      :clearable="true"
      position="left"
      :enable-time-picker="false"
      :format="format"
      :name="name"
    >
      <template #action-row="{ internalModelValue, selectDate }">
        <UiBaseButton size="small" type="secondary" @click.prevent="selectDate">
          Применить и продолжить
        </UiBaseButton>
      </template>

      <template #input-icon>
        <client-only>
          <font-awesome-icon color="#0075eb" :icon="['far', 'calendar']" />
        </client-only>
      </template>
    </VueDatePicker>
    <p v-if="isError" class="message">
      {{ validationResult.message }}
    </p>
  </div>
</template>
<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import type { ValidatorResp } from '~/utils/validators/types'

const props = withDefaults(
  defineProps<{
    modelValue: string | Date | null
    label: string
    name: string
    disabled?: boolean
    validationResult?: ValidatorResp
  }>(),
  {
    validationResult: () => ({
      status: 'success',
      message: '',
    }),
  }
)

const emit = defineEmits(['update:modelValue', 'update'])

const { value, isError, update } = useFormItem(props, emit)

const date = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

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
.message {
  font-size: 12px;
  margin-top: 2px;
  line-height: 17px;
}
.ui-datepicker {
  width: 100%;

  &--error {
    .message {
      color: $error;
    }

    .placeholder {
      color: $error !important;
    }

    .dp__input {
      border-color: $error;

      &:hover:focus {
        box-shadow: 0 0 0 2px $error;
      }

      &:hover {
        box-shadow: 0 0 0 2px $error;
        border-color: $red;
      }

      &:focus {
        box-shadow: 0 0 0 1px $error;
      }
    }
  }

  &--disabled {
    pointer-events: none;

    .message {
      display: none;
    }

    .dp__input {
      border-color: $secondary;
    }

    .dp__input_icon svg {
      color: $secondary;
    }
  }
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
