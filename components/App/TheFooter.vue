<template>
  <footer class="bg-primary q-py-xl">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <div class="logo">
            <img src="~/assets/img/logo-white.svg" alt="logo" />
          </div>
          <span class="text-body2 text-white"
            >Академия 1С программирования</span
          >
        </div>
        <div class="col-4">
          <a
            href="https://islod.obrnadzor.gov.ru/rlic/details/d90449fe-a5cc-b3f6-0cfd-374d13b8c672/"
            target="_blank"
            class="text-body2 text-white"
            style="text-decoration: underline"
          >
            Лицензия Министерства образования на осуществление образовательной
            деятельности №Л035-01282-43/00614206 от 31.08.2022
          </a>

          <p class="text-body2 q-mt-md text-white">ООО "Битуби"</p>

          <p class="text-body2 text-white">ИНН/КПП: 4345498698/434501001</p>

          <p class="text-body2 q-mb-lg text-white">ОГРН: 1204300000178</p>

          <p class="text-body2 text-white q-mt-md">
            © 2012 - 2023 Все права защищены
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
  .logo {
    img {
      height: 45px;

      @media screen and (min-width: $breakpoint-sm) {
        height: 57px;
      }
    }
  }
  .footer-items {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
  }
</style>
