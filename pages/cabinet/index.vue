<template>
  <div class="cabinet-page">
    <div
      class="user-profile column row-sm q-gutter-md q-gutter-md-xl items-center justify-sm-between items-sm-center"
    >
      <div class="col-sm-2">
        <span class="photo-span">
          <div class="photo-span__container">
            <img src="" alt="" class="photo-span__image" />
          </div>
        </span>
      </div>
      <div
        class="user-profile__info-bock column col-sm items-center items-sm-start"
      >
        <p class="text-h2">Виктор Андреевич Балкин</p>
        <div class="row">
          <p class="text-body2 q-mr-xl">Город: Киров</p>
          <p class="text-body2">Возраст: 29 лет</p>
        </div>
        <UiBaseButton type="boarded" size="small"> Редактировать </UiBaseButton>
      </div>
      <UiBaseAverageScore class="items-center items-sm-end col-xs-4 col-sm-2" />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'cabinet',
})
</script>
<style lang="scss" scoped>
.user-profile {
  .photo-span {
    display: block;
    min-width: 120px;
    // height: 160px;
    background: $gray-300;
    border-radius: 8px;
    overflow: hidden;

    @media (min-width: $breakpoint-xs) {
      min-width: auto;
    }

    &__image {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    &__container {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      object-fit: cover;
      position: relative;
    }

    &__photo {
    }
  }

  &__info-bock {
    gap: $md;
  }
}
</style>
