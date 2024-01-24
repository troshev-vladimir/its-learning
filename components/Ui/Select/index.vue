<template>
  <div
    :class="[
      $style['baseSelect'],
      {
        [$style['baseSelect--open']]: isOpen,
        [$style['baseSelect--selected']]: !!selectedLabels.length,
        [$style['baseSelect--disabled']]: disabled,
      },
      $style[`baseSelect--${validationResult.status}`],
    ]"
    v-click-outside="closeDropdown"
  >
    <div :class="$style['selectContainer']" @click="toggle">
      <p :class="$style['placeholder']">
        {{ label }}
        <span v-if="required">*</span>
      </p>

      <div v-if="eachClearable" :class="$style.selectedLabels">
        <span
          :class="$style.selectedLabel"
          v-for="(label, index) in selectedLabels.slice(0, shownItems)"
          :key="index"
        >
          {{ typeof label === 'string' ? '' : label.label }}

          <client-only>
            <span
              v-if="!disabled"
              :class="$style['clearItem']"
              @click.stop="
                clearItem(typeof label === 'string' ? '' : label.value)
              "
            >
              <font-awesome-icon :icon="['fas', 'close']" color="#ccc" />
            </span>
          </client-only>
        </span>

        <span
          :class="$style.selectedLabel"
          v-if="selectedLabels.length > shownItems"
        >
          И ещё {{ selectedLabels.length - shownItems }}
        </span>
      </div>

      <span v-else>
        {{ selectedLabels }}
      </span>

      <client-only>
        <span :class="$style['icon']">
          <font-awesome-icon :icon="['fas', 'chevron-down']" color="#ccc" />
        </span>

        <span
          :class="$style['clear']"
          @click.stop="clearAll()"
          v-if="canClearAll"
        >
          <font-awesome-icon :icon="['fas', 'close']" color="#ccc" />
        </span>
      </client-only>
    </div>
    <ul :class="$style['dropdown']" v-if="isOpen">
      <li
        v-for="option in currentOptions"
        :key="option.value"
        :class="[
          $style['option'],
          {
            [$style['option--selected']]: option.selected && !multiple,
          },
        ]"
        @click="select(option.value)"
      >
        <UiBaseCheckbox
          :name="option.value"
          :model-value="option.selected"
          @click.prevent
          v-if="multiple"
        />
        <span :class="[$style['label'], 'text-body2']">{{ option.label }}</span>
      </li>
    </ul>

    <p v-if="isError" :class="$style['message']">
      {{ validationResult.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { ValidatorResp } from '~/utils/validators/types'

export interface Option {
  label: string
  value: string
  selected: boolean
}

export interface Props {
  modelValue: string | number | []
  label: string
  required?: boolean
  name: string
  validationResult?: ValidatorResp
  options: Option[]
  multiple?: boolean
  clearable?: boolean
  eachClearable?: boolean
  disabled?: boolean
  shownItems?: number
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  shownItems: 2,
  validationResult: () => ({
    status: 'success',
    message: '',
  }),
})
const emit = defineEmits(['update:modelValue', 'update'])
const { value, isError, update } = useFormItem(props, emit)

let currentOptions = reactive(props.options)

const selectedLabels = computed(() => {
  const selectedOptions = currentOptions.filter((el) => {
    return el.selected
  })

  if (props.eachClearable) {
    return selectedOptions
  } else {
    let labelsString = selectedOptions.reduce((acc, el, idx) => {
      if (!acc) return acc + el.label
      if (idx >= props.shownItems) return acc
      return acc + ', ' + el.label
    }, '')

    if (selectedOptions.length > props.shownItems) {
      labelsString =
        labelsString + ' и ещё ' + (selectedOptions.length - props.shownItems)
    }

    return labelsString
  }
})

const isOpen = ref(false)
const canClearAll = computed(() => {
  if (!props.clearable || props.disabled) return false
  return selectedLabels.value.length
})
const toggle = () => {
  isOpen.value = !isOpen.value
}

const emitValues = () => {
  const selectedValues = currentOptions
    .filter((el) => el.selected)
    .map((el) => el.value)
  emit('update:modelValue', selectedValues)
  update()
}

const select = (value: string) => {
  // TODO: Надо не мутировать опции, а добавлять в массив выбранных элементов и испольховать value из useFormItem
  const newOptions = currentOptions.map((el) => {
    if (el.value === value) {
      // Текущий элемент
      el.selected = !el.selected
    } else {
      // Если не multiple то осталным надо выключать выбор
      if (!props.multiple) {
        el.selected = false
        closeDropdown()
      }
    }

    return el
  })

  currentOptions = newOptions
  emitValues()
  filterOptions()
}
const clearAll = () => {
  const newOptions = currentOptions.map((el) => {
    el.selected = false
    return el
  })
  currentOptions = newOptions
  emitValues()
}
const clearItem = (value: string) => {
  const newOptions = currentOptions.map((el) => {
    if (el.value === value) {
      el.selected = false
    }
    return el
  })
  currentOptions = newOptions
  emitValues()
}

const closeDropdown = () => {
  isOpen.value = false
}

const filterOptions = () => {
  currentOptions = currentOptions.sort((a) => {
    return a.selected ? -1 : 1
  })
}

onMounted(() => {
  emitValues()
  filterOptions()
})
</script>

<style lang="scss" module>
.baseSelect {
  position: relative;

  .placeholder {
    top: 50%;
    left: 12px;
    position: absolute;
    margin: 0;
    pointer-events: none;
    color: $secondary;
    transition: 0.2s;
    transform: translate(0, -50%);
  }

  .selectContainer {
    position: relative;
    width: 100%;
    height: 40px;
    padding: 10px 12px;
    border: 1px solid $secondary;
    border-radius: 8px;
    background: $white;
    font-size: $md;
    transition: 0.2s;
    display: flex;
    align-items: center;

    &:hover,
    &:focus,
    &:hover:focus,
    &:hover {
      box-shadow: 0 0 0 2px $light-blue;
    }

    &:focus {
      -webkit-box-shadow: 0 0 0 1px $light-blue;
      box-shadow: 0 0 0 1px $light-blue;
    }
    .selectedLabels {
      display: flex;
      align-items: center;
      gap: 4px;
      .selectedLabel {
        background-color: var(--q-secondary);
        padding: 0 4px;
        border-radius: 40px;
        display: inline-flex;
        align-items: center;
        padding: 4px 8px;
        gap: 6px;

        .clearItem {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          border-radius: 16px;
          cursor: pointer;
          transition: all ease 0.2s;

          svg {
            transition: all ease 0.2s;
            color: var(--q-primary);
          }

          &:hover {
            background-color: var(--q-primary);

            svg {
              color: var(--q-secondary);
            }
          }
        }
      }
    }

    .clear {
      position: absolute;
      top: 50%;
      right: 38px;
      transform: translate(0, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      cursor: pointer;

      &:hover {
        background-color: var(--q-secondary);
        transition: all ease 0.2s;

        svg {
          transition: all ease 0.2s;
          color: #fff;
        }
      }
    }

    .icon {
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translate(0, -50%);
      transition: all ease 0.2s;
    }
  }

  &--selected {
    .selectContainer {
      .placeholder {
        color: $accent;
        font-size: 12px;
        line-height: 17px;
        top: 0;
        left: 0;
        transform: translateY(calc(-100% + -2px));
      }
    }
  }

  &--open {
    .selectContainer {
      border-color: var(--q-accent);
      .icon {
        transform: translate(0, -50%) rotate(180deg);
      }
    }
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 4px);
    width: 100%;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0px 3px 12px 0px rgba(204, 204, 204, 0.25);
    z-index: 2;
    overflow: hidden;

    .option {
      padding: 8px 16px;
      cursor: pointer;
      transition: all ease 0.4s;
      display: flex;
      align-items: center;
      gap: 10px;

      &:not(:last-child) {
        border-bottom: 1px solid var(--gray-300, #ccc);
      }

      &:hover {
        background: var(--gray-100, #eee);
        cursor: pointer;
        transition: all ease 0.2s;
      }

      &--selected {
        background: rgba(0, 117, 235, 0.4);

        &:hover {
          background: rgba(0, 117, 235, 0.2);
        }
      }

      .label {
      }
    }
  }

  .message {
    position: absolute;
    font-size: 12px;
    margin-top: 2px;
    line-height: 17px;
  }

  &--error {
    .message {
      color: $error;
    }

    .selectContainer {
      border-color: $error;

      &:hover:focus {
        box-shadow: 0 0 0 2px $error;
      }

      .placeholder {
        color: $error;
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

    .selectContainer {
      color: var(--q-secondary);
      border-color: var(--q-secondary);

      p.placeholder {
        color: var(--q-secondary);
      }
    }

    .message {
      color: var(--q-secondary);
    }
  }
}
</style>
