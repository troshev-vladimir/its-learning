<template>
  <div class="payment-card">
    <div class="payment-card__container">
      <UiBaseSkeleton class="text-body1 q-mb-md" width="300px" />
      <UiBaseSkeleton class="text-h1" width="500px" />
      <div class="payment-card__content">
        <div class="payment-card__about-programm-block">
          <UiBaseSkeleton class="text-body2" width="200px" />
          <div class="about-programm-block__list">
            <div class="about-programm-block__item" style="width: 100px">
              <UiBaseSkeleton class="text-body1 q-mb-md" width="50px" />
              <UiBaseSkeleton class="text-body1" width="100px" />
            </div>
            <div class="about-programm-block__item" style="width: 100px">
              <UiBaseSkeleton class="text-body1 q-mb-md" width="50px" />
              <UiBaseSkeleton class="text-body1" width="100px" />
            </div>
            <div class="about-programm-block__item" style="width: 100px">
              <UiBaseSkeleton class="text-body1 q-mb-md" width="50px" />
              <UiBaseSkeleton class="text-body1" width="100px" />
            </div>
          </div>
        </div>
        <div class="payment-card__programm-cost-block">
          <div
            class="programm-cost-block__deferred-payment"
            style="width: 200px"
          >
            <UiBaseSkeleton class="text-body2 q-mb-sm" width="100px" />

            <div>
              <UiBaseSkeleton class="text-body2 q-mb-sm" width="150px" />
              <UiBaseSkeleton class="text-body2" width="100px" />
            </div>
          </div>
          <div class="programm-cost-block__full-payment" style="width: 200px">
            <UiBaseSkeleton class="text-body2 q-mb-sm" width="200px" />
            <UiBaseSkeleton class="text-body2 q-mb-sm" width="200px" />
            <UiBaseSkeleton class="text-body1 q-mb-sm" width="150px" />
            <UiBaseSkeleton class="text-body2" width="100px" />
          </div>
        </div>
      </div>
      <div class="payment-card__payment-selection-block">
        <div
          class="payment-selection-block__choose-buttons-block"
          style="min-width: 170px"
        >
          <div class="row q-gutter-sm">
            <UiBaseSkeleton width="20px" height="20px" radius="1000px" />
            <UiBaseSkeleton class="text-body2" width="130px" />
          </div>
          <div class="row q-gutter-sm">
            <UiBaseSkeleton width="20px" height="20px" radius="1000px" />
            <UiBaseSkeleton class="text-body2" width="100px" />
          </div>
        </div>
        <div class="row q-gutter-sm q-md-gutter-md">
          <UiBaseSkeleton width="153px" height="44px" />
          <UiBaseSkeleton width="223px" height="44px" />
        </div>
      </div>
      <div class="payment-card__docs">
        <UiBaseSkeleton
          v-for="doc in 3"
          :key="doc"
          width="100px"
          height="16px"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style lang="scss" scoped>
.payment-card {
  &__content {
    @include media($bp-sm) {
      display: flex;
      justify-content: space-between;
    }
  }

  &__about-programm-block,
  .about-programm-block {
    margin-top: 32px;
    &__list {
      margin-top: 16px;
      display: flex;
      column-gap: 32px;
      row-gap: 16px;
      flex-wrap: wrap;

      @include media($bp-xs) {
        column-gap: 48px;
      }
    }
  }

  &__programm-cost-block,
  .programm-cost-block {
    display: flex;
    column-gap: 24px;
    margin-top: 24px;

    @include media($bp-md) {
      column-gap: 64px;
    }

    &__deferred-payment {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &__full-payment,
    .full-payment {
      &__discount-card {
        background: $yellow-400;
        width: fit-content;
        padding: 2px 22px;
        border-radius: 8px;
      }
    }
  }

  &__payment-selection-block,
  .payment-selection-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    column-gap: 48px;
    row-gap: 24px;
    margin: 32px 0;

    @include media($bp-sm) {
      flex-direction: row;
      align-items: center;
    }

    &__choose-buttons-block {
      display: flex;
      flex-direction: column;
      gap: 8px;

      label {
        &:first-child {
          margin-bottom: 8px;
        }
      }
    }

    &__payment-period {
      min-width: 300px;
      padding-top: 0;
    }
  }

  &__docs {
    display: flex;
    column-gap: 32px;
    row-gap: 8px;
    flex-wrap: wrap;
    margin-top: 16px;
  }
}
</style>
