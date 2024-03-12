<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div v-if="modelValue" class="modal-overlay">
        <div class="background" @click="closeModal"></div>
        <div class="container">
          <div class="modal">
            <slot></slot>
            <div class="close" @click="closeModal">
              <ClientOnly>
                <FontAwesomeIcon icon="fas fa-close"> </FontAwesomeIcon>
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const localValue = computed({
  get() {
    return props.modelValue
  },
  set(value: boolean) {
    emit('update:modelValue', value)
  },
})
useBodyFreez(localValue)

const closeModal = () => {
  localValue.value = false
}

const escapeHandler = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', escapeHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', escapeHandler)
})
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .background {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.6);
    width: 100vw;
    height: 100vh;
    z-index: 0;
  }

  @media screen and (max-width: $breakpoint-xs) {
    align-items: flex-end;

    .container {
      padding: 0;
    }
  }
}
.modal {
  border-radius: 16px;
  max-height: 90vh;
  overflow: visible;
  width: 100%;
  position: relative;
  z-index: 1001;

  @media screen and (max-width: $breakpoint-xs) {
    border-radius: 16px 16px 0 0;
  }
}

.modal-fade-leave-to,
.modal-fade-enter-from {
  @media screen and (min-width: $breakpoint-xs) {
    opacity: 0;
  }

  @media screen and (max-width: $breakpoint-xs) {
    opacity: 0;

    .container {
      transform: translate(0, 100%);
    }
  }
}

.modal-fade-leave-from,
.modal-fade-enter-to {
  @media screen and (min-width: $breakpoint-xs) {
    opacity: 1;
  }

  @media screen and (max-width: $breakpoint-xs) {
    opacity: 1;

    .container {
      transform: none;
    }
  }
}
// .modal-fade-leave-to
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.5s ease;

  .container {
    transition: all 0.5s ease;
  }
}

.close {
  position: absolute;
  z-index: 100;
  top: 16px;
  right: 16px;
  cursor: pointer;
}
</style>
