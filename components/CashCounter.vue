<template>
  <div class="cash-counter">
    <div class="image">
      <img :src="CoinImage" alt="coin" />
    </div>

    <div class="count">
      <span>{{ cashe }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CoinImage from "@/assets/img/coin.png";
  import { formatNumber } from "~/utils/helpers";
  import { computed } from "vue";

  const props = defineProps<{
    amount: number | string;
  }>();

  const cashe = computed(() => {
    return typeof props.amount === "number"
      ? formatNumber(props.amount)
      : props.amount;
  });
</script>

<style lang="scss" scoped>
  .cash-counter {
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    background-color: #fff;

    .image {
      padding: 5px 15px;
      transform: rotate(-6.24deg);
      flex-shrink: 0;
      display: flex;
      align-items: center;

      img {
        width: 45px;
        height: 45px;
      }
    }

    .count {
      width: 100%;
      color: #000;
      font-family: Gogh;
      font-size: 30px;
      font-style: normal;
      font-weight: 500;
      line-height: 100%;
      background: #f2f2f2;
      flex: 1 1 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 10px;
    }
  }
</style>
