<template>
  <div class="view">
    <AppTheHeader class="q-pb-xl" />
    <div class="container">
      <slot></slot>
    </div>
  </div>
  <AppTheFooter />
</template>

<style lang="scss" scoped>
.view {
  min-height: 100vh;
}
</style>
