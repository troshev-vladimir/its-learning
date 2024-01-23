<template>
  <teleport to="#popups-container">
    <div class="base-popup" :class="{ active: modelValue }">
      <client-only>
        <font-awesome-icon
          @click="close"
          class="cancel"
          icon="fa-solid fa-xmark"
        />
      </client-only>
      <div class="card">
        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="cardContainer">
          <slot></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
      <span class="background" @click="close"></span>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
  modelValue?: boolean
}>()

const open = () => {
  emit('update:modelValue', true)
}

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      document.body.style.top = `-${window.scrollY}px`
      document.body.classList.add('freez')
    } else {
      const scrollY = document.body.style.top
      document.body.classList.remove('freez')
      document.body.style.top = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
  }
)

const close = () => {
  emit('update:modelValue', false)
}

defineExpose({ open, close })
</script>

<style lang="scss" scoped>
.base-popup {
  display: none;
  transition: 0.2s;
}

.base-popup.active {
  display: block;
  position: fixed;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
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

.background {
  display: block;
  width: 100%;
  height: 100%;
  background: #00000056;
}
.card {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  transform: translate(-50%, -50%);
  min-width: 100px;
  min-height: 100px;
  width: max-content;
  height: max-content;
  max-width: 95vw;
  max-height: 90vh;
  background: $white;
  border-radius: 16px;
  overflow: auto;

  @media (min-width: $breakpoint-sm) {
    max-width: 80vw;
    max-height: 80vh;
  }
}
.cancel {
  position: fixed;
  top: 16px;
  right: 16px;
  font-size: $lg;
  color: $white;
  cursor: pointer;
}
.cardContainer {
  flex: 1 1 auto;
  overflow: auto;
}
</style>

<style>
body.freez {
  position: fixed !important;
  overflow-y: scroll !important;
}
</style>
