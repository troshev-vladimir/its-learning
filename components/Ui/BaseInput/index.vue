<template>
  <div
    :class="[
      $style['base-input'],
      $style[`base-input--${validationResult.status}`],
      {
        [$style[`base-input--disabled`]]: props.disabled,
      },
      rootClass,
    ]"
  >
    <div v-click-outside="hideSuggestion" :class="$style.inputWrapper">
      <textarea
        v-if="textarea"
        :id="name"
        v-model="localValue"
        type="text"
        style="resize: vertical"
        rows="4"
        :name="name"
        :class="$style['native-input']"
        placeholder=""
        v-bind="attrs"
        @blur="update"
        @keyup.enter="emit('enter')"
      />

      <input
        v-else
        :id="name"
        v-model="localValue"
        v-maska:[maskOptions]="mask"
        type="text"
        style="resize: vertical"
        :name="name"
        :class="$style['native-input']"
        placeholder=""
        v-bind="attrs"
        :data-maska="mask"
        @blur="update"
        @click="isSuggestions = true"
        @keyup.enter="emit('enter')"
        @focus="isSuggestions = true"
      />

      <p :class="$style.placeholder" class="small">
        {{ label }}
        <span v-if="required">*</span>
      </p>

      <!-- <teleport to="#popups-container"> -->
      <div
        v-if="isSuggestions && suggestions && suggestions.length"
        :class="[$style.suggestions]"
      >
        <div
          v-for="(suggestion, index) in suggestions"
          :key="index"
          :class="$style.suggestionItem"
          @click="selectSugestion(suggestion)"
        >
          {{ suggestion }}
        </div>
      </div>
      <!-- </teleport> -->
    </div>

    <p :class="$style.message">
      {{ validationResult.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { ValidatorResp } from '~/utils/validators/types'
import useMask from './composables/useMask'

const attrs = useAttrs()

export interface Props {
  modelValue?: string
  label: string
  required?: boolean
  name: string
  validationResult?: ValidatorResp
  textarea?: boolean
  rootClass?: string | string[]
  disabled?: boolean
  suggestions?: Array<string>
  mask?: string | Function // TODO: переделать на imask
}
const props = withDefaults(defineProps<Props>(), {
  name: '',
  validationResult: () => ({
    status: 'success',
    message: '',
  }),
})
const emit = defineEmits(['update:modelValue', 'update', 'enter'])

const { maskOptions } = useMask(emit)
const { localValue, isError, update } = useFormItem(props, emit)

const isSuggestions = ref(false)
const hideSuggestion = () => {
  isSuggestions.value = false
}

const selectSugestion = (suggestion: string) => {
  localValue.value = suggestion
  hideSuggestion()
}
</script>

<style lang="scss" module>
input[list='suggestions']::-webkit-calendar-picker-indicator {
  display: none !important;
}
.base-input {
  position: relative;
  padding-top: 16px;

  .inputWrapper {
    position: relative;
  }

  &--disabled {
    pointer-events: none;

    .message,
    .placeholder,
    .native-input {
      color: $secondary !important;
    }
  }

  .native-input:focus ~ .placeholder,
  .native-input:not(:placeholder-shown) ~ .placeholder {
    color: $accent;
    font-size: 12px;
    line-height: 17px;
    top: 0;
    left: 0;
    transform: translateY(calc(-100% + -2px));
  }

  .suggestions {
    position: absolute;
    top: 100%;
    transform: translate(0, 10px);
    left: 0;
    right: 0;
    background-color: #fff;
    box-shadow: 0 0 10px #7d7d7d;
    border-radius: 8px;
    z-index: 10;

    .suggestionItem {
      padding: 10px 20px;
      cursor: pointer;
      &:hover {
        background-color: $secondary;
      }

      font-size: 15px;

      @media screen and (max-width: $bp-xs) {
        font-size: 13px;
      }
    }
  }

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

  .native-input {
    width: 100%;
    height: 100%;
    padding: 10px 12px;
    border: 1px solid $secondary;
    outline: none;
    border-radius: 8px;
    background: $white;
    font-size: $md;
    transition: 0.2s;

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

  .message {
    position: absolute;
    font-size: 12px;
    margin-top: 2px;
    line-height: 17px;
  }

  &--error {
    padding-bottom: 16px;

    .message {
      color: $error;
    }

    .placeholder {
      color: $error !important;
    }

    .native-input {
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
        border-color: $red;
      }

      &:-webkit-autofill,
      &:-webkit-autofill:focus,
      &:-internal-autofill-selected:focus,
      &:-internal-autofill-selected {
        -webkit-box-shadow: 0 0 0 2px $error;
        -webkit-text-fill-color: #000;
      }
    }
  }

  &--warn {
    padding-bottom: 16px;

    .message {
      color: $yellow;
    }

    .placeholder {
      color: $yellow !important;
    }

    .native-input {
      border-color: $yellow;

      &:hover:focus {
        box-shadow: 0 0 0 2px $yellow;
      }

      &:hover {
        box-shadow: 0 0 0 2px $yellow-100;
        border-color: $yellow;
      }

      &:focus {
        box-shadow: 0 0 0 1px $yellow;
        border-color: $yellow;
      }

      &:-webkit-autofill,
      &:-webkit-autofill:focus,
      &:-internal-autofill-selected:focus,
      &:-internal-autofill-selected {
        -webkit-box-shadow: 0 0 0 2px $yellow;
        -webkit-text-fill-color: #000;
      }
    }
  }

  &--success {
    padding-bottom: 16px;

    .message {
      color: $green;
    }

    .placeholder {
      color: $green !important;
    }

    .native-input {
      border-color: $green;

      &:hover:focus {
        box-shadow: 0 0 0 2px $green;
      }

      &:hover {
        box-shadow: 0 0 0 2px $green-300;
        border-color: $green;
      }

      &:focus {
        box-shadow: 0 0 0 1px $green;
        border-color: $green;
      }

      &:-webkit-autofill,
      &:-webkit-autofill:focus,
      &:-internal-autofill-selected:focus,
      &:-internal-autofill-selected {
        -webkit-box-shadow: 0 0 0 2px $green;
        -webkit-text-fill-color: #000;
      }
    }
  }
}

.base-input {
  textarea + .placeholder {
    top: 20px;
  }
}
</style>
