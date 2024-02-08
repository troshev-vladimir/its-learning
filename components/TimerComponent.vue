<template>
  <div v-if="!isExpired" class="timer">
    <div class="image">
      <img src="@/assets/img/timer.png" alt="timer" />
    </div>

    <div class="count">
      <span v-if="string" style="display: block">{{ string }}</span>
      <span v-else style="display: block">00:00:00</span>
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
import { computed, onBeforeUnmount, onMounted, ref, defineEmits } from 'vue'
import moment from 'moment'
let interval: number | undefined

const emit = defineEmits(['timeIsGone'])

const props = defineProps<{
  finalsteptime?: string
}>()

const expirationDate = computed(() => {
  return props.finalsteptime || '2024-02-10T13:42:06'
})

const string = ref('')
let isExpired = false

const updateTime = () => {
  if (isExpired) {
    window.clearInterval(interval)
    emit('timeIsGone')
    return
  }
  const now = moment()
  const expiration = moment(expirationDate.value)
  if (!expirationDate.value) {
    return
  }
  // get the difference between the moments
  const diff = expiration.diff(now)
  //express as a duration
  const diffDuration = moment.duration(diff)
  // display
  let diffSeconds = diffDuration.seconds().toString()
  let diffMinutes = diffDuration.minutes().toString()
  let diffHour = diffDuration.hours()
  const diffDays = diffDuration.days()

  if (
    diffDuration.seconds() <= 0 &&
    diffDuration.minutes() <= 0 &&
    diffDuration.hours() <= 0 &&
    diffDuration.days() <= 0
  ) {
    emit('timeIsGone')
    isExpired = true
  }

  if (diffDays > 0) {
    diffHour = diffDays * 24 + diffHour
  }

  diffSeconds = diffSeconds.length < 2 ? '0' + diffSeconds : diffSeconds
  diffMinutes = diffMinutes.length < 2 ? '0' + diffMinutes : diffMinutes
  const resultHours =
    String(diffHour).length < 2 ? '0' + String(diffHour) : String(diffHour)

  string.value = `${resultHours || '00'}:${diffMinutes || '00'}:${
    diffSeconds || '00'
  }`
}

onMounted(() => {
  interval = window.setInterval(() => {
    updateTime()
  }, 1000)
})

onBeforeUnmount(() => {
  window.clearInterval(interval)
})
</script>

<style lang="scss">
.timer {
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-color: #fff;

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
    padding: 15px 5px;
    width: fit-content;
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
