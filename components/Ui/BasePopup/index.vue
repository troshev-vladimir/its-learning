<template>
  <div class="base-popup" :class="{ active: isOpen }">
    <div class="base-popup__card">
      <div class="card__header">
        <slot name="header"></slot>
        <font-awesome-icon
          @click="close"
          class="card__cancel"
          icon="fa-solid fa-xmark"
        />
      </div>
      <div class="card__container">
        <slot></slot>
      </div>
      <div class="card__footer">
        <slot name="footer"></slot>
      </div>
    </div>
    <span class="base-popup__background" @click="close"></span>
  </div>
</template>

<script lang="ts" setup>
let resolveFn = ref()
let rejectFn = ref()
let isOpen = ref(false)

const open = () => {
  return new Promise((resolve, reject) => {
    resolveFn.value = resolve
    rejectFn.value = reject
    isOpen.value = true
  })
}

const confirm = () => {
  isOpen.value = false
  resolveFn.value(true)
}

const close = () => {
  isOpen.value = false
  resolveFn.value(false)
}

defineExpose({ open, confirm, close })
</script>

<style lang="scss" scoped>
.base-popup {
  display: none;
  transition: 0.2s;
  &.active {
    display: block;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }

  &__card {
    position: absolute;
    overflow: hidden;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    transform: translate(-50%, -50%);
    min-width: 100px;
    min-height: 100px;
    max-width: 80vw;
    max-height: 80vh;
    background: $white;
    border-radius: 16px;

    .card__cancel {
      font-size: $lg;
      float: right;
      margin: 8px;
      color: $black;
      cursor: pointer;
    }
    .card__container {
      flex: 1 1 auto;
    }
  }

  &__background {
    display: block;
    width: 100%;
    height: 100%;
    background: #00000056;
  }
}
</style>
