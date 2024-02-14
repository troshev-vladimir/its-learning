<template>
  <div class="cabinet-layout">
    <AppTheCabinetHeader class="cabinet-layout__header base-shadow" />
    <div class="cabinet-layout__container">
      <AppTheSidebar class="cabinet-layout__sidebar" :links="sidebarLinks" />
      <div class="sidebar-substrate"></div>
      <div class="cabinet-layout__content">
        <div class="container">
          <slot></slot>
        </div>
        <AppTheFooter />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const sidebarLinks = computed(() => [
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

  &__sidebar {
    position: fixed;
    z-index: 1;
    top: 72px;
    height: 100%;

    @media screen and (min-width: $bp-sm) {
      position: fixed;
      bottom: 0 !important;
      height: calc(100vh - 98px);
      left: 0;
      top: auto;
    }
  }
  .sidebar-substrate {
    flex: 0 0 auto;
    display: none;

    @media screen and (min-width: $bp-sm) {
      display: block;
      width: 80px;
      height: calc(100vh - 100px);
      position: sticky;
      bottom: 0;
    }
  }

  &__header {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 100;
    box-shadow: 0 0 20px #dfdfdf;
  }

  &__container {
    flex: 1 1 auto;
    display: flex;
    overflow: hidden;

    .container {
      min-height: calc(100vh - 70px);
      margin-top: 32px;
      margin-bottom: 32px;
    }
  }

  &__content {
    width: 100%;
  }
}
</style>
