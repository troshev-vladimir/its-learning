<template>
  <div class="cabinet-page">
    <div class="user-profile row">
      <span class="photo-span col-2">
        <div class="photo-span__cntainer">
          <img
            src="https://gas-kvas.com/uploads/posts/2023-02/1675495569_gas-kvas-com-p-luchshie-kartinki-dlya-fonovogo-risunka-ra-31.jpg"
            alt=""
            class="photo-span__image"
          />
        </div>
      </span>
      <div class="user-profile__info-bock column col-8">
        <p class="text-h2">Виктор Андреевич Балкин</p>
        <div class="row">
          <p class="text-body2 q-mr-xl">Город: Киров</p>
          <p class="text-body2">Возраст: 29 лет</p>
        </div>
        <UiBaseButton type="boarded" size="small"> Редактировать </UiBaseButton>
      </div>
      <div class="col-2">
        <UiBaseAverageScore />
      </div>
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
  gap: 40px;
  align-items: center;
  .photo-span {
    display: block;
    // width: 160px;
    // height: 160px;
    background: $gray-300;
    border-radius: 8px;
    overflow: hidden;

    &__image {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    &__cntainer {
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
