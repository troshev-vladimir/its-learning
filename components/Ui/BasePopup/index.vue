<template>
  <teleport to="#popups-container">
    <transition name="modal-fade">
      <div class="modal-overlay" @click="closeModal" v-if="modelValue">
        <div class="container">
          <div class="modal" @click.stop>
            <slot :closeModal="closeModal"></slot>
          </div>
          <div class="close" @click="closeModal">
            <ClientOnly>
              <FontAwesomeIcon icon="fas fa-close"> </FontAwesomeIcon>
            </ClientOnly>
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

watch(localValue, (value) => {
  const body = document.querySelector('body')
  if (value) {
    body?.classList.add('freez')
  } else {
    body?.classList.remove('freez')
  }
})

const closeModal = () => {
  localValue.value = false
}
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @media screen and (max-width: $breakpoint-xs) {
    align-items: flex-end;

    .container {
      padding: 0;
    }
  }
}

.modal {
  border-radius: 16px;
  background-color: #fff;
  height: 90vh;
  width: 100%;

  @media screen and (max-width: $breakpoint-xs) {
    border-radius: 16px 16px 0 0;
  }
}

.modal-fade-enter,
.modal-fade-leave-to {
  @media screen and (min-width: $breakpoint-xs) {
    opacity: 0;
  }

  @media screen and (max-width: $breakpoint-xs) {
    transform: translate(0, 100%);
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.5s ease;
}

.close {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
