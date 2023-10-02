<template>
  <div class="cash-counter">
    <div class="image">
      <img :src="CoinImage" alt="coin" />
    </div>

    <div class="count">
      <span>{{ formatNumber(10000) }}</span>
    </div>
  </div>
</template>

<script setup>
import CoinImage from "@/assets/img/coin.png";
import { formatNumber } from "@/helpers/utils";
//import { useUserStore } from "@/store/modules/user";
//const user = useUserStore();
</script>

<style lang="scss" scoped>
.cash-counter {
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-color: #fff;
  //box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.1);

  //@media screen and (max-width: 1200px) {
  // border-radius: 5px;
  //}

  .image {
    padding: 5px 15px;
    transform: rotate(-6.24deg);
    flex-shrink: 0;
    display: flex;
    align-items: center;

    //@media screen and (max-width: 1200px) {
    // padding: 2px 6px;
    //}

    img {
      width: 45px;
      height: 45px;
      position: static;
      transform: none;
      //@media screen and (max-width: 1200px) {
      //width: 25px;
      // height: 25px;
      // }
    }
  }

  .count {
    padding: 21px 60px 21px 45px;
    width: 100%;
    color: #000;
    font-family: Gogh;
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    background: #f2f2f2;

    //@media screen and (max-width: 1200px) {
    //font-size: 16px;
    //padding: 5px;
    //}
  }
}
</style>
