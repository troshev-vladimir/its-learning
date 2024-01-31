<template>
  <div class="cabinet-layout">
    <AppTheSidebar class="cabinet-layout__sidebar" :links="sidebarLinks">
    </AppTheSidebar>
    <div class="sidebar-substrate"></div>
    <div class="cabinet-layout__container">
      <AppTheCabinetHeader class="cabinet-layout__header base-shadow" />
      <div class="container">
        <slot></slot>
      </div>
      <AppTheFooter />
    </div>
  </div>
</template>

<script lang="ts" setup>
let route = useRoute()
let sidebarLinks = computed(() => [
  {
    icon: 'fas fa-book-open',
    title: 'Обучение',
    active: route.path.includes('course'),
    to: '/course/1',
  },
  // {
  //   icon: 'fas fa-briefcase',
  //   title: 'Трудоустройство',
  //   active: false,
  //   to: '/',
  // },
  process.env.NODE_ENV === 'development'
    ? {
        icon: 'fas fa-code',
        title: 'Ui-kit',
        active: route.name == 'ui_kit',
        to: '/ui_kit',
      }
    : { to: '123' },
])
</script>

<style lang="scss" scoped>
.cabinet-layout {
  min-height: 100vh;
  display: flex;

  &__sidebar {
    position: fixed;
    z-index: 2;
    top: 65px;

    @media screen and (min-width: $breakpoint-xs) {
      position: fixed;
      top: 0;
      left: 0;
    }
  }
  .sidebar-substrate {
    flex: 0 0 auto;
    display: none;

    @media screen and (min-width: $breakpoint-xs) {
      display: block;
      width: 80px;
      height: 100vh;
      position: sticky;
    }
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
      margin-top: 32px;
      margin-bottom: 32px;
    }
  }
}
</style>
