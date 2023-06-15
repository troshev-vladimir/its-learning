<template>
  <header class="header q-py-md">
    <div class="container header__container">
      <div class="logo column items-start">
        <img src="@/assets/img/logo.svg" alt="logo" />
        <span class="text-body1">Академия 1С программирования</span>
      </div>
      <a class="text-h2 text-weight-bold" href="tel:88003010828">
        8(800)301-08-28
      </a>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";

.header {
  &__container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    @media screen and (min-width: $breakpoint-xs) {
      flex-direction: row;
      align-items: center;
    }
  }

  .logo {
    img {
      height: 42px;

      @media screen and (min-width: $breakpoint-sm) {
        height: 72px;
      }
    }
  }
}
</style>
