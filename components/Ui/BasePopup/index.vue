<template>
  <teleport to="#popups-container">
    <dialog ref="dialog" :class="[$style.dialog, 'pretty-scroll']">
      <div :class="[$style.content]">
        <client-only>
          <font-awesome-icon
            @click="close"
            :class="$style.cancel"
            icon="fa-solid fa-xmark"
            class="text-primary"
          />
        </client-only>

        <slot> </slot>
      </div>
    </dialog>
  </teleport>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const dialog = ref<HTMLDialogElement>()
watch(
  () => props.modelValue,
  (value) => {
    console.log(dialog.value?.querySelector('backdrop'))
    if (!dialog.value) return

    if (value) {
      dialog.value.showModal()
      document.body.classList.add('scroll-lock')
    } else {
      document.body.classList.remove('scroll-lock')
      close()
    }
  }
)

const close = () => {
  if (!dialog.value) return
  dialog.value.close()
  emit('update:modelValue', false)
}
</script>

<style lang="scss" module>
dialog {
  padding: 0;
  border: none;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s;

  &[open] {
    opacity: 1;
    pointer-events: inherit;
  }

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }

  min-width: 600px;
}

.dialog {
  padding-top: 16px;
  .content {
    position: relative;
  }

  .cancel {
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: $lg;
    color: $white;
    cursor: pointer;
  }
}

.base-popup.active {
  animation: showPopup 0.2s ease;
}

@keyframes showPopup {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.cardContainer {
  flex: 1 1 auto;
  overflow: auto;
}
</style>
