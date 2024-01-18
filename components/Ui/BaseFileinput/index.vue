<script lang="ts" setup>
let inputValue = ref<FileList | File[] | []>([])

const dragFileInput = (refInput: HTMLElement) => {
  refInput?.classList.add('drag')
}

const dragEndFileInput = (refInput: HTMLElement) => {
  refInput?.classList.remove('drag')
}

const onSetFiles = (event: InputEvent, refInput: HTMLInputElement) => {
  inputValue.value = <FileList>(<HTMLInputElement>event.target)?.files
  dragEndFileInput(refInput)
}

const filesNames = computed(() => {
  if (inputValue.value?.length > 0) {
    return Array.from(inputValue.value).map((el: File) => el.name)
  }
  return []
})

const deleteFile = (fileIndex: number) => {
  let inputValueInstance = <Array<File>>Array.from(inputValue.value)
  inputValueInstance.splice(fileIndex, 1)
  inputValue.value = inputValueInstance
}
</script>

<template>
  <div class="base-fileinput">
    <div class="base-fileinput__input-wrapper">
      <input
        @dragenter="dragFileInput($refs.refFileInput as HTMLInputElement)"
        @dragleave="dragEndFileInput($refs.refFileInput as HTMLInputElement)"
        @input="
          (event) =>
            onSetFiles(
              event as InputEvent,
              $refs.refFileInput as HTMLInputElement
            )
        "
        v-bind="$attrs"
        ref="refFileInput"
        type="file"
        class="base-fileinput__file-input"
      />
      <span v-if="$attrs.multiple">Добавить файлы</span>
      <span v-else>Добавить файл</span>
    </div>
    <div class="base-fileinput__file-list file-list">
      <span class="file-list__item" v-for="(el, i) in filesNames" :key="i">
        {{ el }}
        <font-awesome-icon
          @click="deleteFile(i)"
          class="item__delete-icon"
          :icon="['fas', 'times']"
        />
      </span>
    </div>
  </div>
</template>

<style lang="scss">
.base-fileinput {
  &__input-wrapper {
    position: relative;
    width: fit-content;
    padding: 12px 24px;
    border-radius: 8px;
    border: 1px solid $accent;
    font-size: 16px;
    font-weight: 600;
    color: $accent;
    cursor: pointer;

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
