<template>
  <div v-if="!isExpired" class="timer">
    <div class="image">
      <img :src="CoinImage" alt="coin" />
    </div>

    <div class="count">
      <span>{{ string }}</span>
    </div>
  </div>
  <q-chip
    v-else
    outline
    square
    color="red"
    text-color="white"
    icon="fas fa-hourglass-end"
    label="Время вышло"
  />
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import CoinImage from "@/assets/img/timer.png";
import moment from "moment";
import store from "@/store";
let interval: number | undefined;

const expirationDate = computed(() => {
  return store.state.expirationDate;
});

const string = ref("");
const isExpired = computed(() => moment(expirationDate.value) < moment());

const updateTime = () => {
  const now = moment();
  const expiration = moment(expirationDate.value);
  // get the difference between the moments
  const diff = expiration.diff(now);
  //express as a duration
  const diffDuration = moment.duration(diff);
  // display
  let diffSeconds = diffDuration.seconds().toString();
  let diffMinutes = diffDuration.minutes().toString();
  let diffHour = diffDuration.hours().toString();

  diffSeconds = diffSeconds.length < 2 ? "0" + diffSeconds : diffSeconds;
  diffMinutes = diffMinutes.length < 2 ? "0" + diffMinutes : diffMinutes;
  diffHour = diffHour.length < 2 ? "0" + diffHour : diffHour;

  string.value = `${diffHour}:${diffMinutes}:${diffSeconds}`;
};

onMounted(() => {
  interval = window.setInterval(() => {
    updateTime();
  }, 1000);

  updateTime();
});

onBeforeUnmount(() => {
  window.clearInterval(interval);
});
</script>

<style lang="scss">
.timer {
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.1);

  // @media screen and (max-width: 1200px) {
  //     border-radius: 5px;
  // }

  .image {
    margin: 5px 15px;
    transform: rotate(-6.24deg);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    width: 45px;
    height: 45px;

    // @media screen and (max-width: 1200px) {
    //     margin: 2px 6px;
    // }

    img {
      // @media screen and (max-width: 1200px) {
      //     width: 25px;
      //     height: 25px;
      // }
    }
  }

  .count {
    padding: 15px 5px 15px 5px;
    width: 130px;
    color: #000;
    font-family: Gogh;
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    background: #f2f2f2;

    // @media screen and (max-width: 1200px) {
    //     font-size: 16px;
    //     padding: 5px;
    // }
  }
}
</style>
