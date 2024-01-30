<template>
  <teleport to="#popups-container">
    <TransitionGroup name="popup" :duration="{ enter: 200, leave: 150 }">
      <div
        class="base-popup base-block"
        v-if="modelValue"
        :class="{ active: modelValue }"
      >
        <client-only>
          <font-awesome-icon
            @click="close"
            class="cancel"
            icon="fa-solid fa-xmark"
          />
        </client-only>
        <div class="card pretty-scroll">
          <slot></slot>
        </div>
      </div>
      <span
        class="background"
        v-if="hasBackground === true && modelValue"
        @click="close"
      ></span>
    </TransitionGroup>
  </teleport>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:modelValue'])
import { useBodyFreez } from '~/composables'

interface Props {
  modelValue?: boolean
  hasBackground?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hasBackground: true,
})
const { modelValue } = toRefs(props)
let { startBodyFreez } = useBodyFreez(modelValue)

const close = () => {
  emit('update:modelValue', false)
}

onMounted(() => {
  startBodyFreez()

  document.body.addEventListener('keydown', function (e) {
    if (e.key == 'Escape') {
      close()
    }
  })
})

defineExpose({ close })
</script>

<style lang="scss" scoped>
.base-popup {
  display: none;
  transition: 0.2s;
}

.popup-enter-active {
  animation: showPopup 0.2s ease;
  @keyframes showPopup {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
.popup-leave-active {
  animation: hidePopup 0.2s ease;
  @keyframes hidePopup {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
}

.base-popup.active {
  display: block;
  position: fixed;
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  max-width: 90vw;
  max-height: 90vh;
  padding: 0;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  display: block;
  width: 100%;
  height: 100%;
  background: #00000056;
}
.card {
  flex-direction: column;
  max-width: 90vw;
  max-height: 90vh;
  width: 100%;
  height: max-content;
  height: inherit;
  overflow: auto;
}
.cancel {
  position: fixed;
  z-index: 2;
  top: 24px;
  right: 24px;
  font-size: $lg;
  color: $gray-600;
  cursor: pointer;
}
.cardContainer {
  flex: 1 1 auto;
  overflow: auto;
}
</style>
