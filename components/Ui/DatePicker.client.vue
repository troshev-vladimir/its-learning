<template>
  <div
    :class="[
      $style['ui-datepicker'],
      $style[`ui-datepicker--${validationResult.status}`],
      {
        [$style['ui-datepicker--disabled']]: disabled,
        [$style['ui-datepicker--filled']]: !!date,
      },
      rootClass,
    ]"
  >
    <div :class="$style.inputWrapper">
      <VueDatePicker
        locale="ru"
        v-model="date"
        cancelText="Отмена"
        selectText="Выбрать"
        :clearable="true"
        position="left"
        :enable-time-picker="false"
        :format="format"
        :name="name"
        :year-picker="yearPicker"
        v-bind="$attrs"
      >
        <template #action-row="{ internalModelValue, selectDate }">
          <UiBaseButton
            size="small"
            type="secondary"
            @click.prevent="selectDate"
          >
            Применить и продолжить
          </UiBaseButton>
        </template>

        <template #input-icon>
          <client-only>
            <font-awesome-icon color="#0075eb" :icon="['far', 'calendar']" />
          </client-only>
        </template>
      </VueDatePicker>
      <p :class="$style.placeholder" class="small">
        {{ label }}
        <span v-if="required">*</span>
      </p>
    </div>
    <p v-if="isError" :class="$style.message">
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
    rootClass?: string | Array<string>
    required?: boolean
    yearPicker?: boolean
  }>(),
  {
    validationResult: () => ({
      status: 'success',
      message: '',
    }),
  }
)

const emit = defineEmits(['update:modelValue', 'update'])

const { localValue, isError, update } = useFormItem(props, emit)

const date = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const format = (date: Date) => {
  if (props.yearPicker) return date.getFullYear()

  let day = String(date.getDate())
  day = day.length === 1 ? '0' + day : day
  let month = String(date.getMonth() + 1)
  month = month.length === 1 ? '0' + month : month

  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}
</script>
<style lang="scss" module>
.datepicker {
  display: block;
  width: 200px;
  height: 100px;
}

.message {
  font-size: 12px;
  margin-top: 2px;
  line-height: 17px;
}
.ui-datepicker {
  padding-top: 16px;
  width: 100%;
  .inputWrapper {
    position: relative;
  }

  .placeholder {
    top: 50%;
    left: 36px;
    position: absolute;
    margin: 0;
    pointer-events: none;
    color: $secondary;
    transition: 0.2s;
    transform: translate(0, -50%);
  }

  &--filled {
    .placeholder {
      color: $accent;
      font-size: 12px;
      line-height: 17px;
      top: 0;
      left: 0;
      transform: translateY(calc(-100% + -2px));
    }
  }

  &--error {
    padding-bottom: 16px;

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

    .dp__input_icon svg,
    .placeholder,
    input {
      color: $secondary;
    }
  }
}
</style>

<style lang="scss">
.dp__input_icon {
  margin-left: 16px;
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
