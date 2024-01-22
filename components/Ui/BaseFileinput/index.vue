<template>
  <div class="base-fileinput">
    <label class="base-fileinput__input-wrapper">
      <client-only>
        <font-awesome-icon :class="['q-mr-sm']" :icon="['fas', 'file']" />
      </client-only>
      <input
        @dragenter="dragFileInput"
        @dragleave="dragEndFileInput"
        :multiple="multiple"
        type="file"
        @change="onFileChange"
        ref="fileInputRef"
        class="base-fileinput__file-input"
        :class="{ drag: isDraging }"
      />
      <span v-if="multiple"> Добавить файлы </span>
      <span v-else>{{
        uploadedFiles.length ? uploadedFiles[0].name : 'Добавить файл'
      }}</span>
    </label>

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
  fileExtensions?: string
  multiple?: boolean
  modelValue: []
  validationResult?: ValidatorResp
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['update:modelValue', 'update'])
const $q = useQuasar()
const { isDraging, dragFileInput, dragEndFileInput } = useDragDrop()
// const { value, isError, update } = useFormItem(props, emit)
const uploadedFiles = ref<File[]>([])
const fileInputRef = ref<HTMLInputElement | null>(null)

const onFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  const files: FileList | null = input.files

  if (!files || !files.length) return

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

<style lang="scss">
.base-fileinput {
  display: flex;
  flex-direction: column;

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
}
</style>
