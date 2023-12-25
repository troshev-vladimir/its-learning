<template>
  <header class="header q-pt-md">
    <div class="header__container container">
      <div class="logo column items-start">
        <img src="~/assets/img/logo.svg" alt="logo" />
        <span class="text-body1">Академия 1С программирования</span>
      </div>
      <div class="row items-center q-gutter-md">
        <a class="text-h2 text-weight-bold" href="tel:+78003010828">
          8(800)301-08-28
        </a>
        <UiButton
          size="sm"
          class="bg-accent"
          :text-class="['text-body2', 'text-white', 'text-bold']"
          @click="exit"
        >
          Выйти
        </UiButton>
      </div>
    </div>
  </header>
</template>

<script setup>
  import { useRouter } from "vue-router";
  const router = useRouter();
  const exit = () => {
    localStorage.clear();
    router.push({ name: "auth" });
  };
</script>

<style scoped lang="scss">
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
