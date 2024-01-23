<template>
  <div
    class="base-fileinput"
    :class="[
      `base-fileinput--${validationResult.status}`,
      {
        [`base-fileinput--disabled`]: disabled,
      },
    ]"
  >
    <label class="base-fileinput__input-wrapper">
      <client-only>
        <font-awesome-icon
          :class="['q-mr-sm', 'icon']"
          :icon="['fas', 'file']"
        />
      </client-only>
      <input
        @dragenter="dragFileInput"
        @dragleave="dragEndFileInput"
        :multiple="!!multiple"
        type="file"
        @change="onFileChange"
        ref="fileInputRef"
        class="base-fileinput__file-input"
        :class="{ drag: isDraging }"
        :accept="acceptTypesString"
      />
      <span v-if="multiple" class="label text-body2"> {{ label }} </span>
      <span v-else class="label text-body2">{{
        uploadedFiles.length ? uploadedFiles[0].name : label
      }}</span>
    </label>

    <p v-if="isError" class="message">
      {{ validationResult.message }}
    </p>

    <div class="base-fileinput__file-list file-list" v-if="multiple">
      <a
        class="file-list__item"
        v-for="({ name }, i) in uploadedFiles"
        :key="i"
      >
        {{ name }}
        <client-only>
          <font-awesome-icon
            class="item__delete-icon"
            :icon="['fas', 'times']"
            @click.prevent="deleteFile(i)"
          />
        </client-only>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ValidatorResp } from '~/utils/validators/types'
import { useQuasar } from 'quasar'
import useDragDrop from './composables/useDragDrop'
export interface Props {
  maxSize?: number
  accept?: string | string[]
  multiple?: boolean
  // modelValue: []
  label?: string
  validationResult?: ValidatorResp
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  validationResult: () => ({
    status: 'success',
    message: '',
  }),
})
const emit = defineEmits(['update:modelValue', 'update'])
const $q = useQuasar()
const { isDraging, dragFileInput, dragEndFileInput } = useDragDrop()
const { isError, update } = useFormItem(props, emit)
const uploadedFiles = ref<File[]>([])
const fileInputRef = ref<HTMLInputElement | null>(null)

const acceptTypesString = computed(() => {
  if (!props.accept) return ''
  return Array.isArray(props.accept) ? props.accept.join(', ') : props.accept
})

const onFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  const files: FileList | null = input.files

  if (!files || !files.length) return

  if (files[0].size > (props.maxSize || 2000)) {
    // TODO: эти условия надо покаозывать польхователю, он не вкрсе что можно пихать сюда чере драгдроп
    $q.notify({
      type: 'negative',
      message: `Максимум доступны файлы ${props.maxSize}kb. Файл ${files[0].name} слишком тяжёлый`,
    })

    return
  }
  console.log('Тип файла:' + files[0].type)

  if (
    props.accept && Array.isArray(props.accept)
      ? !props.accept.includes(files[0].type)
      : props.accept === files[0].type
  ) {
    // TODO: эти условия надо покаозывать польхователю, он не вкрсе что можно пихать сюда чере драгдроп
    $q.notify({
      type: 'negative',
      message: `Файл не подходящего формата`,
    })

    return
  }

  if (props.multiple) {
    const filesArray = Array.from(files).filter((gonaBeUploadFile) => {
      const isAlreadyExists = uploadedFiles.value.every(
        (uploadedFile) => uploadedFile.name !== gonaBeUploadFile.name
      )

      if (!isAlreadyExists) {
        $q.notify({
          message: 'файл ' + gonaBeUploadFile.name + ' уже добавлен',
        })
      }

      return isAlreadyExists
    })

    uploadedFiles.value = [...uploadedFiles.value, ...filesArray]
  } else {
    uploadedFiles.value = Array.from(files)
  }

  emit('update:modelValue', uploadedFiles.value)
}

const deleteFile = (fileIndex: number) => {
  uploadedFiles.value.splice(fileIndex, 1)

  if (!fileInputRef.value) return

  const dt = new DataTransfer()
  uploadedFiles.value.forEach((el, idx, arr) => {
    dt.items.add(el)
  })
  const newFileList = dt.files
  fileInputRef.value.files = newFileList
  emit('update:modelValue', uploadedFiles.value)
}

// for (var x = 0; x < uploadedFiles.length; x++) {
//     formData.append("files[]", files[x]);
// }
</script>

<style lang="scss" scoped>
.base-fileinput {
  display: flex;
  flex-direction: column;

  .label {
    color: var(--accent, #0075eb);
    font-weight: 700;
    line-height: 1;
  }

  .message {
    font-size: 12px;
    margin-top: 2px;
    line-height: 17px;
  }

  &__input-wrapper {
    position: relative;
    width: fit-content;
    padding: 12px 24px;
    border-radius: 8px;
    border: 1px solid $accent;
    font-size: 16px;
    font-weight: 600;
    color: $accent;
    cursor: pointer !important;

    &:has(> input.drag) {
      border: 1px dashed $accent;
    }
  }

  &__file-input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
  }

  &__file-list,
  .file-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 8px;

    &__item,
    .item {
      &__delete-icon {
        font-size: 16px;
        cursor: pointer;

        &:hover {
          color: $accent;
        }
      }
    }
  }

  &--error {
    .message {
      color: $error;
    }

    .placeholder {
      color: $error !important;
    }

    .base-fileinput__input-wrapper {
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
    .message,
    .label,
    .icon,
    .placeholder {
      color: $secondary;
    }

    .base-fileinput__input-wrapper {
      border-color: $secondary;
    }
  }
}
</style>
