<template>
  <div class="user-profile row q-col-gutter-lg items-center">
    <div class="offset-3 col-6 offset-sm-0 col-sm-4 col-md-2">
      <UiBaseSkeleton width="100%" height="100%" style="padding-bottom: 100%" />
    </div>

    <div class="col-12 col-sm-8 col-md-7 q-gutter-sm">
      <div
        class="column items-center q-gutter-sm items-sm-start"
        style="width: 100%"
      >
        <UiBaseSkeleton width="350px" class="text-h2" />
        <div class="d-flex justify-between justify-md-start">
          <UiBaseSkeleton
            width="100px"
            style="flex: 0 0 auto"
            class="text-body2 q-mr-xl"
          />
          <UiBaseSkeleton
            width="100px"
            style="flex: 0 0 auto"
            class="text-body2"
          />
        </div>
        <UiBaseSkeleton width="172px" height="44px" />
      </div>
    </div>
    <div class="col-12 col-md-3 justify-center justify-md-end d-flex">
      <UiBaseAverageScore
        :is-loading="true"
        class="items-center items-md-end"
      />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.user-photo {
  padding-bottom: 100%;
  background: $gray-300;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
