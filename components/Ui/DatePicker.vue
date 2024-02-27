<template>
  <div
    v-if="isHydrated"
    :class="[
      $style['ui-datepicker'],
      $style[`ui-datepicker--${validationResult.status}`],
      {
        [$style['ui-datepicker--disabled']]: disabled,
        [$style['ui-datepicker--filled']]: !!localValue,
      },
      rootClass,
    ]"
  >
    <div :class="$style.inputWrapper">
      <vue-date-picker
        v-bind="$attrs"
        ref="datepicker"
        v-model="localValue"
        locale="ru"
        cancel-text="Отмена"
        select-text="Выбрать"
        :clearable="true"
        position="left"
        :enable-time-picker="false"
        :format="format"
        :name="name"
        :year-picker="yearPicker"
        @date-update="dateClicked"
      >
        <template #action-row="{ selectDate }">
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
            <font-awesome-icon :icon="['far', 'calendar']" />
          </client-only>
        </template>
      </vue-date-picker>
      <p :class="$style.placeholder" class="small">
        {{ label }}
        <span v-if="required">*</span>
      </p>
    </div>
    <p v-if="isError" :class="$style.message">
      {{ validationResult.message }}
    </p>
  </div>
  <UiBaseInput
    v-else
    class=""
    label="Дата"
    :model-value="modelValue?.toString()"
    :validation-result="{ status: 'none', message: '' }"
  />
</template>
<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'
import type { ValidatorResp } from '~/utils/validators/types'
import { type DatePickerInstance } from '@vuepic/vue-datepicker'

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

const isHydrated = ref(false)

const datepicker = ref<DatePickerInstance | null>(null)

const dateClicked = (date: Date | string) => {
  localValue.value = date
  datepicker.value?.closeMenu()
}

const emit = defineEmits(['update:modelValue', 'update'])

const { localValue, isError, update } = useFormItem(props, emit)

const format = (date: Date): string => {
  const dateValue = date instanceof Date ? date : new Date(date)
  const year = dateValue.getFullYear()

  if (props.yearPicker) return `${year}`

  let day = String(dateValue.getDate())
  day = day.length === 1 ? '0' + day : day
  let month = String(dateValue.getMonth() + 1)
  month = month.length === 1 ? '0' + month : month

  return `${day}.${month}.${year}`
}

onMounted(() => {
  isHydrated.value = true
})
</script>
<style lang="scss" module>
.datepicker {
  display: block;
  width: 200px;
  height: 100px;
}
.message {
  font-size: 12px;
  line-height: 1;
  position: absolute;
  transform: translate(0, 0);
  bottom: 0;
}
.ui-datepicker {
  padding-top: 16px;
  position: relative;
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

  :global(.dp__input_icon) {
    color: #0075eb;
    margin-left: 16px;
  }
  :global(.dp__input) {
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

  &--error {
    padding-bottom: 16px;

    .message {
      color: $error;
    }
    svg {
      color: $error !important;
    }
    .placeholder {
      color: $error !important;
    }

    :global(.dp__input) {
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
    :global(.message) {
      display: none;
    }

    :global(.dp__input) {
      border-color: $secondary;
    }
    svg {
      color: $secondary !important;
    }
    :global(.dp__input_icon),
    .placeholder,
    input {
      color: $secondary;
    }
  }
}
</style>

<style lang="scss"></style>
