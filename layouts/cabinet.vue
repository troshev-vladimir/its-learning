<template>
  <div class="cabinet-layout">
    <AppTheSidebar class="cabinet-layout__sidebar" :links="sidebarLinks">
    </AppTheSidebar>
    <div class="cabinet-layout__container">
      <AppTheCabinetHeader class="cabinet-layout__header" />
      <div class="container">
        <slot></slot>
      </div>
      <AppTheFooter />
    </div>
  </div>
</template>

<script lang="ts" setup>
let route = useRoute()
let sidebarLinks = [
  {
    icon: 'fas fa-book-open',
    title: 'Обучение',
    active: route.name == 'cabinet',
    to: '/cabinet',
  },
  {
    icon: 'fas fa-briefcase',
    title: 'Трудоустройство',
    active: false,
    to: '/',
  },
]
</script>

<style lang="scss" scoped>
.cabinet-layout {
  min-height: 100vh;
  display: flex;

  &__sidebar {
    position: sticky;
    top: 0;
  }

  &__header {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1;
  }

  &__container {
    flex: 1 1 auto;

    .container {
      min-height: calc(100vh - 70px);
      padding: 32px 0;
    }
  }
}
</style>
